import {ReactNode} from "react";
import {searchObj} from "../utils";

export interface FwTableColumn<T extends object = {}> {
  title?: string,
  label?: string,
  name?: string,
  tdRender?: (column: FwTableColumn, data: T, rowIndex?: number, cellIndex?: number, dataList?: T[]) => ReactNode,
  thRender?: (column: FwTableColumn, index?: number, columns?: FwTableColumn[]) => ReactNode,
  indexColumn?: boolean,
  indexColumnOffset?: number
}

export interface FwTableProps<T extends object> {
  columns?: FwTableColumn[],
  data?: T[],
  className?: string
}

let _tableUuid = Number.MIN_SAFE_INTEGER;

function renderTableHeaderCell<T extends object = {}>(
  c: FwTableColumn<T>,
  i?: number,
  columns?: FwTableColumn<T>[]
): ReactNode {
  if (c.thRender) return c.thRender(c, i);

  return (<th key={`th-${_tableUuid++}`}>
    <div>
      {c.label}
    </div>
  </th>)
}

function renderTableDataCell<T extends object = {}>(
  c?: FwTableColumn<T>,
  d?: T,
  rowIndex?: number,
  cellIndex?: number,
  data?: T[]
): ReactNode {
  if (c.tdRender) return c.tdRender(c, d, rowIndex, cellIndex, data);

  // Get cell contents
  const textContent = c.indexColumn ? rowIndex + 1 + (c.indexColumnOffset ?? 0) : searchObj(c.name, d);

  return (<td key={`td-${rowIndex}-${cellIndex}-${_tableUuid++}`}>
      <div>
        {textContent}
      </div>
    </td>
  );
}

export function FwTable<T extends object>({columns, data, className = "x-table", ...other}: FwTableProps<T>) {
  console.log('fwtable', data);
  return (<table className={className} {...other}>
    {!columns || !columns.length ? null :
      (<thead>
      <tr>
        {columns.map((c, i) => renderTableHeaderCell(c, i, columns))}
      </tr>
      </thead>)
    }
    <tbody>
    {!data || !data.length ?
      (<tr><td colSpan={columns.length}><div>No entries found</div></td></tr>) :
      data.map((d, i) => (
        <tr key={`tr-${i}-${_tableUuid++}`}>{
          columns.map((c, j) => renderTableDataCell(c, d, i, j, data))
        }</tr>
      ))}
    </tbody>
  </table>);
}
