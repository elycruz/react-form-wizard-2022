export interface TableColumn {
  title?: string,
  label?: string,
  name?: string
}

export interface TableProps<T extends object> {
  columns?: TableColumn[],
  data?: T[],
}

let _tableUuid = Number.MIN_SAFE_INTEGER;

export function Table<T extends object>({columns, data, ...other}: TableProps<T>) {
  return (<table {...other}>
    <thead>
    <tr>
      {columns.map((c, i) => (<th key={`th-${_tableUuid++}`}><div>
        {c.label}
      </div></th>))}
    </tr>
    </thead>
    <tbody>
    {data.map((d, i) => (<tr key={`tr-${_tableUuid++}`}>{
        columns.map((c, j) => (<td key={`td-${_tableUuid++}`}>
            {d[c.name]}
          </td>
        ))}</tr>
    ))}
    </tbody>
    <tfoot></tfoot>
  </table>);
}
