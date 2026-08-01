import { test, expect } from '@playwright/test';
test('marca tarefa como concluída e valida filtros', async ({ page }) => {
  await page.goto('');

  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('Tarefa A');
  await newTodo.press('Enter');
  await newTodo.fill('Tarefa B');
  await newTodo.press('Enter');

  // marca "Tarefa A" como concluída
  const todoA = page.getByTestId('todo-item').filter({ hasText: 'Tarefa A' });
  await todoA.getByRole('checkbox').check();

  // filtro Completed: só Tarefa A deve aparecer
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toHaveText(['Tarefa A']);

  // filtro Active: só Tarefa B deve aparecer
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toHaveText(['Tarefa B']);
});