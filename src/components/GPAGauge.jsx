export default function GPAGauge({ gpa, status }) {
  const percent = (gpa / 4.0) * 100;
  const angle = -90 + (percent / 100) * 180;

  const getColor = () => {
    if (gpa >= 3.7) return '#10b981';
    if (gpa >= 3.0) return '#3b82f6';
    if (gpa >= 2.0) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 200 110" width="200">
        <path d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none" stroke="#e5e7eb" strokeWidth="18" strokeLinecap="round" />
        <path d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none" stroke={getColor()} strokeWidth="18" strokeLinecap="round"
          strokeDasharray={`${2.827 * percent} 282.7`} />
        <line x1="100" y1="100"
          x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#374151" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="100" r="5" fill="#374151" />
      </svg>
      <div className="gauge-text">
        <div className="gauge-gpa">CURRENT GPA: {gpa} / 4.0</div>
        <div className="gauge-status" style={{ color: getColor() }}>
          Status: {status}
        </div>
      </div>
    </div>
  );
}