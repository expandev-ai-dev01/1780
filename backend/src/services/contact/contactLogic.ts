import {
  ContactCreateRequest,
  ContactCreateResult,
  ContactEntity,
  ContactStatus,
} from './contactTypes';

const contacts: ContactEntity[] = [];
let contactCounter = 1;

/**
 * @summary
 * Creates a new contact submission from the vehicle inquiry form
 *
 * @function contactCreate
 * @module contact
 *
 * @param {ContactCreateRequest} params - Contact creation parameters
 *
 * @returns {Promise<ContactCreateResult>} Created contact with protocol number
 *
 * @example
 * const result = await contactCreate({
 *   nome_completo: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 98765-4321',
 *   preferencia_contato: 'WhatsApp',
 *   id_veiculo: '1',
 *   modelo_veiculo: 'Honda Civic (2023)',
 *   assunto: 'Informações gerais',
 *   mensagem: 'Gostaria de mais informações sobre este veículo',
 *   termos_privacidade: true,
 *   ip_usuario: '192.168.1.1'
 * });
 */
export async function contactCreate(params: ContactCreateRequest): Promise<ContactCreateResult> {
  /**
   * @rule {fn-contact-processing} Generate unique contact ID and protocol number
   */
  const id_contato = `CONT-${Date.now()}-${contactCounter}`;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequencial = String(contactCounter).padStart(5, '0');
  const protocolo = `${year}${month}${day}${sequencial}`;

  /**
   * @rule {fn-contact-processing} Create contact entity with default values
   */
  const contact: ContactEntity = {
    id_contato,
    nome_completo: params.nome_completo,
    email: params.email,
    telefone: params.telefone,
    preferencia_contato: params.preferencia_contato,
    melhor_horario: params.melhor_horario || 'Qualquer horário',
    id_veiculo: params.id_veiculo,
    modelo_veiculo: params.modelo_veiculo,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento || false,
    termos_privacidade: params.termos_privacidade,
    receber_novidades: params.receber_novidades || false,
    ip_usuario: params.ip_usuario,
    data_envio: now,
    protocolo,
    status: ContactStatus.Novo,
    data_ultima_atualizacao: now,
  };

  /**
   * @rule {fn-contact-processing} Store contact in memory
   */
  contacts.push(contact);
  contactCounter++;

  /**
   * @remarks In a production environment, this would:
   * - Send confirmation email to user
   * - Send notification email to sales team
   * - Integrate with CRM system
   */

  return {
    id_contato,
    protocolo,
  };
}
