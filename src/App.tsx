import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { DesktopFilters } from './components/DesktopFilters';
import { Logo } from './components/Logo';
import { MobileFilters } from './components/MobileFilters';
import { SortTabs } from './components/SortTabs';
import { TicketCard } from './components/TicketCard';
import { selectVisibleTickets } from './features/tickets/selectors';
import { fetchTickets } from './features/tickets/ticketsSlice';

const PAGE_SIZE = 3;

function App() {
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(selectVisibleTickets);
  const status = useAppSelector((state) => state.tickets.status);
  const error = useAppSelector((state) => state.tickets.error);
  const filters = useAppSelector((state) => state.filters);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const promise = dispatch(fetchTickets());
    return () => promise.abort();
  }, [dispatch]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters.sortMode, filters.companies, filters.connections]);

  const visibleTickets = useMemo(
    () => tickets.slice(0, visibleCount),
    [tickets, visibleCount],
  );

  const canLoadMore = visibleCount < tickets.length;

  return (
    <div className="app">
      <header className="app__header">
        <Logo />
      </header>

      <div className="app__layout">
        <DesktopFilters />

        <main className="app__main">
          <SortTabs />
          <MobileFilters />

          {status === 'loading' && (
            <div className="status-message">Загружаем билеты…</div>
          )}

          {status === 'failed' && (
            <div className="status-message status-message_error">
              <p>{error}</p>
              <button type="button" onClick={() => dispatch(fetchTickets())}>
                Повторить
              </button>
            </div>
          )}

          {status === 'succeeded' && visibleTickets.length === 0 && (
            <div className="status-message">
              По выбранным фильтрам билетов нет.
            </div>
          )}

          {visibleTickets.length > 0 && (
            <div className="tickets" aria-live="polite">
              {visibleTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}

          {canLoadMore && (
            <button
              className="load-more"
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Загрузить еще билеты
            </button>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
