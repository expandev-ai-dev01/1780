import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/Card';
import { contactFormSchema } from '../../validations/contactForm';
import { useContactForm } from '../../hooks/useContactForm';
import type { ContactFormProps } from './types';
import type { ContactFormData } from '../../types';

export const ContactForm = ({ vehicleId, vehicleModel, onSuccess, onCancel }: ContactFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocol, setProtocol] = useState<string>('');
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nome_completo: '',
      email: '',
      telefone: '',
      preferencia_contato: 'E-mail',
      melhor_horario: 'Qualquer horário',
      id_veiculo: vehicleId,
      modelo_veiculo: vehicleModel,
      assunto: 'Informações gerais',
      mensagem: '',
      financiamento: false,
      termos_privacidade: false,
      receber_novidades: false,
    },
  });

  const assunto = watch('assunto');
  const mensagem = watch('mensagem');

  useEffect(() => {
    if (assunto === 'Financiamento') {
      setValue('financiamento', true);
    }
  }, [assunto, setValue]);

  useEffect(() => {
    setCharCount(mensagem?.length || 0);
  }, [mensagem]);

  const { submit, isSubmitting, response } = useContactForm({
    onSuccess: (data) => {
      setProtocol(data.protocolo);
      setShowSuccess(true);
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Erro ao enviar formulário:', error);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const sanitizedData = {
      ...data,
      mensagem: DOMPurify.sanitize(data.mensagem),
    };
    await submit(sanitizedData);
  };

  if (showSuccess && response) {
    return (
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-600">Mensagem enviada com sucesso!</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Obrigado pelo seu interesse. Retornaremos em até 24 horas úteis.
            </p>
            <div className="bg-muted p-4 rounded-sm">
              <p className="text-sm font-medium">Número de Protocolo:</p>
              <p className="text-lg font-bold text-primary-600">{protocol}</p>
            </div>
          </div>
          <Button onClick={() => window.location.reload()}>Fechar</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de Contato</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Preencha o formulário abaixo para manifestar seu interesse no veículo{' '}
          <strong>{vehicleModel}</strong>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Pessoais</h3>

            <div>
              <label htmlFor="nome_completo" className="block text-sm font-medium mb-2">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <Input
                id="nome_completo"
                {...register('nome_completo')}
                aria-invalid={errors.nome_completo ? 'true' : 'false'}
                placeholder="Digite seu nome completo"
              />
              {errors.nome_completo && (
                <span role="alert" className="text-sm text-red-600 mt-1 block">
                  {errors.nome_completo.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-mail <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <span role="alert" className="text-sm text-red-600 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                Telefone <span className="text-red-500">*</span>
              </label>
              <Input
                id="telefone"
                type="tel"
                {...register('telefone')}
                aria-invalid={errors.telefone ? 'true' : 'false'}
                placeholder="(00) 00000-0000"
              />
              {errors.telefone && (
                <span role="alert" className="text-sm text-red-600 mt-1 block">
                  {errors.telefone.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="preferencia_contato" className="block text-sm font-medium mb-2">
                Preferência de Contato <span className="text-red-500">*</span>
              </label>
              <select
                id="preferencia_contato"
                {...register('preferencia_contato')}
                className="w-full h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
                aria-invalid={errors.preferencia_contato ? 'true' : 'false'}
              >
                <option value="Telefone">Telefone</option>
                <option value="E-mail">E-mail</option>
                <option value="WhatsApp">WhatsApp</option>
              </select>
              {errors.preferencia_contato && (
                <span role="alert" className="text-sm text-red-600 mt-1 block">
                  {errors.preferencia_contato.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="melhor_horario" className="block text-sm font-medium mb-2">
                Melhor Horário para Contato
              </label>
              <select
                id="melhor_horario"
                {...register('melhor_horario')}
                className="w-full h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
              >
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Qualquer horário">Qualquer horário</option>
              </select>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold">Informações sobre o Veículo</h3>

            <div className="bg-muted p-4 rounded-sm space-y-2">
              <p className="text-sm font-medium">Veículo de Interesse:</p>
              <p className="text-base font-semibold">{vehicleModel}</p>
              <p className="text-xs text-muted-foreground">ID: {vehicleId}</p>
            </div>

            <div>
              <label htmlFor="assunto" className="block text-sm font-medium mb-2">
                Assunto <span className="text-red-500">*</span>
              </label>
              <select
                id="assunto"
                {...register('assunto')}
                className="w-full h-10 rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
                aria-invalid={errors.assunto ? 'true' : 'false'}
              >
                <option value="Informações gerais">Informações gerais</option>
                <option value="Agendamento de test drive">Agendamento de test drive</option>
                <option value="Negociação de preço">Negociação de preço</option>
                <option value="Financiamento">Financiamento</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.assunto && (
                <span role="alert" className="text-sm text-red-600 mt-1 block">
                  {errors.assunto.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                Mensagem <span className="text-red-500">*</span>
              </label>
              <textarea
                id="mensagem"
                {...register('mensagem')}
                rows={5}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
                aria-invalid={errors.mensagem ? 'true' : 'false'}
                placeholder="Descreva seu interesse no veículo..."
              />
              <div className="flex justify-between items-center mt-1">
                <div>
                  {errors.mensagem && (
                    <span role="alert" className="text-sm text-red-600">
                      {errors.mensagem.message}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{charCount}/1000 caracteres</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="financiamento"
                {...register('financiamento')}
                className="rounded border-gray-300"
              />
              <label htmlFor="financiamento" className="text-sm">
                Tenho interesse em opções de financiamento
              </label>
            </div>
          </section>

          <section className="space-y-4 pt-6 border-t border-border">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termos_privacidade"
                  {...register('termos_privacidade')}
                  className="rounded border-gray-300 mt-1"
                  aria-invalid={errors.termos_privacidade ? 'true' : 'false'}
                />
                <label htmlFor="termos_privacidade" className="text-sm">
                  Li e concordo com os{' '}
                  <a href="#" className="text-primary-600 underline">
                    termos de privacidade
                  </a>{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.termos_privacidade && (
                <span role="alert" className="text-sm text-red-600 block">
                  {errors.termos_privacidade.message}
                </span>
              )}

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="receber_novidades"
                  {...register('receber_novidades')}
                  className="rounded border-gray-300 mt-1"
                />
                <label htmlFor="receber_novidades" className="text-sm">
                  Desejo receber novidades e promoções por e-mail
                </label>
              </div>
            </div>
          </section>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex-1"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
