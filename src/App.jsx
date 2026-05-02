import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. State එක හදමු (Modules list එක තියාගන්න)
  const [modules, setModules] = useState([
    { id: 1, name: '', credits: 3, marks: '' }
  ]);

  // 2. අලුත් Module row එකක් add කරන function එක
  const addModule = () => {
    setModules([...modules, { id: Date.now(), name: '', credits: 3, marks: '' }]);
  };

  return (
    <div className="container">
      <h1>Student Grade Calculator</h1>
      
      <div className="input-section">
        {modules.map((module, index) => (
          <div key={module.id} className="input-row">
            <input type="text" placeholder="Module Name" />
            <select>
              <option value="1">1 Credit</option>
              <option value="2">2 Credits</option>
              <option value="3">3 Credits</option>
              <option value="4">4 Credits</option>
            </select>
            <input type="number" placeholder="Marks (%)" />
          </div>
        ))}
      </div>

      <button onClick={addModule} className="add-btn">+ Add Module</button>
      
      <div className="result-card">
        <h2>Your GPA: 0.00</h2>
      </div>
    </div>
  );
}

export default App;