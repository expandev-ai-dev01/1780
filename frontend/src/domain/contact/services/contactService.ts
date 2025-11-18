import { publicClient } from '@/core/lib/api';
import type { ContactFormData, ContactFormResponse } from '../types';

export const contactService = {
  async submit(data: ContactFormData): Promise<ContactFormResponse> {
    const response = await publicClient.post('/contact', data);
    return response.data.data;
  },
};
