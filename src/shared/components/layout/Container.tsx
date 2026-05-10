import React from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isFull?: boolean;
}

export function Container({ children, className, isFull = false, ...props }: ContainerProps) {
  return (
    <div 
      className={cn(
        "w-full mx-auto px-6 md:px-12 lg:px-20",
        isFull ? "max-w-full" : "max-w-[var(--container-max, 1400px)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section 
      className={cn(
        "py-[var(--section-spacing-y-mobile, 64px)] md:py-[var(--section-spacing-y, 120px)] relative",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
