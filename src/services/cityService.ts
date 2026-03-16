import type { City } from '@/types/city';
import { JsonServerClient } from './jsonServerClient';

export class CityService {
  private readonly client: JsonServerClient;
  private readonly endpoint = 'cities';

  constructor(client: JsonServerClient = new JsonServerClient()) {
    this.client = client;
  }

  async getAll(): Promise<City[]> {
    const response = await this.client.get<City>(this.endpoint, {
      page: 1,
      limit: 1000,
    });

    return response.data;
  }
}
