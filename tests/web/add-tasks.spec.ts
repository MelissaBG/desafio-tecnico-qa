import { test, expect } from '@playwright/test';
import { TodoPage } from './todo-page';

test('adiciona duas tarefas e valida contador', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  await todoPage.addTodo('Comprar leite');
  await todoPage.addTodo('Estudar Playwright');

  await expect(todoPage.todoTitles).toHaveText([
    'Comprar leite',
    'Estudar Playwright',
  ]);
  await expect(todoPage.todoCount).toHaveText('2 items left');
});