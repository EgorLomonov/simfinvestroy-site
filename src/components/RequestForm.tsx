import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  requestFormSchema,
  type RequestFormValues,
} from '../schemas/requestForm';
import { sendToTelegram } from '../lib/telegram';

interface RequestFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

// Улучшенная маска
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  
  // Если начинается с 8, меняем на 7
  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  }
  // Если не начинается с 7 и не пустая, добавляем 7
  if (digits.length > 0 && !digits.startsWith('7')) {
    digits = '7' + digits;
  }

  digits = digits.slice(0, 11);
  if (!digits) return '';

  let out = '+7';
  if (digits.length > 1) out += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) out += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 7) out += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) out += `-${digits.slice(9, 11)}`;
  return out;
}

export default function RequestForm({ onSuccess, onError }: RequestFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch, // Добавляем watch для отслеживания значения
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    mode: 'onTouched', // Валидация при потере фокуса
    defaultValues: {
      name: '',
      phone: '',
      city: 'Симферополь',
      kvm: '',
    },
  });

  const phoneValue = watch('phone'); // Следим за полем телефона

  const submit = async (values: RequestFormValues) => {
    setServerError(null);
    try {
      const text =
        'Заявка с сайта\n' +
        `Имя: ${values.name}\n` +
        `Телефон: ${values.phone}\n` +
        `Город: ${values.city}\n` +
        `Площадь: ${values.kvm} м²`;
      await sendToTelegram(text);
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (e) {
      console.error(e);
      const msg = 'Не удалось отправить заявку. Попробуйте ещё раз.';
      setServerError(msg);
      onError?.(msg);
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
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 px-4">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('phone')}
            type="tel"
            className="form-input"
            placeholder="+7 (999) 99-99-99"
            autoComplete="tel"
            disabled={isSubmitting}
            value={phoneValue} // Привязываем значение из watch
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setValue('phone', formatted, { shouldValidate: true });
            }}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1 px-4">
              {errors.phone.message}
            </p>
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
            disabled={isSubmitting}
          />
          <datalist id="cities-list">
            <option value="Симферополь" />
            <option value="Симферопольский район" />
          </datalist>
          {errors.city && (
            <p className="text-xs text-red-500 mt-1 px-4">
              {errors.city.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('kvm')}
            type="number"
            className="form-input"
            placeholder="Площадь м²"
            min={1}
            max={999}
            disabled={isSubmitting}
          />
          {errors.kvm && (
            <p className="text-xs text-red-500 mt-1 px-4">
              {errors.kvm.message}
            </p>
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