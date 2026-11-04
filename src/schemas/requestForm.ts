import { z } from 'zod';

export const requestFormSchema = z.object({
  name: z
    .string()
    .refine((v) => v.trim().length >= 2, 'Имя должно быть не короче 2 символов')
    .refine((v) => v.trim().length <= 60, 'Слишком длинное имя'),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, '').length === 11, 'Введите номер полностью'),
  city: z
    .string()
    .refine((v) => v.trim().length >= 2, 'Укажите город')
    .refine((v) => v.trim().length <= 60, 'Слишком длинное название'),
  kvm: z
    .string()
    .refine((v) => {
      const area = Number(v.replace(',', '.'));
      return Number.isFinite(area) && area >= 1 && area <= 1000;
    }, 'Площадь должна быть от 1 до 1000 м²'),
  // Ловушка для ботов: поле должно оставаться пустым
  website: z.string().max(0, 'Ошибка отправки'),
  consent: z
    .boolean()
    .refine((v) => v === true, 'Нужно согласие на обработку персональных данных'),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;
