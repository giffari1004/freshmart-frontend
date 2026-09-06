import z from "zod";

export const addtoCartSchema = z.object({
    storeProductId: z.uuid(),
    quantity: z.number().min(1),
});

export const updateCartSchema = z.object({
    quantity: z.number().min(1),
});

export type AddToCartForm = z.infer<
typeof addtoCartSchema>;

export type UpdateCartFrom = z.infer<
typeof updateCartSchema>;