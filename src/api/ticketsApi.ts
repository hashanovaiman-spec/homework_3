import type { Ticket } from '../types/ticket';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isTicket = (value: unknown): value is Ticket => {
  if (!isRecord(value)) return false;

  const time = value.time;
  const connectionAmount = value.connectionAmount;

  return (
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    isNonEmptyString(value.from) &&
    isNonEmptyString(value.to) &&
    isNonEmptyString(value.company) &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price > 0 &&
    value.currency === 'RUB' &&
    isRecord(time) &&
    isNonEmptyString(time.startTime) &&
    isNonEmptyString(time.endTime) &&
    typeof value.duration === 'number' &&
    Number.isFinite(value.duration) &&
    value.duration > 0 &&
    isNonEmptyString(value.date) &&
    (connectionAmount === null ||
      (typeof connectionAmount === 'number' &&
        Number.isInteger(connectionAmount) &&
        connectionAmount >= 0))
  );
};

const isTicketsResponse = (value: unknown): value is Ticket[] =>
  Array.isArray(value) && value.every(isTicket);

export const fetchTicketsApi = async (signal?: AbortSignal): Promise<Ticket[]> => {
  const response = await fetch('/api/tickets.json', { signal });

  if (!response.ok) {
    throw new Error(`Не удалось загрузить билеты: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isTicketsResponse(data)) {
    throw new Error('Сервер вернул данные в неожиданном формате');
  }

  return data;
};
