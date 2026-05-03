import { Eye } from 'lucide-react';

export default function PastSemesters({ semesters }) {
  return (
    <div className="card">
      <h2>Past Semesters</h2>
      {semesters.map(sem => (
        <div key={sem.id} className="sem-row">
          <span>{sem.name}: <strong>{sem.gpa} GPA</strong></span>
          <Eye size={18} className="eye-icon" />
        </div>
      ))}
    </div>
  );
}