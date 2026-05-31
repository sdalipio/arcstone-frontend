import { useState } from 'react';
import { 
  TrendingUp, Wallet, BarChart3, Calendar, PieChart, Building2, 
  Target, ShieldAlert, Loader2, AlertCircle, Users, Clock 
} from 'lucide-react';
import { useExpenses, useBudget } from './hooks';
import DailyView from './DailyView';
import MonthlyView from './MonthlyView';
import Analytics from './Analytics';
import BudgetSetup from './BudgetSetup';
import { formatPHP } from '../../../utils/formatters';
// NEW IMPORTS
import PayrollEntry from './workers/PayrollEntry';
import WorkerManagement from './workers/WorkerManagement';

export default function BudgetTracker() {
  const [activeTab, setActiveTab] = useState('budget');
  
  // NEW STATE FOR WORKERS AND PAYROLL
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'Juan Dela Cruz',
      dailyRate: 450,
      position: 'laborer',
      contactNumber: '09123456789',
      isActive: true,
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Pedro Santos',
      dailyRate: 650,
      position: 'foreman',
      contactNumber: '09123456780',
      isActive: true,
      dateAdded: '2024-01-15'
    }
  ]);
  
  const [payrollEntries, setPayrollEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { 
    expenses, 
    loading: expensesLoading, 
    error: expensesError,
    addExpense, 
    deleteExpense 
  } = useExpenses();
  
  const { 
    projectBudget, 
    categoryBudgets, 
    loading: budgetLoading,
    error: budgetError,
    saveBudget 
  } = useBudget();

  // NEW FUNCTION: Convert payroll to expense
  const handlePayrollToExpense = (payroll) => {
    addExpense({
      amount: payroll.totalAmount,
      category: 'labor',
      description: `Payroll: ${payroll.workerName} (${payroll.daysWorked} days)`,
      date: payroll.date,
      type: 'payroll'
    });
  };

  const loading = expensesLoading || budgetLoading;
  const error = expensesError || budgetError;

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses.filter(e => e.date === todayStr).reduce((s, e) => s + e.amount, 0);

  const budgetPct = projectBudget > 0 ? (totalExpenses / projectBudget) * 100 : 0;
  const budgetRemaining = projectBudget - totalExpenses;
  const isOverBudget = projectBudget > 0 && totalExpenses > projectBudget;
  const isWarning = projectBudget > 0 && budgetPct >= 80 && !isOverBudget;

  const getBudgetColor = () => {
    if (isOverBudget) return '#F43F5E';
    if (isWarning) return '#F59E0B';
    return '#22C989';
  };

  // UPDATED TABS to include Workers and Payroll
  const tabs = [
    { id: 'budget', label: 'Budgets', icon: Target },
    { id: 'daily', label: 'Daily', icon: Calendar },
    { id: 'monthly', label: 'Monthly', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'workers', label: 'Workers', icon: Users },        // NEW TAB
    { id: 'payroll', label: 'Payroll', icon: Clock },        // NEW TAB
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
        <div className="main-container" style={{ paddingTop: '60px', textAlign: 'center' }}>
          <Loader2 size={48} color="#4F8EF7" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
        <div className="main-container" style={{ paddingTop: '60px', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#FFF1F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <AlertCircle size={28} color="#F43F5E" />
          </div>
          <h3 style={{ color: '#F43F5E', marginBottom: '8px' }}>Connection Error</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '8px 20px',
              background: '#4F8EF7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '3rem' }}>

      {/* Hero */}
      <div style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }} className="animate-fadeInUp">
        <div className="main-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '6px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(79,142,247,0.35)',
              flexShrink: 0,
            }}>
              <Building2 size={22} color="#fff" strokeWidth={2} />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(22px, 5vw, 30px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.6px',
                lineHeight: 1.1,
              }}>
                Construction Budget Tracker
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                Track and manage your project expenses
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-container">

        {/* Overall Project Budget Banner */}
        {projectBudget > 0 && (
          <div
            className="animate-fadeInUp"
            style={{
              background: isOverBudget
                ? 'linear-gradient(135deg, #FFF1F2, #FFE4E6)'
                : isWarning
                ? 'linear-gradient(135deg, #FFFBEB, #FEF3C7)'
                : 'linear-gradient(135deg, #F0FDF4, #DCFCE7)',
              border: `1.5px solid ${isOverBudget ? '#FCA5A5' : isWarning ? '#FDE68A' : '#86EFAC'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: isOverBudget ? '#FEE2E2' : isWarning ? '#FEF3C7' : '#D1FAE5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {isOverBudget
                    ? <ShieldAlert size={18} color="#F43F5E" strokeWidth={2} />
                    : <Target size={18} color={getBudgetColor()} strokeWidth={2} />
                  }
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: isOverBudget ? '#9F1239' : isWarning ? '#92400E' : '#166534', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    {isOverBudget ? 'Over Budget!' : isWarning ? 'Budget Warning' : 'Project Budget'}
                  </p>
                  <p style={{ fontSize: '12.5px', color: isOverBudget ? '#BE123C' : isWarning ? '#B45309' : '#15803D', marginTop: '1px' }}>
                    {isOverBudget
                      ? `Exceeded by ${formatPHP(Math.abs(budgetRemaining))}`
                      : `${formatPHP(budgetRemaining)} remaining`}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, fontFamily: 'var(--font-sans)', color: isOverBudget ? '#F43F5E' : isWarning ? '#D97706' : '#16A34A', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  {formatPHP(totalExpenses)}
                </p>
                <p style={{ fontSize: '12.5px', color: isOverBudget ? '#BE123C' : isWarning ? '#B45309' : '#15803D', marginTop: '3px' }}>
                  of {formatPHP(projectBudget)} budget · {budgetPct.toFixed(1)}% used
                </p>
              </div>
            </div>

            <div style={{ height: '10px', background: 'rgba(0,0,0,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(budgetPct, 100)}%`,
                background: isOverBudget
                  ? 'linear-gradient(90deg, #F43F5E, #FB7185)'
                  : isWarning
                  ? 'linear-gradient(90deg, #F59E0B, #FCD34D)'
                  : 'linear-gradient(90deg, #22C989, #4ADE80)',
                borderRadius: '99px',
                transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
          marginBottom: '28px',
        }}>
          {[
            {
              label: 'Total Spent',
              value: formatPHP(totalExpenses),
              icon: Wallet,
              iconBg: '#FFF1F2',
              iconColor: '#F43F5E',
              trend: `${expenses.length} transactions`,
            },
            {
              label: "Today's Expenses",
              value: formatPHP(todayExpenses),
              icon: TrendingUp,
              iconBg: '#EBF2FF',
              iconColor: '#4F8EF7',
              trend: 'as of today',
            },
            {
              label: 'Avg per Entry',
              value: formatPHP(avgExpense),
              icon: BarChart3,
              iconBg: '#EEE9FF',
              iconColor: '#7C5CFC',
              trend: 'across all records',
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fadeInUp"
              style={{
                animationDelay: `${i * 60}ms`,
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                padding: '18px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <div>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-tertiary)', letterSpacing: '0.2px', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '5px' }}>
                  {stat.trend}
                </p>
              </div>
              <div style={{
                width: '42px', height: '42px', borderRadius: '11px',
                background: stat.iconBg, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <stat.icon size={19} color={stat.iconColor} strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '24px',
          background: 'var(--surface-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '4px',
          border: '1px solid var(--border-subtle)',
          width: 'fit-content',
          flexWrap: 'wrap',  // Added for responsiveness
        }}>
          {tabs.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '9px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: active ? 'var(--surface-card)' : 'transparent',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: active ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <tab.icon size={14} strokeWidth={active ? 2.5 : 2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="animate-fadeInUp" key={activeTab}>
          {activeTab === 'daily' && (
            <DailyView
              expenses={expenses}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
              categoryBudgets={categoryBudgets}
            />
          )}
          {activeTab === 'monthly' && (
            <MonthlyView
              expenses={expenses}
              categoryBudgets={categoryBudgets}
            />
          )}
          {activeTab === 'analytics' && (
            <Analytics expenses={expenses} />
          )}
          {activeTab === 'budget' && (
            <BudgetSetup
              projectBudget={projectBudget}
              categoryBudgets={categoryBudgets}
              onSaveBudgets={saveBudget}
              expenses={expenses}
            />
          )}
          {/* NEW TABS CONTENT */}
          {activeTab === 'workers' && (
            <WorkerManagement 
              workers={workers}
              setWorkers={setWorkers}
              formatPHP={formatPHP}
            />
          )}
          {activeTab === 'payroll' && (
            <PayrollEntry 
              workers={workers}
              payrollEntries={payrollEntries}
              setPayrollEntries={setPayrollEntries}
              selectedDate={selectedDate}
              formatPHP={formatPHP}
              onPayrollToExpense={handlePayrollToExpense}
            />
          )}
        </div>

      </div>
    </div>
  );
}