export interface PaginationMeta {
  page: number
  limit: number
  totalItems: number
  totalPages: number
}

export interface apiData<T> {
  data: T[]
  pagination: PaginationMeta
}

export interface JsonServerListParams {
  page?: number
  limit?: number
  [key: string]: string | number | boolean | undefined
}
