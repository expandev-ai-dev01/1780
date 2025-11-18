export type ContactPreference = 'Telefone' | 'E-mail' | 'WhatsApp';
export type ContactSubject =
  | 'Informações gerais'
  | 'Agendamento de test drive'
  | 'Negociação de preço'
  | 'Financiamento'
  | 'Outro';
export type BestTime = 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';

export interface ContactFormData {
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: ContactPreference;
  melhor_horario?: BestTime;
  id_veiculo: string;
  modelo_veiculo: string;
  assunto: ContactSubject;
  mensagem: string;
  financiamento?: boolean;
  termos_privacidade: boolean;
  receber_novidades?: boolean;
}

export interface ContactFormSubmitData extends ContactFormData {
  ip_usuario: string;
}

export interface ContactFormResponse {
  id_contato: string;
  protocolo: string;
  mensagem: string;
}
