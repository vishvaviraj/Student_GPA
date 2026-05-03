export default function TargetGPA({ currentGPA, targetGPA, setTargetGPA, modules }) {
  const remaining = modules.filter(m => m.marks === '').length;

  const requiredAvg = () => {
    if (!remaining) return null;
    const done = modules.filter(m => m.marks !== '');
    const doneCredits = done.reduce((s, m) => s + +m.credits, 0);
    const remCredits = modules.filter(m => m.marks === '')
      .reduce((s, m) => s + +m.credits, 0);
    const totalCredits = doneCredits + remCredits;
    const donePoints = done.reduce((s, m) => {
      const p = +m.marks >= 75 ? 4 : +m.marks >= 70 ? 3 : +m.marks >= 55 ? 2 : +m.marks >= 40 ? 1 : 0;
      return s + p * +m.credits;
    }, 0);
    const needed = (targetGPA * totalCredits - donePoints) / remCredits;
    return Math.max(0, Math.min(100, Math.round(needed * 25)));
  };

  const req = requiredAvg();

  return (
    <div className="card">
      <h2>Target GPA</h2>
      <div className="current-badge">Current GPA: {currentGPA}</div>
      <input type="range" min="0" max="4" step="0.1"
        value={targetGPA}
        onChange={e => setTargetGPA(parseFloat(e.target.value))} />
      <div className="target-badge">Target GPA: {targetGPA}</div>
      {req !== null ? (
        <p>To reach <strong>{targetGPA}</strong>, you need an average of{' '}
          <strong>{req}%</strong> in your remaining{' '}
          <strong>{remaining} modules</strong>.
        </p>
      ) : (
        <p>All modules have marks entered.</p>
      )}
    </div>
  );
}