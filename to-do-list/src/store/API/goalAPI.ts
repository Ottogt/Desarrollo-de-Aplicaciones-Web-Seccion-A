 import type { goal } from '../goalStore';

const BASE_URL = 'http://localhost:3000/goals';

export async function getGoals() {
  const res = await fetch(`${BASE_URL}/getGoals`, {
    headers: { 'Authorization': '123456' }
  });
  if (!res.ok) throw new Error('Failed to fetch goals');
  return res.json();
}

export async function addGoal(goal: goal) {
  const res = await fetch(`${BASE_URL}/addGoal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '123456'
    },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error('Failed to add goal');
  return res.json();
}

export async function removeGoal(id: string) {
  const res = await fetch(`${BASE_URL}/removeGoal/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': '123456' }
  });
  if (!res.ok) throw new Error('Failed to remove goal');
  return res.json();
}
