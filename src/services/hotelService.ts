import type { apiData } from '@/types/api'
import { JsonServerClient } from './jsonServerClient'
import type { Hotel, HotelFilters, PaginationOptions } from '@/types/hotel'

export class HotelService {
  private readonly client: JsonServerClient
  private readonly endpoint = 'hotels'

  constructor(client: JsonServerClient = new JsonServerClient()) {
    this.client = client
  }

  async getAll(filters: HotelFilters, pagination: PaginationOptions): Promise<apiData<Hotel>> {
    const params = {
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 10,
      ...filters,
    }

    const response = await this.client.get<Hotel>(this.endpoint, params)

    // console.log('[HotelService.getAll] params enviados:', params)
    // console.log('[HotelService.getAll] retorno recebido:', response)

    return response
  }
}
