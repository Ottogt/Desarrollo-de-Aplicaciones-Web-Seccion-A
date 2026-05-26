// store.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import * as goalApi from './API/goalAPI'

export type goal={
  _id: string,
  name: string,
  description: string
  duedate: string
}

type GoalState = {
  goals: goal[]
  setGoals: (goals: goal[]) => void
  fetchGoals: () => Promise<void>
  removeGoal: (goal: goal) => Promise<void>
  addGoal: (goal: goal) => Promise<void>
}


export const useGoalStore = create<GoalState>()(
  devtools(
    (set) => ({
      goals: [],
      setGoals: (goals: goal[]) => set({ goals }, false, 'setGoals'),
      fetchGoals: async () => {
        const data = await goalApi.getGoals();
        set({ goals: data }, false, 'fetchGoals');
      },
      removeGoal: async (goal: goal) => {
        await goalApi.removeGoal(goal._id);
        set((state) => ({ goals: state.goals.filter((g: goal) => g._id !== goal._id) }), false, 'removeGoal');
      },
      addGoal: async (goal: goal) => {
        const newGoal = await goalApi.addGoal(goal);
        set((state) => ({ goals: [...state.goals, newGoal] }), false, 'addGoal');
      },
    }),
    { name: 'goal-store' }
  )
)


export async function initializeGoals() {
  await useGoalStore.getState().fetchGoals();
}