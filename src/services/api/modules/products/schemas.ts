import { z } from "zod";

export const AllProductsResponseSchema = z.array(
  z.object({
    name: z.string({ required_error: "Name is required" }),
  })
);

export const CreateProductRequestSchema = z.object({
  name: z.string(),
});

export const CreateProductResponseSchema = z.array(
  z.object({
    name: z.string({ required_error: "Name is required" }),
  })
);

export const CreateProductErrorResponseSchema = z.object({ error: z.string() });

export type AllProductsResponse = z.infer<typeof AllProductsResponseSchema>;
export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;
export type CreateProductResponse = z.infer<typeof CreateProductResponseSchema>;
export type CreateProductErrorResponse = z.infer<
  typeof CreateProductErrorResponseSchema
>;
