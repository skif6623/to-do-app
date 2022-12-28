import { Button } from 'components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter } from 'redux/actions';
import { getStatusFilter } from 'redux/selectors';
import { statusFilter } from 'redux/constants';
import css from './StatusFilter.module.css';

export const StatusFilter = () => {
  const filter = useSelector(getStatusFilter);
  const dispatsh = useDispatch();
  const handleFilterChange = filter => dispatsh(setStatusFilter(filter));

  return (
    <div className={css.wrapper}>
      <Button
        selected={filter === statusFilter.all}
        onClick={() => handleFilterChange(statusFilter.all)}
      >
        All
      </Button>
      <Button
        selected={filter === statusFilter.active}
        onClick={() => handleFilterChange(statusFilter.active)}
      >
        Active
      </Button>
      <Button
        selected={filter === statusFilter.completed}
        onClick={() => handleFilterChange(statusFilter.completed)}
      >
        Completed
      </Button>
    </div>
  );
};
