import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../../../../services';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to load expenses:', err);
      setError(err.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expense) => {
    try {
      const newExpense = await expenseService.create(expense);
      setExpenses(prev => [...prev, newExpense]);
      return newExpense;
    } catch (err) {
      console.error('Failed to add expense:', err);
      setError(err.message || 'Failed to add expense');
      throw err;
    }
  }, []);

  const updateExpense = useCallback(async (id, expense) => {
    try {
      await expenseService.update(id, expense);
      setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...expense } : e));
    } catch (err) {
      console.error('Failed to update expense:', err);
      setError(err.message || 'Failed to update expense');
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await expenseService.delete(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      setError(err.message || 'Failed to delete expense');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return {
    expenses,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refresh: loadExpenses
  };
}