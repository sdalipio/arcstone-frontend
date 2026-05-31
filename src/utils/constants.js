import { 
    HardHat, 
    UtensilsCrossed, 
    Hammer, 
    Construction, 
    Zap, 
    Truck, 
    ClipboardList, 
    MoreHorizontal 
  } from 'lucide-react';
  
  // Expense categories used across Budget Tracker
  export const EXPENSE_CATEGORIES = [
    { value: 'workers',       label: 'Worker Salaries',  icon: HardHat,         color: '#4F8EF7', bg: '#EBF2FF' },
    { value: 'food',          label: 'Food & Supplies',  icon: UtensilsCrossed, color: '#22C989', bg: '#E3FAF1' },
    { value: 'materials',     label: 'Raw Materials',    icon: Hammer,          color: '#F59E0B', bg: '#FEF3C7' },
    { value: 'equipment',     label: 'Equipment Rental', icon: Construction,    color: '#7C5CFC', bg: '#EEE9FF' },
    { value: 'utilities',     label: 'Utilities',        icon: Zap,             color: '#06B6D4', bg: '#ECFEFF' },
    { value: 'transport',     label: 'Transport',        icon: Truck,           color: '#EC4899', bg: '#FDF2F8' },
    { value: 'permits',       label: 'Permits & Fees',   icon: ClipboardList,   color: '#6B7280', bg: '#F3F4F6' },
    { value: 'miscellaneous', label: 'Miscellaneous',    icon: MoreHorizontal,  color: '#9CA3AF', bg: '#F9FAFB' },
  ];
  
  // Helper function to get category by value
  export const getCategoryByValue = (value) => {
    return EXPENSE_CATEGORIES.find(cat => cat.value === value) || EXPENSE_CATEGORIES[7];
  };
  
  // Month names for analytics
  export const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];