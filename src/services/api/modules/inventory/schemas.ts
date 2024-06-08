import { InventoryItemSchema } from "@/schemas";
import { z } from "zod";

export const InventoryResponseSchema = z.array(InventoryItemSchema);

export const AddItemToInventoryRequestSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  quantity: z.coerce.number({ required_error: "Quantity is required" }),
});

export const AddItemsToInventoryRequestSchema = z.array(
  AddItemToInventoryRequestSchema
);

export const AddItemToInventoryResponseSchema = z.array(InventoryItemSchema);

export const AddItemToInventoryErrorResponseSchema = z.object({
  error: z.string(),
});

export const ResetInventoryResponseSchema = z.array(InventoryItemSchema);

export type InventoryResponse = z.infer<typeof InventoryResponseSchema>;
export type AddItemToInventoryRequest = z.infer<
  typeof AddItemToInventoryRequestSchema
>;
export type AddItemsToInventoryRequest = z.infer<
  typeof AddItemsToInventoryRequestSchema
>;
export type AddItemToInventoryResponse = z.infer<
  typeof AddItemToInventoryResponseSchema
>;
export type AddItemToInventoryErrorResponse = z.infer<
  typeof AddItemToInventoryErrorResponseSchema
>;
export type ResetInventoryResponse = z.infer<
  typeof ResetInventoryResponseSchema
>;
