import type { task } from '../taskStore';

const BASE_URL = 'http://localhost:3000/tasks';

export async function getTasks() {
  const res = await fetch(`${BASE_URL}/getTasks`, {
    headers: { 'Authorization': '123456' }
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function addTask(task: task) {
  const res = await fetch(`${BASE_URL}/addTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '123456'
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
}

export async function removeTask(id: string) {
  const res = await fetch(`${BASE_URL}/removeTask/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': '123456' }
  });
  if (!res.ok) throw new Error('Failed to remove task');
  return res.json();
}
