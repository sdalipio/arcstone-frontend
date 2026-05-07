import { useState } from 'react';
import {
  Target, Save, DollarSign, AlertTriangle, CheckCircle, TrendingUp,
  HardHat, UtensilsCrossed, Hammer, Construction, Zap, Truck, ClipboardList, MoreHorizontal,
  ShieldAlert, Info,
} from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';

const EXPENSE_CATEGORIES = [
  { value: 'workers',       label: 'Worker Salaries',  icon: HardHat,         color: '#4F8EF7', bg: '#EBF2FF' },
  { value: 'food',          label: 'Food & Supplies',  icon: UtensilsCrossed, color: '#22C989', bg: '#E3FAF1' },
  { value: 'materials',     label: 'Raw Materials',    icon: Hammer,          color: '#F59E0B', bg: '#FEF3C7' },
  { value: 'equipment',     label: 'Equipment Rental', icon: Construction,    color: '#7C5CFC', bg: '#EEE9FF' },
  { value: 'utilities',     label: 'Utilities',        icon: Zap,             color: '#06B6D4', bg: '#ECFEFF' },
  { value: 'transport',     label: 'Transport',        icon: Truck,           color: '#EC4899', bg: '#FDF2F8' },
  { value: 'permits',       label: 'Permits & Fees',   icon: ClipboardList,   color: '#6B7280', bg: '#F3F4F6' },
  { value: 'miscellaneous', label: 'Miscellaneous',    icon: MoreHorizontal,  color: '#9CA3AF', bg: '#F9FAFB' },
];

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  fontFamily: 'var(--font-body)',
  background: 'var(--surface-base)',
  border: '1.5px solid var(--border-subtle)',
  borderRadius: '10px',
  color: 'var(--text-primary)',
  outline: 'none',
  boxSizing: 'border-box',
};

function BudgetStatusBadge({ spent, budget }) {
  if (!budget || budget === 0) return null;
  const pct = (spent / budget) * 100;
  const isOver = spent > budget;
  const isWarn = pct >= 80 && !isOver;
  if (isOver) return (
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#F43F5E', background: '#FFF1F2', padding: '2px 8px', borderRadius: '99px', border: '1px solid #FEE2E2' }}>
      Over budget
    </span>
  );
  if (isWarn) return (
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', background: '#FFFBEB', padding: '2px 8px', borderRadius: '99px', border: '1px solid #FDE68A' }}>
      {pct.toFixed(0)}% used
    </span>
  );
  return (
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '2px 8px', borderRadius: '99px', border: '1px solid #BBF7D0' }}>
      {pct.toFixed(0)}% used
    </span>
  );
}

