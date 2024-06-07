import { AbstractApiModule } from "../../helpers";
import {
  AllProductsResponseSchema,
  CreateProductErrorResponse,
  CreateProductRequest,
  CreateProductResponse,
  CreateProductResponseSchema,
} from "./schemas";

export * from "./schemas";

export class ProductsApiModule extends AbstractApiModule {
  all() {
    return this.fetch({
      url: "product/all",
      method: "GET",
      schema: AllProductsResponseSchema,
    });
  }

  create(dto: CreateProductRequest) {
    return this.fetch<CreateProductResponse, CreateProductErrorResponse>({
      url: "product",
      method: "PUT",
      data: dto,
      schema: CreateProductResponseSchema,
    });
  }
}
