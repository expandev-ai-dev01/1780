import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services/contactService';
import type { UseContactFormOptions, UseContactFormReturn } from './types';
import type { ContactFormData } from '../../types';

export const useContactForm = (options: UseContactFormOptions): UseContactFormReturn => {
  const [response, setResponse] = useState<UseContactFormReturn['response']>(null);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: contactService.submit,
    onSuccess: (data) => {
      setResponse(data);
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
  });

  const submit = async (data: ContactFormData) => {
    await mutateAsync(data);
  };

  return {
    submit,
    isSubmitting: isPending,
    error: error as Error | null,
    response,
  };
};
