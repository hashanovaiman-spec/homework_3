import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Ticket } from '../../types/ticket';
import { ticketsSelectors } from './ticketsSlice';

const selectFilters = (state: RootState) => state.filters;

const getConnectionAmount = (ticket: Ticket) => ticket.connectionAmount ?? 0;

export const selectVisibleTickets = createSelector(
  [ticketsSelectors.selectAll, selectFilters],
  (tickets, filters) => {
    const filtered = tickets.filter((ticket) => {
      const companyMatches = filters.companies.includes(ticket.company);
      const connectionMatches = filters.connections.includes(
        getConnectionAmount(ticket),
      );

      return companyMatches && connectionMatches;
    });

    return [...filtered].sort((a, b) => {
      if (filters.sortMode === 'duration') {
        return a.duration - b.duration || a.price - b.price;
      }

      if (filters.sortMode === 'connections') {
        return (
          getConnectionAmount(a) - getConnectionAmount(b) ||
          a.price - b.price ||
          a.duration - b.duration
        );
      }

      return a.price - b.price || a.duration - b.duration;
    });
  },
);
