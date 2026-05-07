import { useState } from 'react';
import { 
  Calendar, Plus, X, Save, Clock, User, DollarSign, 
  FileText, CheckCircle, AlertCircle, Trash2, Users,
  Receipt
} from 'lucide-react';
import Card from '../../../common/Card';
import Button from '../../../common/Button';

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

export default function PayrollEntry({ 
  workers, 
  payrollEntries, 
  setPayrollEntries, 
  selectedDate, 
  formatPHP,
  onPayrollToExpense 
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    workerId: '',
    daysWorked: '1',
    notes: '',
    date: selectedDate,
  });

  const todayPayroll = payrollEntries.filter(p => p.date === selectedDate);
  const todayTotal = todayPayroll.reduce((sum, p) => sum + p.totalAmount, 0);

  const selectedWorker = workers.find(w => w.id === parseInt(formData.workerId));

  const calculateTotal = () => {
    if (!selectedWorker) return 0;
    return selectedWorker.dailyRate * (parseFloat(formData.daysWorked) || 0);
  };

  const addPayroll = (e) => {
    e.preventDefault();
    if (!formData.workerId || !formData.daysWorked) return;

    const worker = workers.find(w => w.id === parseInt(formData.workerId));
    if (!worker) return;

    const totalAmount = worker.dailyRate * parseFloat(formData.daysWorked);

    const newPayroll = {
      id: Date.now(),
      workerId: worker.id,
      workerName: worker.name,
      date: selectedDate,
      daysWorked: parseFloat(formData.daysWorked),
      dailyRate: worker.dailyRate,
      totalAmount: totalAmount,
      notes: formData.notes,
      status: 'pending',
    };

    setPayrollEntries([...payrollEntries, newPayroll]);
    setFormData({ workerId: '', daysWorked: '1', notes: '', date: selectedDate });
    setShowForm(false);
  };

  const deletePayroll = (id) => {
    if (window.confirm('Remove this payroll entry?')) {
      setPayrollEntries(payrollEntries.filter(p => p.id !== id));
    }
  };

  const markAsPaid = (payrollId) => {
    const payroll = payrollEntries.find(p => p.id === payrollId);
    if (payroll && payroll.status === 'pending') {
      // Update status
      setPayrollEntries(payrollEntries.map(p => 
        p.id === payrollId ? { ...p, status: 'paid' } : p
      ));
      
      // Call parent to create expense entry
      if (onPayrollToExpense) {
        onPayrollToExpense(payroll);
      }
    }
  };

  const pendingPayroll = payrollEntries.filter(p => p.status === 'pending');
  const pendingTotal = pendingPayroll.reduce((sum, p) => sum + p.totalAmount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Payroll Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
      }}>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Today's Payroll</p>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#F43F5E' }}>{formatPHP(todayTotal)}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{todayPayroll.length} workers</p>
        </div>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Pending Payroll</p>
          <p style={{ fontSize: '24px', fontWeight: 800, color: '#F59E0B' }}>{formatPHP(pendingTotal)}</p>
          <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>{pendingPayroll.length} unpaid entries</p>
        </div>
      </div>

      {/* Add Payroll Button */}
      {workers.filter(w => w.isActive).length > 0 ? (
        <Button onClick={() => setShowForm(true)} variant="primary" icon={Plus} fullWidth>
          Record Payroll
        </Button>
      ) : (
        <div style={{
          padding: '16px', textAlign: 'center',
          background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px',
        }}>
          <AlertCircle size={20} color="#F59E0B" strokeWidth={2} />
          <p style={{ fontSize: '13px', color: '#92400E', marginTop: '8px' }}>
            No active workers. Add workers in the Workers tab first.
          </p>
        </div>
      )}

      {/* Today's Payroll List */}
      <Card title={`Payroll for ${new Date(selectedDate).toLocaleDateString('en-PH')}`} icon={Clock} iconColor="#4F8EF7" iconBg="#EBF2FF">
        {todayPayroll.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 20px' }}>
            <Users size={32} color="var(--text-tertiary)" strokeWidth={1.5} />
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              No payroll recorded for this day
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todayPayroll.map(entry => (
              <div
                key={entry.id}
                style={{
                  padding: '14px',
                  background: 'var(--surface-base)',
                  border: `1px solid ${entry.status === 'paid' ? '#86EFAC' : 'var(--border-subtle)'}`,
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{entry.workerName}</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                        {entry.daysWorked} day{entry.daysWorked !== 1 ? 's' : ''} × {formatPHP(entry.dailyRate)}/day
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#F43F5E' }}>
                        = {formatPHP(entry.totalAmount)}
                      </span>
                    </div>
                    {entry.notes && (
                      <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>
                        <FileText size={10} style={{ display: 'inline', marginRight: '4px' }} />
                        {entry.notes}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {entry.status === 'pending' ? (
                      <button
                        onClick={() => markAsPaid(entry.id)}
                        style={{
                          padding: '6px 12px', borderRadius: '8px',
                          background: '#22C989', border: 'none',
                          color: 'white', fontSize: '11px', fontWeight: 600,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                        }}
                      >
                        <CheckCircle size={12} /> Mark Paid
                      </button>
                    ) : (
                      <span style={{
                        padding: '6px 12px', borderRadius: '8px',
                        background: '#D1FAE5', color: '#166534',
                        fontSize: '11px', fontWeight: 600,
                        display: 'flex', alignItems: 'center', gap: '4px',
                      }}>
                        <Receipt size={12} /> Paid
                      </span>
                    )}
                    <button
                      onClick={() => deletePayroll(entry.id)}
                      style={{
                        padding: '6px', borderRadius: '8px',
                        background: 'transparent', border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                      }}
                    >
                      <Trash2 size={14} color="#F43F5E" />
                    </button>
                  </div>
                </div>
                {entry.status === 'paid' && (
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '11px', color: '#166534' }}>
                      ✓ Added to expenses on {entry.paidDate || entry.date}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Add Payroll Form Modal */}
      {showForm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            display: 'flex', alignItems: 'flex-end',
            background: 'rgba(26,29,46,0.45)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div style={{
            width: '100%',
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
            boxShadow: 'var(--shadow-xl)',
            padding: '24px 20px 32px',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <div style={{ width: '40px', height: '4px', background: 'var(--border-medium)', borderRadius: '99px', margin: '0 auto 20px' }} />

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Record Payroll
            </h3>

            <form onSubmit={addPayroll} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField label="Select Worker" icon={User} required>
                <select
                  value={formData.workerId}
                  onChange={(e) => setFormData({ ...formData, workerId: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  required
                >
                  <option value="">Select worker...</option>
                  {workers.filter(w => w.isActive).map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} - {formatPHP(worker.dailyRate)}/day
                    </option>
                  ))}
                </select>
              </FormField>

              {selectedWorker && (
                <div style={{
                  padding: '12px', background: '#EBF2FF', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <DollarSign size={16} color="#4F8EF7" />
                  <span style={{ fontSize: '13px', color: '#4F8EF7' }}>
                    Daily rate: {formatPHP(selectedWorker.dailyRate)}
                  </span>
                </div>
              )}

              <FormField label="Days Worked" icon={Clock} required>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.daysWorked}
                  onChange={(e) => setFormData({ ...formData, daysWorked: e.target.value })}
                  style={inputStyle}
                  placeholder="e.g., 1 (full day), 0.5 (half day)"
                  required
                />
              </FormField>

              {selectedWorker && parseFloat(formData.daysWorked) > 0 && (
                <div style={{
                  padding: '12px', background: '#E3FAF1', borderRadius: '10px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: '#166534' }}>Total Amount:</span>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#22C989' }}>
                    {formatPHP(calculateTotal())}
                  </span>
                </div>
              )}

              <FormField label="Notes (Optional)" icon={FileText}>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }}
                  placeholder="e.g., Overtime, Half day, etc."
                />
              </FormField>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <Button type="submit" variant="primary" icon={Save} size="lg" fullWidth>
                  Record Payroll
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)} size="lg" fullWidth>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}