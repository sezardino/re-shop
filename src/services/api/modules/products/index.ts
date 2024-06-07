import { AbstractApiModule } from "../../helpers";
import {
  AllProductsResponseSchema,
  CreateProductRequest,
  CreateProductResponseSchema,
} from "./schemas";

export * from "./schemas";

export class ProductsApiModule extends AbstractApiModule {
  all() {
    return this.fetch({
      url: "products",
      method: "GET",
      schema: AllProductsResponseSchema,
    });
  }

  create(dto: CreateProductRequest) {
    return this.fetch({
      url: "products",
      method: "PUT",
      data: dto,
      schema: CreateProductResponseSchema,
    });
  }
}
