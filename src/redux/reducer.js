import {
  AddTask,
  DeleteTask,
  DoneTask,
  ListTask,
  UpdateStatus,
  UpdateTask,
  DoNot,
  DoNe,
} from './constants';

const INITIAL_STATE = {
  tasks: [
    {id: 0, title: 'task 1', status: '', done: false},
    {id: 1, title: 'task 2', status: '', done: false},
    {id: 2, title: 'task 3', status: '', done: false},
    {id: 3, title: 'task 4', status: '', done: true},
    {id: 4, title: 'task 5', status: '', done: true},
  ],
  done: [],
  doN: [],
};
const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ListTask:
      return {
        tasks: state.tasks, //all task
        doN: filterStatusTask(DoNot, state.tasks), //filter task by status
        done: filterStatusTask(DoNe, state.tasks),
      };

    case AddTask:
      return {
        tasks: [...state.tasks, action.payload], //add new task
        doN: filterStatusTask(DoNot, [...state.tasks, action.payload]), //handle task do not finish
        done:filterStatusTask(DoNot, [...state.tasks, action.payload])
      };
    case DeleteTask:
      return {
        tasks: handleRemoveTask(action.payload, state.tasks),
        doN: filterStatusTask(
          DoNot,
          handleRemoveTask(action.payload, state.tasks),
        ),
        done: filterStatusTask(DoNe, state.tasks),
      };

    case UpdateStatus:
      return {
        tasks: updateStatus(action.payload, state.tasks),
        done: filterStatusTask(DoNe, updateStatus(action.payload, state.tasks)),
        doN: filterStatusTask(DoNot, updateStatus(action.payload, state.tasks)),
      };

    default:
      return state;
  }
};


const handleRemoveTask = (item, listTask) => {
  return listTask.filter(value => value.id != item.id);
};

const updateStatus = (item, listTask) => {
  const indexOfItem = listTask.findIndex(value => value.id == item.id);
  listTask[indexOfItem].done = true;
  return listTask;
};

const filterStatusTask = (type, listTask) => {
  if (type === DoNot) {
    return listTask.filter(value => value.done != true);
  }
  if (type === DoNe) {
    return listTask.filter(value => value.done === true);
  }
};
export default taskReducer;
