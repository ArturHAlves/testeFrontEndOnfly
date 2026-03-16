import type { JsonServerListParams, apiData } from '@/types/api'

export class JsonServerClient {
  private readonly baseUrl = 'http://localhost:3000'

  async get<T>(endpoint: string, params: JsonServerListParams): Promise<apiData<T>> {
    const { page = 1, limit = 10, ...restParams } = params
    const searchParams = new URLSearchParams()

    searchParams.set('_page', page.toString())
    searchParams.set('_limit', limit.toString())

    Object.entries(restParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return
      }

      searchParams.set(key, String(value))
    })

    const response = await fetch(`${this.baseUrl}/${endpoint}?${searchParams.toString()}`)

    if (!response.ok) {
      throw new Error(`Falha na busca. Status: ${response.status}`)
    }

    const data = await response.json()
    const totalItemsHeader = response.headers.get('X-Total-Count')
    const totalItems = totalItemsHeader ? Number(totalItemsHeader) : data.length
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))

    return {
      data,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    }
  }
}
