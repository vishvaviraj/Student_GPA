import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = { A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#f97316', F: '#ef4444' };

export default function GradeBreakdown({ breakdown }) {
  const data = Object.entries(breakdown)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) return (
    <div className="no-data">Add modules to see grade breakdown</div>
  );

  return (
    <div className="breakdown-wrap">
      <h3>GRADE BREAKDOWN</h3>
      <PieChart width={200} height={180}>
        <Pie data={data} cx={95} cy={80} outerRadius={70} dataKey="value">
          {data.map(({ name }) => (
            <Cell key={name} fill={COLORS[name]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`} />
        <Legend />
      </PieChart>
    </div>
  );
}