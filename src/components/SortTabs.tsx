import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSortMode } from '../features/filters/filtersSlice';
import type { SortMode } from '../types/ticket';

const tabs: Array<{ value: SortMode; label: string }> = [
  { value: 'price', label: 'Самый дешевый' },
  { value: 'duration', label: 'Самый быстрый' },
  { value: 'connections', label: 'Самый оптимальный' },
];

export const SortTabs = () => {
  const dispatch = useAppDispatch();
  const sortMode = useAppSelector((state) => state.filters.sortMode);

  return (
    <div className="sort-tabs" role="tablist" aria-label="Сортировка билетов">
      {tabs.map((tab) => (
        <button
          className={`sort-tabs__button${
            sortMode === tab.value ? ' sort-tabs__button_active' : ''
          }`}
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={sortMode === tab.value}
          onClick={() => dispatch(setSortMode(tab.value))}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
