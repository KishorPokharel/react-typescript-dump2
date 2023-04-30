import { useContext } from 'react';
import TasksContext from '../contexts/tasksContext';

const useTasks = () => {
  return useContext(TasksContext);
};

export default useTasks;
