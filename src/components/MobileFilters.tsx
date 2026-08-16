import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import {
  AVAILABLE_COMPANIES,
  AVAILABLE_CONNECTIONS,
} from '../features/filters/filtersSlice';
import { FiltersContent } from './FiltersContent';

const buildSummary = (
  companies: string[],
  connections: number[],
): string => {
  const companyText =
    companies.length === AVAILABLE_COMPANIES.length
      ? 'Любая авиакомпания'
      : companies.length === 0
        ? 'Авиакомпании не выбраны'
        : companies.join(', ');

  const connectionsText =
    connections.length === AVAILABLE_CONNECTIONS.length
      ? 'любое кол-во пересадок'
      : connections.length === 0
        ? 'пересадки не выбраны'
        : `пересадок: ${connections.join(', ')}`;

  return `${companyText}, ${connectionsText}`;
};

export const MobileFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { companies, connections } = useAppSelector((state) => state.filters);

  return (
    <section className={`mobile-filters${isOpen ? ' mobile-filters_open' : ''}`}>
      <button
        className="mobile-filters__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-filters-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="mobile-filters__summary">
          {buildSummary(companies, connections)}
        </span>
        <span className="mobile-filters__action">
          {isOpen ? 'Закрыть настройки' : 'Открыть настройки'}
        </span>
        <span className="mobile-filters__chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="mobile-filters__panel" id="mobile-filters-panel">
          <FiltersContent compact />
        </div>
      )}
    </section>
  );
};
