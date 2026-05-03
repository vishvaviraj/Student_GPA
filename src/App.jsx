import { useState, useEffect } from 'react';
import './App.css';
import ModuleTable from './components/ModuleTable';
import GPAGauge from './components/GPAGauge';
import GradeBreakdown from './components/GradeBreakdown';
import TargetGPA from './components/TargetGPA';
import PastSemesters from './components/PastSemesters';

function calculateGPA(modules) {
  let totalPoints = 0, totalCredits = 0;
  const breakdown = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  modules.forEach(({ credits, marks }) => {
    const c = parseFloat(credits) || 0;
    const m = parseFloat(marks);
    if (isNaN(m) || isNaN(c)) return;

    let gp;
    if (m >= 75)      { gp = 4.0; breakdown.A += c; }
    else if (m >= 70) { gp = 3.0; breakdown.B += c; }
    else if (m >= 55) { gp = 2.0; breakdown.C += c; }
    else if (m >= 40) { gp = 1.0; breakdown.D += c; }
    else              { gp = 0.0; breakdown.F += c; }

    totalPoints += gp * c;
    totalCredits += c;
  });

  const gpa = totalCredits ? +(totalPoints / totalCredits).toFixed(2) : 0;

  const bPct = {};
  Object.keys(breakdown).forEach(g => {
    bPct[g] = totalCredits ? Math.round((breakdown[g] / totalCredits) * 100) : 0;
  });

  return { gpa, breakdown: bPct, totalCredits };
}

export default function App() {
  const [modules, setModules] = useState([
    { id: 1, name: '', credits: 3, marks: '' }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Sem 1', gpa: 3.52 },
    { id: 2, name: 'Sem 2', gpa: 3.70 },
  ]);
  const [targetGPA, setTargetGPA] = useState(3.8);

  const addModule = () => {
    setModules([...modules, { id: Date.now(), name: '', credits: 3, marks: '' }]);
  };

  const removeModule = (id) => {
    setModules(modules.filter(m => m.id !== id));
  };

  const updateModule = (id, field, value) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const validModules = modules.filter(m => m.name && m.marks !== '');
  const { gpa, breakdown } = calculateGPA(validModules);

  const getStatus = (gpa) => {
    if (gpa >= 3.7) return "Dean's List (Excellent)";
    if (gpa >= 3.0) return "Good Standing";
    if (gpa >= 2.0) return "Satisfactory";
    return "At Risk";
  };

  const saveSemester = () => {
    if (gpa === 0) return alert("Add some modules first!");
    const name = `Sem ${semesters.length + 1}`;
    setSemesters([...semesters, { id: Date.now(), name, gpa }]);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="app-inner">
        {/* Header */}
        <div className="header">
          <h1>Grade Calculator</h1>
          <label className="toggle-label">
            Light/Dark Mode
            <input type="checkbox" checked={darkMode}
              onChange={e => setDarkMode(e.target.checked)} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="main-layout">
          {/* Left Panel */}
          <div className="left-panel">
            <div className="card">
              <ModuleTable
                modules={modules}
                onAdd={addModule}
                onRemove={removeModule}
                onUpdate={updateModule}
              />
            </div>

            <div className="card results-card">
              <GPAGauge gpa={gpa} status={getStatus(gpa)} />
              <GradeBreakdown breakdown={breakdown} />
            </div>

            <button className="btn-save" onClick={saveSemester}>
              💾 Save This Semester
            </button>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <TargetGPA
              currentGPA={gpa}
              targetGPA={targetGPA}
              setTargetGPA={setTargetGPA}
              modules={modules}
            />
            <PastSemesters semesters={semesters} />
          </div>
        </div>
      </div>
    </div>
  );
}