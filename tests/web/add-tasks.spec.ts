import { test, expect } from '@playwright/test';

test('adiciona duas tarefas e valida contador', async ({ page }) => {
  await page.goto('');

  const newTodo = page.getByPlaceholder('What needs to be done?');

  await newTodo.fill('Comprar leite');
  await newTodo.press('Enter');

  await newTodo.fill('Estudar Playwright');
  await newTodo.press('Enter');


  await expect(page.getByTestId('todo-title')).toHaveText([
    'Comprar leite',
    'Estudar Playwright',
  ]);

 
  await expect(page.getByTestId('todo-count')).toHaveText('2 items left');
});