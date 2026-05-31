import { useState } from 'react';
import {
  TrendingUp, Award, CalendarDays, BarChart2, PieChart
} from 'lucide-react';
import Card from '../../common/Card';
import { EXPENSE_CATEGORIES, getCategoryByValue, MONTH_NAMES } from '../../../utils/constants';
import { formatPHP } from '../../../utils/formatters';

function CategoryIcon({ cat, size = 15 }) {
  const Icon = cat.icon;
  return (
    <div style={{
      width: size + 10, height: size + 10,
      borderRadius: '7px',
      background: cat.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon size={size} color={cat.color} strokeWidth={2} />
    </div>
  );
}

function SummaryCard({ label, value, sub, icon: Icon, iconBg, iconColor }) {
  return (
    <div style={{
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '9px',
        background: iconBg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={17} color={iconColor} strokeWidth={2} />
      </div>
      <div>
        <p style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>
          {label}
        </p>
        <p style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', letterSpacing: '-0.4px', lineHeight: 1 }}>
          {value}
        </p>
        {sub && <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginTop: '3px' }}>{sub}</p>}
      </div>
    </div>
  );
}

export default function Analytics({ expenses }) {
  const availableYears = [...new Set(expenses.map(e => e.date.split('-')[0]))].sort().reverse();
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || new Date().getFullYear().toString());

  const yearlyExpenses = expenses.filter(e => e.date.startsWith(selectedYear.toString()));
  const totalYearly = yearlyExpenses.reduce((s, e) => s + e.amount, 0);

  const monthlyData = MONTH_NAMES.map((name, i) => {
    const pad = String(i + 1).padStart(2, '0');
    const items = yearlyExpenses.filter(e => e.date.split('-')[1] === pad);
    return { name, total: items.reduce((s, e) => s + e.amount, 0), count: items.length };
  });

  const maxMonthly = Math.max(...monthlyData.map(m => m.total), 1);

  const categoryTotals = {};
  Object.keys(EXPENSE_CATEGORIES).forEach(cat => {
    categoryTotals[cat] = yearlyExpenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
  });

  const topExpenses = [...yearlyExpenses].sort((a, b) => b.amount - a.amount).slice(0, 10);

  const highestMonth = monthlyData.reduce((m, c) => c.total > m.total ? c : m, { name: '—', total: 0 });
  const activeMonths = monthlyData.filter(m => m.total > 0).length;
  const topCatEntry = Object.entries(categoryTotals).reduce((m, [k, v]) => v > m[1] ? [k, v] : m, ['', 0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Year selector */}
      <div style={{
        background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)', padding: '14px 20px', boxShadow: 'var(--shadow-sm)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '5px' }}>
            Year
          </p>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            style={{
              padding: '7px 12px', fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 600,
              background: 'var(--surface-base)', border: '1.5px solid var(--border-subtle)',
              borderRadius: '9px', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none',
            }}
          >
            {availableYears.length > 0
              ? availableYears.map(y => <option key={y} value={y}>{y}</option>)
              : <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>}
          </select>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>
            {selectedYear} Total
          </p>
          <p style={{
            fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, fontFamily: 'var(--font-sans)',
            color: totalYearly > 0 ? '#F43F5E' : 'var(--text-tertiary)', letterSpacing: '-0.5px',
          }}>
            {formatPHP(totalYearly)}
          </p>
        </div>
      </div>

      {/* Summary grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <SummaryCard label="Transactions" value={yearlyExpenses.length} sub={`in ${selectedYear}`} icon={BarChart2} iconBg="#EBF2FF" iconColor="#4F8EF7" />
        <SummaryCard label="Avg / Month" value={formatPHP(totalYearly / 12)} sub="per month" icon={TrendingUp} iconBg="#EEE9FF" iconColor="#7C5CFC" />
        <SummaryCard label="Active Months" value={`${activeMonths} / 12`} sub="months with data" icon={CalendarDays} iconBg="#E3FAF1" iconColor="#22C989" />
        <SummaryCard label="Peak Month" value={highestMonth.name} sub={formatPHP(highestMonth.total)} icon={Award} iconBg="#FFF1F2" iconColor="#F43F5E" />
      </div>

      {/* Monthly bar chart */}
      <Card title="Monthly Expenses" icon={TrendingUp} iconColor="#4F8EF7" iconBg="#EBF2FF">
        {totalYearly === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '24px 0', fontSize: '14px' }}>
            No data for {selectedYear}
          </p>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100px', marginBottom: '6px' }}>
              {monthlyData.map((m) => {
                const pct = m.total > 0 ? (m.total / maxMonthly) * 100 : 0;
                const isMax = m.total === highestMonth.total && m.total > 0;
                return (
                  <div key={m.name} title={`${m.name}: ${formatPHP(m.total)}`}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <div style={{
                      width: '100%', height: `${Math.max(pct, m.total > 0 ? 4 : 0)}%`,
                      background: isMax
                        ? 'linear-gradient(180deg, #F43F5E, #FB7185)'
                        : m.total > 0 ? 'linear-gradient(180deg, #4F8EF7, #818CF8)' : 'var(--surface-subtle)',
                      borderRadius: '4px 4px 2px 2px',
                      transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)',
                      border: `1px solid ${isMax ? '#FCA5A5' : m.total > 0 ? '#C6DBFD' : 'var(--border-subtle)'}`,
                    }} />
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {monthlyData.map(m => (
                <div key={m.name} style={{ flex: 1, textAlign: 'center', fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                  {m.name}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px', flexWrap: 'wrap' }}>
              {[
                { color: '#4F8EF7', label: 'Regular month' },
                { color: '#F43F5E', label: 'Peak month' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
                  <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>{l.label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {monthlyData.filter(m => m.total > 0).map(m => {
                const pct = (m.total / maxMonthly) * 100;
                return (
                  <div key={m.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                          {formatPHP(m.total)}
                        </span>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>
                          {m.count} {m.count === 1 ? 'entry' : 'entries'}
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '5px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: '#4F8EF7', borderRadius: '99px', opacity: 0.7 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Category distribution */}
      <Card title="Category Distribution" icon={PieChart} iconColor="#7C5CFC" iconBg="#EEE9FF">
        {Object.values(categoryTotals).every(v => v === 0) ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '24px 0', fontSize: '14px' }}>
            No data for {selectedYear}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(categoryTotals)
              .filter(([, v]) => v > 0)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, amount]) => {
                const c = getCategoryByValue(cat);
                const pct = (amount / totalYearly) * 100;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CategoryIcon cat={c} size={14} />
                        <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{c.label}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                          {formatPHP(amount)}
                        </span>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '8px', background: 'var(--surface-subtle)', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${pct}%`, borderRadius: '99px',
                        background: c.color, opacity: 0.82,
                        transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>

      {/* Top 10 expenses */}
      <Card title="Top 10 Largest Expenses" icon={Award} iconColor="#F43F5E" iconBg="#FFF1F2">
        {topExpenses.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', padding: '24px 0', fontSize: '14px' }}>
            No expenses recorded
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {topExpenses.map((exp, idx) => {
              const cat = getCategoryByValue(exp.category);
              const CatIcon = cat?.icon;
              return (
                <div
                  key={exp.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 12px',
                    background: idx === 0 ? '#FFF1F2' : 'var(--surface-base)',
                    border: `1px solid ${idx === 0 ? '#FEE2E2' : 'var(--border-subtle)'}`,
                    borderRadius: '10px',
                  }}
                >
                  <span style={{
                    fontSize: '11px', fontWeight: 800,
                    color: idx < 3 ? '#F43F5E' : 'var(--text-tertiary)',
                    width: '18px', textAlign: 'right', flexShrink: 0,
                    fontFamily: 'var(--font-sans)',
                  }}>
                    #{idx + 1}
                  </span>
                  {cat && CatIcon ? (
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: cat.bg, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${cat.color}22`,
                    }}>
                      <CatIcon size={15} color={cat.color} strokeWidth={2} />
                    </div>
                  ) : (
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: 'var(--surface-subtle)', flexShrink: 0,
                    }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {exp.description}
                    </p>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>
                      {cat?.label} · {exp.date}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '14px', fontWeight: 800, color: '#F43F5E',
                    fontFamily: 'var(--font-sans)', flexShrink: 0, letterSpacing: '-0.3px',
                  }}>
                    {formatPHP(exp.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Yearly insight */}
      {totalYearly > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #EBF2FF, #EEE9FF)',
          border: '1px solid #C6DBFD',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <TrendingUp size={16} color="#4F8EF7" strokeWidth={2.5} />
            <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#1E40AF' }}>
              {selectedYear} Summary
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
            {[
              { label: 'Highest Month', value: highestMonth.name, sub: formatPHP(highestMonth.total) },
              { label: 'Avg / Month', value: formatPHP(totalYearly / 12), sub: 'monthly average' },
              { label: 'Top Category', value: getCategoryByValue(topCatEntry[0])?.label || '—', sub: formatPHP(topCatEntry[1]) },
              { label: 'Active Months', value: `${activeMonths} / 12`, sub: 'with expenses' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.6)', borderRadius: '10px',
                border: '1px solid rgba(79,142,247,0.2)', padding: '10px 12px',
              }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#4F8EF7', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: '3px' }}>
                  {s.label}
                </p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#1E3A8A', fontFamily: 'var(--font-sans)', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: '11px', color: '#3B82F6', marginTop: '2px' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}