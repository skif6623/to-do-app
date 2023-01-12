import { useDispatch } from 'react-redux';
import { addTask } from 'redux/operations';
import { Button } from 'components/Button/Button';
import css from './TaskForm.module.css';

import toast, { Toaster } from 'react-hot-toast';

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (form.elements.text.value === '') {
      toast.error('Рядок задачі не може бути пустим');
      return;
    }

    dispatch(addTask(form.elements.text.value));
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.field}
        type="text"
        name="text"
        placeholder="Enter task text..."
      />
      <Button type="submit">Add task</Button>
      <Toaster position="bottom-right" reverseOrder={false} />
    </form>
  );
};
