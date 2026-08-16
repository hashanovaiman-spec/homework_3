import type { Ticket } from '../types/ticket';
import { CompanyLogo } from './CompanyLogo';

const formatPrice = (price: number) =>
  `${new Intl.NumberFormat('ru-RU').format(price)} Р`;

const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours} ч ${minutes} мин`;
};

const formatConnections = (amount: number | null) => {
  const value = amount ?? 0;
  if (value === 0) return 'Без пересадок';
  if (value === 1) return '1 пересадка';
  return `${value} пересадки`;
};

interface TicketCardProps {
  ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => (
  <article className="ticket-card">
    <div className="ticket-card__top">
      <strong className="ticket-card__price">{formatPrice(ticket.price)}</strong>
      <CompanyLogo company={ticket.company} />
    </div>

    <div className="ticket-card__details">
      <div className="ticket-card__detail">
        <span className="ticket-card__label">
          {ticket.from} - {ticket.to}
        </span>
        <span className="ticket-card__value">
          {ticket.time.startTime} - {ticket.time.endTime}
        </span>
      </div>

      <div className="ticket-card__detail">
        <span className="ticket-card__label">В пути</span>
        <span className="ticket-card__value">{formatDuration(ticket.duration)}</span>
      </div>

      <div className="ticket-card__detail">
        <span className="ticket-card__label">Пересадки</span>
        <span className="ticket-card__value">
          {formatConnections(ticket.connectionAmount)}
        </span>
      </div>
    </div>
  </article>
);
