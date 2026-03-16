import type { apiData } from '@/types/api';
import { JsonServerClient } from './jsonServerClient';
import type { Hotel, HotelDetails, HotelFilters, PaginationOptions } from '@/types/hotel';

export class HotelService {
  private readonly client: JsonServerClient;
  private readonly endpoint = 'hotels';

  constructor(client: JsonServerClient = new JsonServerClient()) {
    this.client = client;
  }

  async getAll(filters: HotelFilters, pagination: PaginationOptions): Promise<apiData<Hotel>> {
    const { sortField, sortOrder, hotelName, ...restFilters } = filters;

    const params: Record<string, string | number | boolean | undefined> = {
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 10,
      ...restFilters,
    };

    if (sortField) {
      params._sort = sortField;
      params._order = sortOrder ?? 'asc';
    }

    if (hotelName) {
      params.name_like = hotelName;
    }

    const response = await this.client.get<Hotel>(this.endpoint, params);

    return response;
  }

  async getDetailsById(id: number): Promise<HotelDetails> {
    const response = await this.client.getById<HotelDetails>(`${this.endpoint}_details`, id);

    if (!response) {
      throw new Error(`Detalhes do hotel não encontrados.`);
    }

    return response;
  }
}
