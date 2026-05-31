import { useState } from 'react';
import {
  Calendar, CalendarDays, Plus, X, Trash2, Save, AlertCircle,
  DollarSign, Tag, FileText, Loader2
} from 'lucide-react';
import Card from '../../common/Card';
import Button from '../../common/Button';
import { EXPENSE_CATEGORIES, getCategoryByValue } from '../../../utils/constants';
import { formatPHP, formatDate } from '../../../utils/formatters';

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
};

function FormField({ label, icon: Icon, children, required }) {
  return (
    <div>
      <label style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)',
        marginBottom: '6px',
      }}>
        {Icon && <Icon size={13} strokeWidth={2} />}
        {label}
        {required && <span style={{ color: '#F43F5E', marginLeft: '1px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function DailyView({ expenses, onAddExpense, onDeleteExpense, categoryBudgets }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: 'materials', description: '', amount: '', date: selectedDate });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const dailyExpenses = expenses.filter(e => e.date === selectedDate);
  const dailyTotal = dailyExpenses.reduce((sum, e) => sum + e.amount, 0);

  const openForm = () => {
    setNewExpense({ category: 'materials', description: '', amount: '', date: selectedDate });
    setShowForm(true);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.description) return;
    
    setSubmitting(true);
    try {
      await onAddExpense({
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: selectedDate,
      });
      setShowForm(false);
      setNewExpense({ category: 'materials', description: '', amount: '', date: selectedDate });
    } catch (err) {
      console.error('Failed to add expense:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteExpense = async (id) => {
    await onDeleteExpense(id);
    setDeleteConfirm(null);
  };

  const formattedDate = formatDate(selectedDate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Date + Total Bar */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
      }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
            Select Date
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color="var(--text-secondary)" strokeWidth={2} />
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{
                padding: '7px 12px', fontSize: '14px',
                fontFamily: 'var(--font-body)', fontWeight: 600,
                background: 'var(--surface-base)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: '9px',
                color: 'var(--text-primary)',
                cursor: 'pointer', outline: 'none',
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '3px' }}>
            Daily Total
          </p>
          <p style={{
            fontSize: 'clamp(20px, 4vw, 26px)',
            fontWeight: 800,
            fontFamily: 'var(--font-sans)',
            color: dailyTotal > 0 ? '#F43F5E' : 'var(--text-tertiary)',
            letterSpacing: '-0.5px',
          }}>
            {formatPHP(dailyTotal)}
          </p>
        </div>
      </div>

      {/* Add Expense Button */}
      <Button onClick={openForm} variant="danger" size="lg" icon={Plus} fullWidth>
        Add New Expense
      </Button>

      {/* Expense Form Modal */}
      {showForm && (
        <div
          className="animate-fadeInUp"
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            display: 'flex', alignItems: 'flex-end',
            background: 'rgba(26,29,46,0.45)',
            backdropFilter: 'blur(4px)',
            padding: '0',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="animate-fadeInUp"
            style={{
              width: '100%',
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
              boxShadow: 'var(--shadow-xl)',
              padding: '24px 20px 32px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: '40px', height: '4px', background: 'var(--border-medium)', borderRadius: '99px', margin: '0 auto 20px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
                  Add Expense
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{formattedDate}</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  width: '34px', height: '34px', borderRadius: '9px',
                  background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={15} color="var(--text-secondary)" />
              </button>
            </div>

            <form onSubmit={addExpense} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <FormField label="Category" icon={Tag} required>
                <select
                  value={newExpense.category}
                  onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  required
                >
                  {EXPENSE_CATEGORIES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </FormField>

              {(() => {
                const cat = getCategoryByValue(newExpense.category);
                const CatIcon = cat.icon;
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: cat.bg, borderRadius: '10px', border: `1px solid ${cat.color}22` }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CatIcon size={15} color={cat.color} strokeWidth={2} />
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: cat.color }}>{cat.label}</span>
                  </div>
                );
              })()}

              <FormField label="Description" icon={FileText} required>
                <input
                  type="text"
                  placeholder="e.g., Paid Mang Juan, Bought 50 bags of cement"
                  value={newExpense.description}
                  onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                  style={inputStyle}
                  required
                />
              </FormField>

              <FormField label="Amount (PHP)" icon={DollarSign} required>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)',
                  }}>₱</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: '30px' }}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </FormField>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                <Button type="submit" variant="primary" icon={submitting ? Loader2 : Save} size="lg" fullWidth disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Expense'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)} size="lg" fullWidth>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(26,29,46,0.45)', backdropFilter: 'blur(4px)',
            padding: '20px',
          }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="animate-scaleIn"
            style={{
              background: 'var(--surface-card)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              padding: '24px',
              maxWidth: '320px',
              width: '100%',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Trash2 size={22} color="#F43F5E" strokeWidth={2} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Delete Expense?
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                This action cannot be undone.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={() => deleteExpense(deleteConfirm)} variant="danger" fullWidth>Delete</Button>
              <Button onClick={() => setDeleteConfirm(null)} variant="secondary" fullWidth>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      {/* Expense List */}
      <Card
        title={formattedDate}
        icon={CalendarDays}
        iconColor="#4F8EF7"
        iconBg="#EBF2FF"
        action={dailyExpenses.length > 0 && (
          <span style={{
            fontSize: '12px', fontWeight: 600,
            color: '#4F8EF7', background: '#EBF2FF',
            padding: '3px 10px', borderRadius: '99px',
          }}>
            {dailyExpenses.length} {dailyExpenses.length === 1 ? 'entry' : 'entries'}
          </span>
        )}
      >
        {dailyExpenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'var(--surface-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <AlertCircle size={26} color="var(--text-tertiary)" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              No expenses yet
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
              Start tracking your spending for this day
            </p>
            <Button onClick={openForm} variant="outline" icon={Plus} size="sm">
              Add First Expense
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dailyExpenses.map((exp, idx) => {
              const cat = getCategoryByValue(exp.category);
              const CatIcon = cat.icon;
              return (
                <div
                  key={exp.id}
                  className="animate-slideIn"
                  style={{
                    animationDelay: `${idx * 40}ms`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    background: 'var(--surface-base)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: cat.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${cat.color}22`,
                  }}>
                    <CatIcon size={18} color={cat.color} strokeWidth={2} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '13.5px', fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {exp.description}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {cat.label}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '15px', fontWeight: 800,
                      fontFamily: 'var(--font-sans)',
                      color: '#F43F5E',
                      letterSpacing: '-0.3px',
                    }}>
                      {formatPHP(exp.amount)}
                    </span>
                    <button
                      onClick={() => setDeleteConfirm(exp.id)}
                      style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        background: 'transparent',
                        border: '1px solid transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: 0.5,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#FFF1F2';
                        e.currentTarget.style.borderColor = '#FEE2E2';
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.opacity = '0.5';
                      }}
                    >
                      <Trash2 size={14} color="var(--text-tertiary)" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })}

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 14px',
              marginTop: '4px',
              background: 'linear-gradient(135deg, #EBF2FF, #EEE9FF)',
              borderRadius: '12px',
              border: '1px solid #C6DBFD',
            }}>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#4F8EF7' }}>
                Total for the day
              </span>
              <span style={{
                fontSize: '17px', fontWeight: 800,
                fontFamily: 'var(--font-sans)',
                color: '#4F8EF7', letterSpacing: '-0.3px',
              }}>
                {formatPHP(dailyTotal)}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}