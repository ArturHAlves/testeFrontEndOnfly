export interface Hotel {
  id: number;
  name: string;
  stars: string;
  totalPrice: number;
  dailyPrice: number;
  tax: number;
  thumb: string;
  amenities: string[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  district: string;
  placeId: number;
}

export interface HotelDetails {
  id: number;
  name: string;
  description: string;
  stars: string;
  amenities: HotelDetailAmenity[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  fullAddress: string;
  images: string[];
}

export interface HotelDetailAmenity {
  key: string;
  label: string;
}

export type HotelSortField = 'totalPrice' | 'stars';

export interface HotelFilters {
  placeId?: number;
  sortField?: HotelSortField;
  sortOrder?: 'asc' | 'desc';
  hotelName?: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}
