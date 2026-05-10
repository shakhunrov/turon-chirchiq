import { Card } from '../../design-system/Card';

type TableSectionProps = {
  title?: string;
  columns?: Array<{ key: string; label: string }>;
  rows?: Array<Record<string, string | number>>;
};

export default function TableSection({ title, columns = [], rows = [] }: TableSectionProps) {
  return (
    <Card className="r-card">
      {title && <h3>{title}</h3>}
      <div className="r-table-wrap">
        <table className="r-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
