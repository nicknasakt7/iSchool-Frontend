import { z } from "zod"; 


export const userSchema = z.object({
  email: z
    .string({ error: "กรุณากรอกอีเมล" })
    .min(1, { message: "กรุณากรอกอีเมล" })
    .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),

  password: z
    .string({ error: "กรุณากรอกรหัสผ่าน" })
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
    .max(100, { message: "รหัสผ่านยาวเกินไป" })
    .regex(/[A-Z]/, { message: "ต้องมีตัวพิมพ์ใหญ่ (A-Z)" })
    .regex(/[a-z]/, { message: "ต้องมีตัวพิมพ์เล็ก (a-z)" })
    .regex(/[0-9]/, { message: "ต้องมีตัวเลข" }),
})