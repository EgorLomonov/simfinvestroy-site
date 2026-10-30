import { z } from 'zod';

export const requestFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно быть не короче 2 символов')
    .max(60, 'Слишком длинное имя'),
  phone: z
    .string()
    .refine((val) => {
      // Убираем все нецифровые символы и проверяем длину
      const digits = val.replace(/\D/g, '');
      return digits.length >= 10;
    }, 'Введите корректный номер телефона'),
  city: z.string().min(2, 'Укажите город'),
  kvm: z
    .string()
    .refine(
      (v) => v !== '' && Number(v) > 0 && Number(v) < 1000,
      'Площадь должна быть от 1 до 1000 м²'
    ),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;