import httpClient from '../httpClient';

const BASE_PATH = '/budget-tracker/Expenses';

export const expenseService = {
  // Get all expenses
  getAll: () => httpClient.get(BASE_PATH),
  
  // Get single expense by ID
  getById: (id) => httpClient.get(`${BASE_PATH}/${id}`),
  
  // Create new expensex
  create: (expense) => httpClient.post(BASE_PATH, expense),
  
  // Update existing expense
  update: (id, expense) => httpClient.put(`${BASE_PATH}/${id}`, expense),
  
  // Delete expense
  delete: (id) => httpClient.delete(`${BASE_PATH}/${id}`),
};