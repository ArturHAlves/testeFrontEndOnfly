const amenityLabels: Record<string, string> = {
  WI_FI: 'Wi-Fi',
  PARKING: 'Estacionamento',
  POOL: 'Piscina',
  SPA: 'Spa',
  GYM: 'Academia',
  RESTAURANT: 'Restaurante',
  ROOM_SERVICE: 'Servico de quarto',
};

export function formatAmenityName(code: string): string {
  return amenityLabels[code] ?? code.replace(/_/g, ' ');
}

const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatCurrencyFromCents(valueInCents: number): string {
  return brlFormatter.format(valueInCents / 100);
}
