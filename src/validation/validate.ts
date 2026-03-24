import z  from 'zod';

export const productSchema = z.object({
  // id: z.number(), ❗️ ตัวปัญหา frontend ไม่ได้มีการส่ง id มา
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0)
})

