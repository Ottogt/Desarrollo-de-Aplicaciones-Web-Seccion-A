 // store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import * as taskApi from './API/taskAPI'

export type task={
  _id: string,
  name: string,
  description: string,
  duedate: string
}
type TaskState = {
  tasks: task[]
  setTasks: (tasks: task[]) => void
  fetchTasks: () => Promise<void>
  removeTask: (task: task) => Promise<void>
  addTask: (task: task) => Promise<void>
}


export const useTaskStore = create<TaskState>()(
  devtools(
    (set) => ({
      tasks: [],
      setTasks: (tasks: task[]) => set({ tasks }, false, 'setTasks'),
      fetchTasks: async () => {
        const data = await taskApi.getTasks();
        set({ tasks: data }, false, 'fetchTasks');
      },
      removeTask: async (task: task) => {
        await taskApi.removeTask(task._id);
        set((state) => ({ tasks: state.tasks.filter((t: task) => t._id !== task._id) }), false, 'removeTask');
      },
      addTask: async (task: task) => {
        const newTask = await taskApi.addTask(task);
        set((state) => ({ tasks: [...state.tasks, newTask] }), false, 'addTask');
      },
    }),
    { name: 'task-store' }
  )
)



export async function initializeTasks() {
  await useTaskStore.getState().fetchTasks();
}