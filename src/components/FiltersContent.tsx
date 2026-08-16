import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  AVAILABLE_COMPANIES,
  AVAILABLE_CONNECTIONS,
  toggleCompany,
  toggleConnection,
} from '../features/filters/filtersSlice';

const getConnectionLabel = (amount: number) => {
  if (amount === 0) return 'Без пересадок';
  if (amount === 1) return '1 пересадка';
  return `${amount} пересадки`;
};

interface FiltersContentProps {
  compact?: boolean;
  order?: 'companies-first' | 'connections-first';
}

export const FiltersContent = ({
  compact = false,
  order = 'companies-first',
}: FiltersContentProps) => {
  const dispatch = useAppDispatch();
  const { companies, connections } = useAppSelector((state) => state.filters);

    const companiesGroup = (
  <fieldset className="filters-content__group filters-content__group_type_companies">
      <legend className="filters-content__title">Компании</legend>
      {AVAILABLE_COMPANIES.map((company) => (
        <label className="filters-content__option" key={company}>
          <input
            className="filters-content__input"
            type="checkbox"
            checked={companies.includes(company)}
            onChange={() => dispatch(toggleCompany(company))}
          />
          <span className="filters-content__control" aria-hidden="true" />
          <span>{company}</span>
        </label>
      ))}
    </fieldset>
  );

  const connectionsGroup = (
    <fieldset className="filters-content__group">
      <legend className="filters-content__title">Количество пересадок</legend>
      {AVAILABLE_CONNECTIONS.map((amount) => (
        <label className="filters-content__option" key={amount}>
          <input
            className="filters-content__input"
            type="checkbox"
            checked={connections.includes(amount)}
            onChange={() => dispatch(toggleConnection(amount))}
          />
          <span className="filters-content__control" aria-hidden="true" />
          <span>{getConnectionLabel(amount)}</span>
        </label>
      ))}
    </fieldset>
  );

  return (
    <div className={`filters-content${compact ? ' filters-content_compact' : ''}`}>
      {order === 'connections-first' ? (
        <>
          {connectionsGroup}
          {companiesGroup}
        </>
      ) : (
        <>
          {companiesGroup}
          {connectionsGroup}
        </>
      )}
    </div>
  );
};
