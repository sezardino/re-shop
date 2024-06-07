import { AbstractApiModule } from "../../helpers";
import {
  AddItemToInventoryRequest,
  AddItemToInventoryResponseSchema,
  InventoryResponseSchema,
} from "./schemas";

export * from "./schemas";

export class InventoryApiModule extends AbstractApiModule {
  get() {
    return this.fetch({
      url: "inventory",
      method: "GET",
      schema: InventoryResponseSchema,
    });
  }

  addItem(dto: AddItemToInventoryRequest) {
    return this.fetch({
      url: "inventory",
      method: "PUT",
      data: dto,
      schema: AddItemToInventoryResponseSchema,
    });
  }

  reset(dto: AddItemToInventoryRequest) {
    return this.fetch({
      url: "inventory/reset",
      method: "POST",
      data: dto,
      schema: AddItemToInventoryResponseSchema,
    });
  }
}
