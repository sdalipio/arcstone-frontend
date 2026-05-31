import httpClient from '../httpClient';

const BASE_PATH = '/budget-tracker/Budget';

export const budgetService = {
  // Get all budgets (project + category)
  get: () => httpClient.get(BASE_PATH),
  
  // Update budgets
  update: (budgetData) => httpClient.put(BASE_PATH, budgetData),
};