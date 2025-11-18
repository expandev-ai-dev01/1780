import type { ContactFormData, ContactFormResponse } from '../../types';

export interface UseContactFormOptions {
  onSuccess?: (data: ContactFormResponse) => void;
  onError?: (error: Error) => void;
}

export interface UseContactFormReturn {
  submit: (data: ContactFormData) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
  response: ContactFormResponse | null;
}
