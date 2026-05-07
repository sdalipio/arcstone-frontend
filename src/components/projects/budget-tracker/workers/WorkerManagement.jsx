import { useState } from 'react';
import { 
  Plus, X, Trash2, Save, Edit2, UserPlus, Users, 
  Phone, Briefcase, DollarSign, Calendar, CheckCircle, 
  AlertCircle, Search, Filter, HardHat, Wrench, Zap, 
  Droplets, Hammer, Truck, Shield, ClipboardList
} from 'lucide-react';
import Card from '../../../common/Card';
import Button from '../../../common/Button';

const POSITIONS = [
  { value: 'laborer', label: 'Laborer', icon: HardHat },
  { value: 'foreman', label: 'Foreman', icon: Wrench },
  { value: 'electrician', label: 'Electrician', icon: Zap },
  { value: 'plumber', label: 'Plumber', icon: Droplets },
  { value: 'carpenter', label: 'Carpenter', icon: Hammer },
  { value: 'driver', label: 'Driver', icon: Truck },
  { value: 'security', label: 'Security', icon: Shield },
  { value: 'other', label: 'Other', icon: ClipboardList },
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

export default function WorkerManagement({ workers, setWorkers, formatPHP }) {
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    dailyRate: '',
    position: 'laborer',
    contactNumber: '',
    isActive: true,
  });

  const openAddForm = () => {
    setEditingWorker(null);
    setFormData({ name: '', dailyRate: '', position: 'laborer', contactNumber: '', isActive: true });
    setShowForm(true);
  };

  const openEditForm = (worker) => {
    setEditingWorker(worker);
    setFormData({
      name: worker.name,
      dailyRate: worker.dailyRate,
      position: worker.position,
      contactNumber: worker.contactNumber || '',
      isActive: worker.isActive,
    });
    setShowForm(true);
  };

  const saveWorker = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dailyRate) return;

    const workerData = {
      id: editingWorker?.id || Date.now(),
      name: formData.name,
      dailyRate: parseFloat(formData.dailyRate),
      position: formData.position,
      contactNumber: formData.contactNumber,
      isActive: formData.isActive,
      dateAdded: editingWorker?.dateAdded || new Date().toISOString().split('T')[0],
    };

    if (editingWorker) {
      setWorkers(workers.map(w => w.id === editingWorker.id ? workerData : w));
    } else {
      setWorkers([...workers, workerData]);
    }
    setShowForm(false);
  };

  const deleteWorker = () => {
    if (deleteConfirm) {
      setWorkers(workers.filter(w => w.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = filterPosition === 'all' || worker.position === filterPosition;
    return matchesSearch && matchesPosition;
  });

  const activeWorkers = filteredWorkers.filter(w => w.isActive);
  const inactiveWorkers = filteredWorkers.filter(w => !w.isActive);

  const getPositionIcon = (positionValue) => {
    const pos = POSITIONS.find(p => p.value === positionValue);
    return pos?.icon || HardHat;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header with stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '12px',
      }}>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Total Workers</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{workers.length}</p>
          </div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '11px',
            background: '#EBF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Users size={20} color="#4F8EF7" strokeWidth={2} />
          </div>
        </div>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Active Workers</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: '#22C989' }}>{activeWorkers.length}</p>
          </div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '11px',
            background: '#E3FAF1', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={20} color="#22C989" strokeWidth={2} />
          </div>
        </div>
        <div style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Avg Daily Rate</p>
            <p style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatPHP(workers.reduce((sum, w) => sum + w.dailyRate, 0) / (workers.length || 1))}
            </p>
          </div>
          <div style={{
            width: '42px', height: '42px', borderRadius: '11px',
            background: '#EEE9FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DollarSign size={20} color="#7C5CFC" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '12px',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Button onClick={openAddForm} variant="primary" icon={UserPlus} size="md">
          Add New Worker
        </Button>
        
        <div style={{ display: 'flex', gap: '10px', flex: 1, maxWidth: '400px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{
              position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
            }} />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...inputStyle,
                paddingLeft: '36px',
                background: 'var(--surface-card)',
              }}
            />
          </div>
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            style={{
              ...inputStyle,
              width: '130px',
              cursor: 'pointer',
              background: 'var(--surface-card)',
            }}
          >
            <option value="all">All Roles</option>
            {POSITIONS.map(pos => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Workers List */}
      <Card title="Workers Directory" icon={Users} iconColor="#4F8EF7" iconBg="#EBF2FF">
        {filteredWorkers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'var(--surface-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <AlertCircle size={26} color="var(--text-tertiary)" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              No workers found
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
              {searchTerm || filterPosition !== 'all' ? 'Try adjusting your filters' : 'Add your first worker to get started'}
            </p>
            {!searchTerm && filterPosition === 'all' && (
              <Button onClick={openAddForm} variant="outline" icon={Plus} size="sm" style={{ marginTop: '16px' }}>
                Add Worker
              </Button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Active Workers */}
            {activeWorkers.length > 0 && (
              <>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Active Workers ({activeWorkers.length})
                </p>
                {activeWorkers.map(worker => {
                  const PositionIcon = getPositionIcon(worker.position);
                  const positionLabel = POSITIONS.find(p => p.value === worker.position)?.label || worker.position;
                  return (
                    <div
                      key={worker.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '14px 16px',
                        background: 'var(--surface-base)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                      }}
                    >
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: '#EBF2FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <PositionIcon size={22} color="#4F8EF7" strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>{worker.name}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{positionLabel}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#22C989' }}>
                            {formatPHP(worker.dailyRate)}/day
                          </span>
                          {worker.contactNumber && (
                            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Phone size={10} /> {worker.contactNumber}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <button
                          onClick={() => openEditForm(worker)}
                          style={{
                            padding: '8px', borderRadius: '8px',
                            background: 'transparent', border: '1px solid var(--border-subtle)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Edit2 size={14} color="var(--text-secondary)" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(worker.id)}
                          style={{
                            padding: '8px', borderRadius: '8px',
                            background: 'transparent', border: '1px solid var(--border-subtle)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <Trash2 size={14} color="#F43F5E" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* Inactive Workers */}
            {inactiveWorkers.length > 0 && (
              <>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '8px' }}>
                  Inactive Workers ({inactiveWorkers.length})
                </p>
                {inactiveWorkers.map(worker => {
                  const PositionIcon = getPositionIcon(worker.position);
                  const positionLabel = POSITIONS.find(p => p.value === worker.position)?.label || worker.position;
                  return (
                    <div
                      key={worker.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '14px 16px',
                        background: 'var(--surface-base)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-lg)',
                        opacity: 0.7,
                      }}
                    >
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: '#F3F4F6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <PositionIcon size={22} color="#9CA3AF" strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, color: 'var(--text-secondary)', fontSize: '15px' }}>{worker.name}</p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{positionLabel}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF' }}>
                            {formatPHP(worker.dailyRate)}/day
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => openEditForm(worker)}
                        style={{
                          padding: '8px', borderRadius: '8px',
                          background: 'transparent', border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                        }}
                      >
                        <Edit2 size={14} color="var(--text-secondary)" strokeWidth={2} />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </Card>

      {/* Add/Edit Form Modal */}
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {editingWorker ? 'Edit Worker' : 'Add New Worker'}
              </h3>
              <button onClick={() => setShowForm(false)} style={{
                width: '34px', height: '34px', borderRadius: '9px',
                background: 'var(--surface-subtle)', border: '1px solid var(--border-subtle)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={15} color="var(--text-secondary)" />
              </button>
            </div>

            <form onSubmit={saveWorker} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FormField label="Full Name" icon={Users} required>
                <input
                  type="text"
                  placeholder="e.g., Juan Dela Cruz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  required
                />
              </FormField>

              <FormField label="Daily Rate (PHP)" icon={DollarSign} required>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)',
                  }}>₱</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.dailyRate}
                    onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                    style={{ ...inputStyle, paddingLeft: '30px' }}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </FormField>

              <FormField label="Position" icon={Briefcase}>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  {POSITIONS.map(pos => (
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </FormField>

              <FormField label="Contact Number" icon={Phone}>
                <input
                  type="tel"
                  placeholder="e.g., 09123456789"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  style={inputStyle}
                />
              </FormField>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="isActive" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Active Worker (available for payroll)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '8px' }}>
                <Button type="submit" variant="primary" icon={Save} size="lg" fullWidth>
                  {editingWorker ? 'Update Worker' : 'Add Worker'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)} size="lg" fullWidth>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
          <div style={{
            background: 'var(--surface-card)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            padding: '24px',
            maxWidth: '320px',
            width: '100%',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: '#FFF1F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px',
              }}>
                <Trash2 size={22} color="#F43F5E" strokeWidth={2} />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Delete Worker?
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                This will remove all payroll history for this worker.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button onClick={deleteWorker} variant="danger" fullWidth>Delete</Button>
              <Button onClick={() => setDeleteConfirm(null)} variant="secondary" fullWidth>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}