import { z } from "zod";

export const InventoryResponseSchema = z.array(
  z.object({
    name: z.string({ required_error: "Name is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
  })
);

export const AddItemToInventoryRequestSchema = z.array(
  z.object({
    name: z.string({ required_error: "Name is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
  })
);

export const AddItemToInventoryResponseSchema = z
  .array(
    z.object({
      name: z.string({ required_error: "Name is required" }),
      quantity: z.number({ required_error: "Quantity is required" }),
    })
  )
  .or(z.object({ error: z.string() }));

export type InventoryResponse = z.infer<typeof InventoryResponseSchema>;
export type AddItemToInventoryRequest = z.infer<
  typeof AddItemToInventoryRequestSchema
>;
export type AddItemToInventoryResponse = z.infer<
  typeof AddItemToInventoryResponseSchema
>;
