export default function ModuleTable({ modules, onAdd, onRemove, onUpdate }) {
  const getMarkColor = (marks) => {
    const m = parseFloat(marks);
    if (isNaN(m)) return '';
    if (m >= 70) return 'marks-green';
    if (m >= 55) return 'marks-yellow';
    if (m >= 40) return 'marks-orange';
    return 'marks-red';
  };

  return (
    <div>
      <div className="table-header">
        <span>Module Name</span>
        <span>Credits</span>
        <span>Marks (%)</span>
        <span></span>
      </div>
      {modules.map(mod => (
        <div key={mod.id} className="module-row">
          <input
            type="text"
            placeholder="Module Name"
            value={mod.name}
            onChange={e => onUpdate(mod.id, 'name', e.target.value)}
          />
          <select value={mod.credits}
            onChange={e => onUpdate(mod.id, 'credits', e.target.value)}>
            {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
          </select>
          <input
            type="number" min="0" max="100"
            placeholder="Marks"
            value={mod.marks}
            className={getMarkColor(mod.marks)}
            onChange={e => onUpdate(mod.id, 'marks', e.target.value)}
          />
          <button className="btn-remove" onClick={() => onRemove(mod.id)}>✕</button>
        </div>
      ))}
      <button className="btn-add" onClick={onAdd}>+ Add New Module</button>
    </div>
  );
}