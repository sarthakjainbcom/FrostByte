'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  region: z.string().min(2),
  platform: z.string().min(2),
  role: z.string().min(2),
  hours: z.coerce.number().min(1).max(80),
  consent: z.boolean().refine(Boolean),
  age: z.boolean().refine(Boolean),
  company: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function PlaytestForm() {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { company: '' } });

  const onSubmit = async (values: FormValues) => {
    if (values.company) return;
    const res = await fetch('/api/playtest', { method: 'POST', body: JSON.stringify(values) });
    if (res.ok) setDone(true);
  };

  if (done) return <p className="rounded border border-cyan p-4">⚓ You’re on the list. Check your inbox for the crest signal.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 rounded border border-white/10 p-4">
      <input placeholder="Name" {...register('name')} className="rounded bg-ocean/50 p-2" />
      {errors.name && <span className="text-red">Name required.</span>}
      <input placeholder="Email" {...register('email')} className="rounded bg-ocean/50 p-2" />
      <input placeholder="Region" {...register('region')} className="rounded bg-ocean/50 p-2" />
      <input placeholder="Platform" {...register('platform')} className="rounded bg-ocean/50 p-2" />
      <input placeholder="Preferred role" {...register('role')} className="rounded bg-ocean/50 p-2" />
      <input type="number" placeholder="Hours/week" {...register('hours')} className="rounded bg-ocean/50 p-2" />
      <input tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register('company')} />
      <label><input type="checkbox" {...register('consent')} /> I consent to playtest emails.</label>
      <label><input type="checkbox" {...register('age')} /> I confirm I meet regional age requirements.</label>
      <button disabled={isSubmitting} className="rounded bg-red p-2 font-bold">{isSubmitting ? 'Sending...' : 'Claim Your Slot'}</button>
      <p className="text-xs text-muted">TODO: wire to backend CRM + rate limiter.</p>
    </form>
  );
}
