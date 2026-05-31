import { useState, useEffect, useCallback } from 'react';
import { budgetService } from '../../../../services';

export function useBudget() {
  const [projectBudget, setProjectBudget] = useState(0);
  const [categoryBudgets, setCategoryBudgets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBudget = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.get();
      setProjectBudget(data.projectBudget || 0);
      setCategoryBudgets(data.categoryBudgets || {});
    } catch (err) {
      console.error('Failed to load budget:', err);
      setError(err.message || 'Failed to load budget');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveBudget = useCallback(async (projectAmount, categoryAmounts) => {
    try {
      await budgetService.update({
        projectBudget: projectAmount,
        categoryBudgets: categoryAmounts
      });
      setProjectBudget(projectAmount);
      setCategoryBudgets(categoryAmounts);
    } catch (err) {
      console.error('Failed to save budget:', err);
      setError(err.message || 'Failed to save budget');
      throw err;
    }
  }, []);

  useEffect(() => {
    loadBudget();
  }, [loadBudget]);

  return {
    projectBudget,
    categoryBudgets,
    loading,
    error,
    saveBudget,
    refresh: loadBudget
  };
}