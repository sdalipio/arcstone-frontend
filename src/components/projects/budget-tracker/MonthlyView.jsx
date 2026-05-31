import { useState } from 'react';
import {
  Calendar, BarChart2, CalendarDays, Lightbulb, AlertTriangle
} from 'lucide-react';
import Card from '../../common/Card';
import { EXPENSE_CATEGORIES, getCategoryByValue, MONTH_NAMES } from '../../../utils/constants';
import { formatPHP } from '../../../utils/formatters';

function StatMini({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <p style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>
        {label}
      </p>
      <p style={{ fontSize: '20px', fontWeight: 800, color: accent || 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.5px', lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{sub}</p>}
    </div>
  );
}

export default function MonthlyView({ expenses, categoryBudgets = {} }) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const year = parseInt(selectedMonth.split('-')[0]);
  const month = parseInt(selectedMonth.split('-')[1]);
  const daysInMonth = new Date(year, month, 0).getDate();

  const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth));
  const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const expenseCount = monthExpenses.length;
  const avgPerDay = totalExpenses / daysInMonth;

  const allTimeCategoryTotals = {};
  Object.keys(EXPENSE_CATEGORIES).forEach(cat => {
    allTimeCategoryTotals[cat] = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
  });

  const categoryTotals = {};
  Object.keys(EXPENSE_CATEGORIES).forEach(cat => {
    categoryTotals[cat] = monthExpenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
  });

  const topExpense = Object.entries(categoryTotals).reduce(
    (max, [cat, amount]) => amount > max.amount ? { category: cat, amount } : max,
    { category: null, amount: 0 }
  );

  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    const dayExpenses = expenses.filter(e => e.date === date);
    const total = dayExpenses.reduce((s, e) => s + e.amount, 0);
    return { day, date, total, hasData: dayExpenses.length > 0 };
  });

  const maxDay = Math.max(...dailyData.map(d => d.total), 1);

  const firstDow = new Date(year, month - 1, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;

  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });

  const warningCount = Object.keys(EXPENSE_CATEGORIES).filter(cat => {
    const budget = categoryBudgets[cat];
    if (!budget) return false;
    return allTimeCategoryTotals[cat] / budget >= 0.8;
  }).length;

  const TopCatIcon = topExpense.category ? getCategoryByValue(topExpense.category)?.icon : null;
  const topCatData = topExpense.category ? getCategoryByValue(topExpense.category) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Month selector + total */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
      }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
            Month
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color="var(--text-secondary)" />
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              style={{
                padding: '7px 12px', fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 600,
                background: 'var(--surface-base)', border: '1.5px solid var(--border-subtle)',
                borderRadius: '9px', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none',
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>
            Monthly Total
          </p>
          <p style={{
            fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, fontFamily: 'var(--font-sans)',
            color: totalExpenses > 0 ? '#F43F5E' : 'var(--text-tertiary)', letterSpacing: '-0.5px',
          }}>
            {formatPHP(totalExpenses)}
          </p>
        </div>
      </div>

      {/* Budget alert summary */}
      {warningCount > 0 && (
        <div style={{
          background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 'var(--radius-lg)',
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <AlertTriangle size={16} color="#D97706" strokeWidth={2} style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#92400E' }}>
            {warningCount} {warningCount === 1 ? 'category is' : 'categories are'} at or over 80% of their budget ceiling.
            Check the category breakdown below.
          </p>
        </div>
      )}

      {/* Mini stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
        <StatMini label="Transactions" value={expenseCount} sub="this month" accent="#4F8EF7" />
        <StatMini label="Avg / Day" value={formatPHP(avgPerDay)} sub={`over ${daysInMonth} days`} accent="#7C5CFC" />
        <StatMini label="Active Days" value={dailyData.filter(d => d.hasData).length} sub={`of ${daysInMonth} days`} accent="#22C989" />
      </div>

      {/* Category Breakdown with budget progress */}
      <Card title="Breakdown by Category" icon={BarChart2} iconColor="#4F8EF7" iconBg="#EBF2FF">
        {totalExpenses === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '24px 0', fontSize: '14px' }}>
            No expenses recorded for {monthLabel}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(categoryTotals)
              .filter(([, v]) => v > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, amount]) => {
                const c = getCategoryByValue(cat);
                const CatIcon = c.icon;
                const pctOfMonth = (amount / totalExpenses) * 100;

                const budget = categoryBudgets[cat];
                const allTimeSpent = allTimeCategoryTotals[cat];
                const budgetPct = budget ? (allTimeSpent / budget) * 100 : null;
                const isOver = budget && allTimeSpent > budget;
                const isWarn = budget && budgetPct >= 80 && !isOver;

                return (
                  <div key={cat} style={{
                    padding: '12px',
                    background: isOver ? '#FFF9F9' : isWarn ? '#FFFEF0' : 'transparent',
                    border: `1px solid ${isOver ? '#FCA5A5' : isWarn ? '#FDE68A' : 'transparent'}`,
                    borderRadius: '10px',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '26px', height: '26px', borderRadius: '7px',
                          background: c.bg, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: `1px solid ${c.color}22`,
                        }}>
                          <CatIcon size={13} color={c.color} strokeWidth={2} />
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</span>
                        {(isOver || isWarn) && (
                          <AlertTriangle size={12} color={isOver ? '#F43F5E' : '#D97706'} strokeWidth={2} />
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                          {formatPHP(amount)}
                        </span>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>
                          {pctOfMonth.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div style={{ height: '6px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden', marginBottom: budget ? '6px' : '0' }}>
                      <div style={{
                        height: '100%', borderRadius: '99px',
                        background: c.color, width: `${pctOfMonth}%`, opacity: 0.85,
                        transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                    </div>

                    {budget && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', color: isOver ? '#BE123C' : isWarn ? '#92400E' : 'var(--text-tertiary)', fontWeight: 600 }}>
                            {isOver
                              ? 'Over budget ceiling'
                              : `Budget: ${formatPHP(allTimeSpent)} of ${formatPHP(budget)}`}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: isOver ? '#F43F5E' : isWarn ? '#D97706' : '#22C989' }}>
                            {Math.min(budgetPct, 100).toFixed(0)}%
                          </span>
                        </div>
                        <div style={{ height: '5px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(budgetPct, 100)}%`,
                            background: isOver
                              ? 'linear-gradient(90deg, #F43F5E, #FB7185)'
                              : isWarn
                              ? 'linear-gradient(90deg, #F59E0B, #FCD34D)'
                              : `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                            borderRadius: '99px',
                            transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </Card>

      {/* Heatmap Calendar */}
      <Card title="Daily Heatmap" icon={CalendarDays} iconColor="#7C5CFC" iconBg="#EEE9FF">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', padding: '2px 0' }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {Array.from({ length: offset }).map((_, i) => <div key={`b-${i}`} />)}
          {dailyData.map(day => {
            const intensity = day.total > 0 ? day.total / maxDay : 0;
            const alpha = day.total > 0 ? Math.max(0.15, intensity) : 0;
            return (
              <div
                key={day.day}
                title={day.hasData ? `${day.day}: ${formatPHP(day.total)}` : `${day.day}: no expenses`}
                style={{
                  aspectRatio: '1', borderRadius: '6px',
                  background: day.total > 0 ? `rgba(244,63,94,${alpha})` : 'var(--surface-subtle)',
                  border: `1px solid ${day.total > 0 ? `rgba(244,63,94,${alpha + 0.1})` : 'var(--border-subtle)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '2px',
                }}
              >
                <span style={{ fontSize: 'clamp(9px, 1.5vw, 12px)', fontWeight: 700, color: day.total > 0 ? (intensity > 0.5 ? '#fff' : '#C0392B') : 'var(--text-tertiary)' }}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Less</span>
          {[0.1, 0.3, 0.55, 0.75, 1].map(a => (
            <div key={a} style={{ width: '14px', height: '14px', borderRadius: '3px', background: `rgba(244,63,94,${a})` }} />
          ))}
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>More</span>
        </div>
      </Card>

      {/* Insight callout */}
      {topExpense.amount > 0 && topCatData && (
        <div style={{
          background: '#FFFBEB', border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-lg)', padding: '16px 20px',
          display: 'flex', gap: '12px', alignItems: 'flex-start',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: '#FEF3C7', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lightbulb size={18} color="#D97706" strokeWidth={2} />
          </div>
          <div>
            <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#92400E', marginBottom: '6px' }}>
              Top expense this month
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {TopCatIcon && (
                <div style={{
                  width: '24px', height: '24px', borderRadius: '6px',
                  background: topCatData.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <TopCatIcon size={13} color={topCatData.color} strokeWidth={2} />
                </div>
              )}
              <p style={{ fontSize: '13px', color: '#B45309', lineHeight: 1.5 }}>
                {topCatData.label} — {formatPHP(topExpense.amount)}, which is{' '}
                <strong>{((topExpense.amount / totalExpenses) * 100).toFixed(1)}%</strong> of your total spending.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}