import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ZodSchema } from "zod";

export abstract class AbstractApiModule {
  private url: string;

  constructor() {
    this.url = process.env.NEXT_PUBLIC_API_URL as string;
  }

  protected async fetch<T, Error = object>(
    config: AxiosRequestConfig & { schema: ZodSchema<T> }
  ): Promise<T> {
    const { schema, ...rest } = config;
    const response = await axios<AxiosError<Error>, AxiosResponse<Response>>(
      `${this.url}/${rest.url}`,
      config
    );

    const parsed = schema.parse(response.data);

    return parsed;
  }
}
