import { describe, expect, it, vi } from 'vitest'
import { HotelService } from '@/services/hotelService'
import type { JsonServerClient } from '@/services/jsonServerClient'
import type { Hotel, HotelDetails } from '@/types/hotel'
import type { apiData } from '@/types/api'

describe('HotelService', () => {
  it('passes filters and pagination params to the client when fetching hotels', async () => {
    const hotels: Hotel[] = [
      {
        id: 1,
        name: 'Hotel Center',
        stars: '4',
        totalPrice: 10000,
        dailyPrice: 5000,
        tax: 500,
        thumb: 'image.jpg',
        amenities: ['WI_FI'],
        hasBreakFast: true,
        hasRefundableRoom: false,
        district: 'Centro',
        placeId: 10,
      },
    ]

    const response: apiData<Hotel> = {
      data: hotels,
      pagination: {
        page: 2,
        limit: 5,
        totalItems: 1,
        totalPages: 1,
      },
    }

    const getMock = vi.fn().mockResolvedValue(response)

    const service = new HotelService({
      get: getMock,
      getById: vi.fn(),
    } as unknown as JsonServerClient)

    const result = await service.getAll(
      {
        placeId: 10,
        sortField: 'totalPrice',
        sortOrder: 'desc',
        hotelName: 'Center',
      },
      {
        page: 2,
        limit: 5,
      },
    )

    expect(getMock).toHaveBeenCalledWith('hotels', {
      page: 2,
      limit: 5,
      placeId: 10,
      _sort: 'totalPrice',
      _order: 'desc',
      name_like: 'Center',
    })
    expect(result).toEqual(response)
  })

  it('fetches hotel details by id', async () => {
    const details: HotelDetails = {
      id: 1,
      name: 'Hotel Center',
      description: 'Nice place',
      stars: '4',
      amenities: [],
      hasBreakFast: true,
      hasRefundableRoom: true,
      fullAddress: 'Rua 123',
      images: [],
    }

    const getByIdMock = vi.fn().mockResolvedValue(details)

    const service = new HotelService({
      get: vi.fn(),
      getById: getByIdMock,
    } as unknown as JsonServerClient)

    const result = await service.getDetailsById(1)

    expect(getByIdMock).toHaveBeenCalledWith('hotels_details', 1)
    expect(result).toEqual(details)
  })

  it('throws when hotel details are missing', async () => {
    const getByIdMock = vi.fn().mockResolvedValue(null)

    const service = new HotelService({
      get: vi.fn(),
      getById: getByIdMock,
    } as unknown as JsonServerClient)

    await expect(service.getDetailsById(1)).rejects.toThrow('Detalhes do hotel não encontrados.')
  })
})
