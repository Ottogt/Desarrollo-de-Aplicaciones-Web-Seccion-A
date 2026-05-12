import {create} from 'zustand' 
import { devtools } from 'zustand/middleware'


export type task = {
    id: number;
    name: string;
    description: string;
    dueDate: string;
}

type TaskState = {
    tasks: task[];
    setTasks: (tasks: task[]) => void;
    removeTasks: (task:task) => void;
    addTasks: (task: task) => void;
}

export const useTaskStore = create<TaskState>()(
    devtools((set) => ({
        tasks: [],
        setTasks: (tasks) => set({ tasks }, false, 'setTasks'),
        removeTasks: (task) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== task.id) })),
        addTasks: (task) => set((state) => ({ tasks: [...state.tasks, task] }),false , 'addTask'),
    }),
    { name: 'TaskS' }   
)
);  
