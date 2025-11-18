import type { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(
        'rounded-sm',
        'border',
        'border-gray-200',
        'bg-white',
        'shadow-sm',
        'p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div className={twMerge('flex flex-col space-y-1.5 pb-4', className)} {...props}>
      {children}
    </div>
  );
};

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3
      className={twMerge('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={twMerge('pt-0', className)} {...props}>
      {children}
    </div>
  );
};
