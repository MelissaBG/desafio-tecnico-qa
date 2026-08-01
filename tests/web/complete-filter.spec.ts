import { test, expect } from '@playwright/test';
import { TodoPage } from './todo-page';

test('marca tarefa como concluída e valida filtros', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo('Tarefa A');
  await todoPage.addTodo('Tarefa B');

  await todoPage.completeTodo('Tarefa A');

  await todoPage.filterBy('Completed');
  await expect(todoPage.todoTitles).toHaveText(['Tarefa A']);

  await todoPage.filterBy('Active');
  await expect(todoPage.todoTitles).toHaveText(['Tarefa B']);
});