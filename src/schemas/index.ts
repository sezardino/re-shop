import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
});

export const InventoryItemSchema = z
  .object({
    quantity: z.coerce.number({ required_error: "Quantity is required" }),
  })
  .merge(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