export default function BudgetSetup({
  projectBudget,
  setProjectBudget,
  categoryBudgets,
  setCategoryBudgets,
  expenses,
  formatPHP,
}) {
  const [localProjectBudget, setLocalProjectBudget] = useState(projectBudget > 0 ? projectBudget.toString() : '');
  const [localCatBudgets, setLocalCatBudgets] = useState(() => {
    const init = {};
    EXPENSE_CATEGORIES.forEach(c => {
      init[c.value] = categoryBudgets[c.value] ? categoryBudgets[c.value].toString() : '';
    });
    return init;
  });
  const [saved, setSaved] = useState(false);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const getCategorySpent = (catValue) =>
    expenses.filter(e => e.category === catValue).reduce((s, e) => s + e.amount, 0);

  const totalAllocated = Object.values(localCatBudgets)
    .reduce((sum, v) => sum + (parseFloat(v) || 0), 0);

  const handleSave = () => {
    const pb = parseFloat(localProjectBudget) || 0;
    setProjectBudget(pb);
    const cb = {};
    EXPENSE_CATEGORIES.forEach(c => {
      const v = parseFloat(localCatBudgets[c.value]) || 0;
      if (v > 0) cb[c.value] = v;
    });
    setCategoryBudgets(cb);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const projectBudgetVal = parseFloat(localProjectBudget) || 0;
  const allocationGap = projectBudgetVal > 0 ? projectBudgetVal - totalAllocated : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Info callout */}
      <div style={{
        background: '#EBF2FF',
        border: '1px solid #BFDBFE',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 18px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}>
        <Info size={16} color="#4F8EF7" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }} />
        <p style={{ fontSize: '13px', color: '#1E40AF', lineHeight: 1.6 }}>
          Set an overall project budget and per-category ceilings. You'll see warnings at <strong>80%</strong> and alerts when budgets are exceeded.
        </p>
      </div>

      {/* Overall Project Budget */}
      <Card title="Overall Project Budget" icon={Target} iconColor="#4F8EF7" iconBg="#EBF2FF">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)',
              marginBottom: '8px',
            }}>
              Total Project Budget
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)',
              }}>₱</span>
              <input
                type="number"
                placeholder="e.g., 800000"
                value={localProjectBudget}
                onChange={e => setLocalProjectBudget(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '30px' }}
                min="0"
                step="1000"
              />
            </div>
          </div>

          {/* Live preview of overall budget */}
          {projectBudgetVal > 0 && (
            <div style={{
              background: 'var(--surface-base)',
              borderRadius: '10px',
              padding: '14px',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Current spend vs. new budget</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    {formatPHP(totalExpenses)} spent of {formatPHP(projectBudgetVal)}
                  </p>
                </div>
                <BudgetStatusBadge spent={totalExpenses} budget={projectBudgetVal} />
              </div>
              <div style={{ height: '8px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                {(() => {
                  const pct = Math.min((totalExpenses / projectBudgetVal) * 100, 100);
                  const isOver = totalExpenses > projectBudgetVal;
                  const isWarn = pct >= 80 && !isOver;
                  return (
                    <div style={{
                      height: '100%', width: `${pct}%`, borderRadius: '99px',
                      background: isOver
                        ? 'linear-gradient(90deg, #F43F5E, #FB7185)'
                        : isWarn
                        ? 'linear-gradient(90deg, #F59E0B, #FCD34D)'
                        : 'linear-gradient(90deg, #22C989, #4ADE80)',
                      transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  );
                })()}
              </div>
            </div>
          )}

          {/* Allocation summary */}
          {projectBudgetVal > 0 && totalAllocated > 0 && (
            <div style={{
              padding: '12px 14px',
              borderRadius: '10px',
              background: allocationGap < 0 ? '#FFF1F2' : allocationGap === 0 ? '#F0FDF4' : '#FFFBEB',
              border: `1px solid ${allocationGap < 0 ? '#FEE2E2' : allocationGap === 0 ? '#BBF7D0' : '#FDE68A'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {allocationGap < 0
                ? <AlertTriangle size={14} color="#F43F5E" strokeWidth={2} />
                : allocationGap === 0
                ? <CheckCircle size={14} color="#16A34A" strokeWidth={2} />
                : <TrendingUp size={14} color="#D97706" strokeWidth={2} />}
              <p style={{ fontSize: '12.5px', color: allocationGap < 0 ? '#BE123C' : allocationGap === 0 ? '#15803D' : '#92400E', fontWeight: 600 }}>
                {allocationGap < 0
                  ? `Category budgets exceed project budget by ${formatPHP(Math.abs(allocationGap))}`
                  : allocationGap === 0
                  ? 'Category budgets perfectly match project budget'
                  : `${formatPHP(allocationGap)} unallocated across categories`}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Category Budgets */}
      <Card title="Category Budget Ceilings" icon={ShieldAlert} iconColor="#7C5CFC" iconBg="#EEE9FF">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {EXPENSE_CATEGORIES.map(cat => {
            const CatIcon = cat.icon;
            const spent = getCategorySpent(cat.value);
            const budgetVal = parseFloat(localCatBudgets[cat.value]) || 0;
            const pct = budgetVal > 0 ? Math.min((spent / budgetVal) * 100, 100) : 0;
            const isOver = budgetVal > 0 && spent > budgetVal;
            const isWarn = budgetVal > 0 && pct >= 80 && !isOver;

            return (
              <div key={cat.value} style={{
                padding: '14px',
                background: 'var(--surface-base)',
                border: `1.5px solid ${isOver ? '#FCA5A5' : isWarn ? '#FDE68A' : 'var(--border-subtle)'}`,
                borderRadius: '12px',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: budgetVal > 0 ? '10px' : '0' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: cat.bg, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${cat.color}22`,
                  }}>
                    <CatIcon size={16} color={cat.color} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <p style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {cat.label}
                      </p>
                      <BudgetStatusBadge spent={spent} budget={budgetVal} />
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                      Spent: {formatPHP(spent)}
                      {budgetVal > 0 && ` of ${formatPHP(budgetVal)}`}
                    </p>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '13px', fontWeight: 700, color: 'var(--text-tertiary)',
                  }}>₱</span>
                  <input
                    type="number"
                    placeholder="No ceiling set"
                    value={localCatBudgets[cat.value]}
                    onChange={e => setLocalCatBudgets({ ...localCatBudgets, [cat.value]: e.target.value })}
                    style={{
                      ...inputStyle,
                      paddingLeft: '26px',
                      fontSize: '13.5px',
                      borderColor: isOver ? '#FCA5A5' : isWarn ? '#FDE68A' : 'var(--border-subtle)',
                    }}
                    min="0"
                    step="1000"
                  />
                </div>

                {/* Category mini progress bar */}
                {budgetVal > 0 && (
                  <div style={{ height: '5px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden', marginTop: '8px' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`, borderRadius: '99px',
                      background: isOver
                        ? 'linear-gradient(90deg, #F43F5E, #FB7185)'
                        : isWarn
                        ? 'linear-gradient(90deg, #F59E0B, #FCD34D)'
                        : cat.color,
                      opacity: 0.85,
                      transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Save button */}
      <Button
        onClick={handleSave}
        variant={saved ? 'success' : 'primary'}
        size="lg"
        icon={saved ? CheckCircle : Save}
        fullWidth
      >
        {saved ? 'Budgets Saved!' : 'Save All Budgets'}
      </Button>

    </div>
  );
}