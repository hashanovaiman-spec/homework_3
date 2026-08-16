import { FiltersContent } from './FiltersContent';

export const DesktopFilters = () => (
  <aside className="desktop-filters" aria-label="Фильтры">
    <FiltersContent order="connections-first" />
  </aside>
);
