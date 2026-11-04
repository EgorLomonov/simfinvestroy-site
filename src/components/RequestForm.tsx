import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  requestFormSchema,
  type RequestFormValues,
} from '../schemas/requestForm';
import { sendRequest } from '../lib/requests';
import { formatPhone } from '../lib/phone';

interface RequestFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

const DEFAULTS: RequestFormValues = {
  name: '',
  phone: '',
  city: 'Симферополь',
  kvm: '',
  website: '',
  consent: false,
};

export default function RequestForm({ onSuccess, onError }: RequestFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const startedAt = useRef(Date.now());

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    mode: 'onTouched',
    defaultValues: DEFAULTS,
  });

  const submit = async (values: RequestFormValues) => {
    setServerError(null);
    setSuccess(false);

    try {
      await sendRequest({
        name: values.name.trim(),
        phone: values.phone,
        city: values.city.trim(),
        kvm: values.kvm,
        page: window.location.pathname,
        ts: startedAt.current,
        website: values.website,
      });

      setSuccess(true);
      reset(DEFAULTS);
      startedAt.current = Date.now();
      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз.';
      setServerError(message);
      onError?.(message);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(submit)} noValidate>
      <div className="space-y-3">
        <div>
          <input
            {...register('name')}
            type="text"
            className="form-input"
            placeholder="Ваше имя"
            autoComplete="name"
            maxLength={60}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 px-4">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <input
                ref={field.ref}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(formatPhone(event.target.value))}
                type="tel"
                inputMode="tel"
                className="form-input"
                placeholder="+7 (999) 99-99-99"
                autoComplete="tel"
                maxLength={18}
                disabled={isSubmitting}
                aria-invalid={!!errors.phone}
              />
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 px-4">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('city')}
            type="text"
            className="form-input"
            placeholder="Ваш город"
            list="cities-list"
            autoComplete="address-level2"
            maxLength={60}
            disabled={isSubmitting}
            aria-invalid={!!errors.city}
          />
          <datalist id="cities-list">
            <option value="Симферополь" />
            <option value="Симферопольский район" />
          </datalist>
          {errors.city && (
            <p className="text-xs text-red-500 mt-1 px-4">{errors.city.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('kvm')}
            type="number"
            className="form-input"
            placeholder="Площадь м²"
            min={1}
            max={1000}
            inputMode="numeric"
            disabled={isSubmitting}
            aria-invalid={!!errors.kvm}
          />
          {errors.kvm && (
            <p className="text-xs text-red-500 mt-1 px-4">{errors.kvm.message}</p>
          )}
        </div>

        {/* Ловушка для ботов: скрытое поле должно остаться пустым */}
        <div className="hidden" aria-hidden="true">
          <label>
            Не заполняйте это поле
            <input
              {...register('website')}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div>
          <label className="flex items-start gap-2 text-xs text-body cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-primary"
              {...register('consent')}
              disabled={isSubmitting}
            />
            <span>
              Согласен с{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                политикой обработки персональных данных
              </a>
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-red-500 mt-1 px-1">{errors.consent.message}</p>
          )}
        </div>

        {serverError && (
          <p
            role="alert"
            className="text-sm text-red-500 bg-red-50 rounded-md px-3 py-2"
          >
            {serverError}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="text-sm text-green-700 bg-green-50 rounded-md px-3 py-2"
          >
            Заявка отправлена! Мы свяжемся с вами в ближайшее время.
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
        </button>
      </div>
    </form>
  );
}
