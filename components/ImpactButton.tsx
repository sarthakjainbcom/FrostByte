import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

export function ImpactButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-md bg-red px-5 py-3 font-bold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan', className)} {...props} />;
}
