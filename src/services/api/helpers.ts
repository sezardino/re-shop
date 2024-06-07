import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodSchema } from "zod";

export abstract class AbstractApiModule {
  url: string;

  constructor() {
    this.url = "https://api.example.com";
  }

  protected async fetch<T, Error = object>(
    config: AxiosRequestConfig & { schema: ZodSchema<T> }
  ): Promise<T> {
    const { schema, ...rest } = config;
    const response = await axios<AxiosError<Error>, AxiosResponse<Response>>(
      `${this.url}/${rest.url}`,
      config
    );

    return schema.parse(response.data);
  }
}
