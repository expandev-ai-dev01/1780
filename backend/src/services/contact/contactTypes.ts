/**
 * @interface ContactCreateRequest
 * @description Request parameters for creating a contact
 *
 * @property {string} nome_completo - Full name of the contact
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferencia_contato - Contact preference
 * @property {string} [melhor_horario] - Best time to contact
 * @property {string} id_veiculo - Vehicle identifier
 * @property {string} modelo_veiculo - Vehicle model
 * @property {string} assunto - Inquiry subject
 * @property {string} mensagem - Message content
 * @property {boolean} [financiamento] - Interest in financing
 * @property {boolean} termos_privacidade - Privacy terms acceptance
 * @property {boolean} [receber_novidades] - Opt-in for news
 * @property {string} ip_usuario - User IP address
 */
export interface ContactCreateRequest {
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: string;
  melhor_horario?: string;
  id_veiculo: string;
  modelo_veiculo: string;
  assunto: string;
  mensagem: string;
  financiamento?: boolean;
  termos_privacidade: boolean;
  receber_novidades?: boolean;
  ip_usuario: string;
}

/**
 * @interface ContactCreateResult
 * @description Result of contact creation
 *
 * @property {string} id_contato - Contact identifier
 * @property {string} protocolo - Protocol number
 */
export interface ContactCreateResult {
  id_contato: string;
  protocolo: string;
}

/**
 * @interface ContactEntity
 * @description Represents a contact entity in the system
 *
 * @property {string} id_contato - Unique contact identifier
 * @property {string} nome_completo - Full name
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferencia_contato - Contact preference
 * @property {string} melhor_horario - Best time to contact
 * @property {string} id_veiculo - Vehicle identifier
 * @property {string} modelo_veiculo - Vehicle model
 * @property {string} assunto - Inquiry subject
 * @property {string} mensagem - Message content
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} termos_privacidade - Privacy terms acceptance
 * @property {boolean} receber_novidades - Opt-in for news
 * @property {string} ip_usuario - User IP address
 * @property {Date} data_envio - Submission date
 * @property {string} protocolo - Protocol number
 * @property {ContactStatus} status - Contact status
 * @property {string} [consultor_responsavel] - Assigned consultant
 * @property {Date} data_ultima_atualizacao - Last update date
 * @property {string} [notas_atendimento] - Service notes
 */
export interface ContactEntity {
  id_contato: string;
  nome_completo: string;
  email: string;
  telefone: string;
  preferencia_contato: string;
  melhor_horario: string;
  id_veiculo: string;
  modelo_veiculo: string;
  assunto: string;
  mensagem: string;
  financiamento: boolean;
  termos_privacidade: boolean;
  receber_novidades: boolean;
  ip_usuario: string;
  data_envio: Date;
  protocolo: string;
  status: ContactStatus;
  consultor_responsavel?: string;
  data_ultima_atualizacao: Date;
  notas_atendimento?: string;
}

/**
 * @enum ContactStatus
 * @description Contact status enumeration
 */
export enum ContactStatus {
  Novo = 'Novo',
  EmAtendimento = 'Em atendimento',
  Concluido = 'Concluído',
  Cancelado = 'Cancelado',
}
