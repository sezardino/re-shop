import { InventoryApiModule, ProductsApiModule } from "./modules";

export * from "./modules";

class ApiService {
  products = new ProductsApiModule();
  inventory = new InventoryApiModule();
}

export const api = new ApiService();
