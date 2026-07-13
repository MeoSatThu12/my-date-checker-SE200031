import React, { useState } from 'react';
import './App.css';
import { validateDate } from './utils/dateHelper';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);

  const handleClear = () => {
    setDay('');
    setMonth('');
    setYear('');
    setResult(null);
  };

  const handleClose = () => {
    if (window.confirm('Are you sure you want to exit?')) {
      window.close();
    }
  };

  const handleCheck = (e) => {
    if (e) e.preventDefault();
    const result = validateDate(day, month, year);
    setResult(result);
  };

  return (
    <div className="winform-window">
      {/* Title bar (Form1) */}
      <div className="winform-titlebar">
        <div className="winform-title">
          <span className="winform-title-icon">
            <svg viewBox="0 0 16 16" width="16" height="16">
              <rect x="2" y="2" width="12" height="12" rx="1" fill="#f60" stroke="#fff" strokeWidth="1" />
              <rect x="4" y="4" width="3" height="3" fill="#fff" />
              <rect x="9" y="4" width="3" height="3" fill="#fff" />
              <rect x="4" y="9" width="8" height="3" fill="#fff" />
            </svg>
          </span>
          Form1
        </div>
        <div className="winform-controls">
          <button className="winform-control-btn disabled" aria-label="Minimize" tabIndex="-1">−</button>
          <button className="winform-control-btn disabled" aria-label="Maximize" tabIndex="-1">□</button>
          <button className="winform-control-btn close-btn" onClick={handleClose} aria-label="Close">✕</button>
        </div>
      </div>

      {/* Main client area */}
      <div className="winform-client">
        <h1 className="winform-header">Date Time Checker</h1>

        <form className="winform-form" onSubmit={handleCheck}>
          <div className="winform-row">
            <label htmlFor="day-input" className="winform-label">Day</label>
            <input
              id="day-input"
              type="text"
              className="winform-input"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="winform-row">
            <label htmlFor="month-input" className="winform-label">Month</label>
            <input
              id="month-input"
              type="text"
              className="winform-input"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
          <div className="winform-row">
            <label htmlFor="year-input" className="winform-label">Year</label>
            <input
              id="year-input"
              type="text"
              className="winform-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="winform-actions">
            <button
              type="button"
              className="winform-btn btn-clear"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="winform-btn btn-check"
            >
              Check
            </button>
          </div>
        </form>

        {/* Result box — kept for mobile/E2E test compatibility */}
        {result && (
          <div className={`result-box ${result.success ? 'success' : 'error'}`}>
            {result.success ? '✓ ' : '✗ '}
            {result.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
