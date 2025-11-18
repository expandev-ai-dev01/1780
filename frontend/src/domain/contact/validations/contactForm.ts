import { z } from 'zod';

export const contactFormSchema = z.object({
  nome_completo: z
    .string()
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: 'Por favor, informe seu nome completo (nome e sobrenome)',
    }),
  email: z
    .string()
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres'),
  telefone: z
    .string()
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD')
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      'Por favor, informe um número de telefone válido com DDD'
    ),
  preferencia_contato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
    errorMap: () => ({ message: 'Por favor, selecione sua preferência de contato' }),
  }),
  melhor_horario: z
    .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
    .optional()
    .default('Qualquer horário'),
  id_veiculo: z.string().min(1, 'ID do veículo é obrigatório'),
  modelo_veiculo: z.string().min(1, 'Modelo do veículo é obrigatório'),
  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    {
      errorMap: () => ({ message: 'Por favor, selecione o assunto da sua consulta' }),
    }
  ),
  mensagem: z
    .string()
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional().default(false),
  termos_privacidade: z.boolean().refine((val) => val === true, {
    message: 'É necessário concordar com os termos de privacidade para prosseguir',
  }),
  receber_novidades: z.boolean().optional().default(false),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
