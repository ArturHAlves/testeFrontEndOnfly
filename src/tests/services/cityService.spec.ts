import { describe, expect, it, vi } from 'vitest';
import { CityService } from '@/services/cityService';
import type { JsonServerClient } from '@/services/jsonServerClient';
import type { City } from '@/types/city';

describe('CityService', () => {
  it('fetches all cities using the JSON server client', async () => {
    const mockCities: City[] = [
      {
        name: 'São Paulo',
        state: { name: 'São Paulo', shortname: 'SP' },
        placeId: 1,
      },
      {
        name: 'Rio de Janeiro',
        state: { name: 'Rio de Janeiro', shortname: 'RJ' },
        placeId: 2,
      },
    ];

    const getMock = vi.fn().mockResolvedValue({
      data: mockCities,
      pagination: {
        page: 1,
        limit: 1000,
        totalItems: mockCities.length,
        totalPages: 1,
      },
    });

    const service = new CityService({ get: getMock } as unknown as JsonServerClient);

    const result = await service.getAll();

    expect(getMock).toHaveBeenCalledWith('cities', { page: 1, limit: 1000 });
    expect(result).toEqual(mockCities);
  });
});
