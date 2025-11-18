import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { contactCreate } from '@/services/contact';

/**
 * @api {post} /external/contact Submit Contact Form
 * @apiName SubmitContactForm
 * @apiGroup Contact
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits a contact form for a vehicle inquiry
 *
 * @apiParam {String} nome_completo Full name (min 3, max 100 characters)
 * @apiParam {String} email Valid email address (max 100 characters)
 * @apiParam {String} telefone Brazilian phone number with DDD
 * @apiParam {String} preferencia_contato Contact preference (Telefone, E-mail, WhatsApp)
 * @apiParam {String} [melhor_horario] Best time to contact (Manhã, Tarde, Noite, Qualquer horário)
 * @apiParam {String} id_veiculo Vehicle identifier
 * @apiParam {String} modelo_veiculo Vehicle model
 * @apiParam {String} assunto Inquiry subject
 * @apiParam {String} mensagem Message (min 10, max 1000 characters)
 * @apiParam {Boolean} [financiamento] Interest in financing
 * @apiParam {Boolean} termos_privacidade Privacy terms acceptance
 * @apiParam {Boolean} [receber_novidades] Opt-in for news
 *
 * @apiSuccess {Object} data Contact submission result
 * @apiSuccess {String} data.id_contato Contact identifier
 * @apiSuccess {String} data.protocolo Protocol number
 * @apiSuccess {String} data.mensagem Confirmation message
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate contact form data
     */
    const bodySchema = z.object({
      nome_completo: z
        .string()
        .min(3, 'nomeMinLength')
        .max(100, 'nomeMaxLength')
        .refine((val: string) => val.trim().split(/\s+/).length >= 2, {
          message: 'nomeIncompleto',
        }),
      email: z.string().email('emailInvalido').max(100, 'emailMaxLength'),
      telefone: z
        .string()
        .min(10, 'telefoneIncompleto')
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'telefoneInvalido'),
      preferencia_contato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
        errorMap: () => ({ message: 'preferenciaContatoInvalida' }),
      }),
      melhor_horario: z
        .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
        .optional()
        .default('Qualquer horário'),
      id_veiculo: z.string().min(1, 'idVeiculoRequired'),
      modelo_veiculo: z.string().min(1, 'modeloVeiculoRequired'),
      assunto: z.enum(
        [
          'Informações gerais',
          'Agendamento de test drive',
          'Negociação de preço',
          'Financiamento',
          'Outro',
        ],
        {
          errorMap: () => ({ message: 'assuntoInvalido' }),
        }
      ),
      mensagem: z.string().min(10, 'mensagemMinLength').max(1000, 'mensagemMaxLength'),
      financiamento: z.boolean().optional().default(false),
      termos_privacidade: z.boolean().refine((val: boolean) => val === true, {
        message: 'termosPrivacidadeRequired',
      }),
      receber_novidades: z.boolean().optional().default(false),
    });

    const validatedData = bodySchema.parse(req.body);

    /**
     * @rule {fn-contact-processing} Apply business rule for financing auto-selection
     */
    if (validatedData.assunto === 'Financiamento') {
      validatedData.financiamento = true;
    }

    /**
     * @rule {fn-contact-processing} Capture system metadata
     */
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown';

    const result = await contactCreate({
      ...validatedData,
      ip_usuario: ipAddress,
    });

    res.status(201).json(
      successResponse({
        id_contato: result.id_contato,
        protocolo: result.protocolo,
        mensagem: 'Contato recebido com sucesso. Retornaremos em até 24 horas úteis.',
      })
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR', error.errors));
      return;
    }

    next(error);
  }
}
