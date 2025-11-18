import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className, ...props }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-8',
    lg: 'size-12',
  };

  return (
    <div
      className={twMerge('flex items-center justify-center p-8', className)}
      role="status"
      aria-label="Carregando"
      {...props}
    >
      <div
        className={twMerge(
          'animate-spin rounded-full border-4 border-gray-200 border-t-primary-500',
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Carregando...</span>
    </div>
  );
};
