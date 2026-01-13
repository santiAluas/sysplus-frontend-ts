
import {
  Column,
  FilteringState,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SortingState
} from '@devexpress/dx-react-grid';
import {
  Grid,
  PagingPanel,
  Table,
  TableFilterRow,
  TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { IActionConfig } from './DataGridCommon/IActionConfig';
import TextFieldCustomDataGrid from './DataGridCommon/TextFieldCustomDataGrid';
import { ActionColumn } from './DataGridCommon/ActionConfig';
import RenderHTML from './DataGridCommon/RenderHTML';


interface ColumnExtension {
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface StyledTableHeaderCellProps {
  align?: 'left' | 'center' | 'right';
}

interface ColumnExtended extends Column {
  fontSize?: string;
}
interface Props<T = any> {
  rows: T[];
  columns: Column[];
  getRowId?: (row: T) => string | number;
  columsHide?: string[];
  actions?: IActionConfig<T>[];
  hiddenFilterColumn?: string[];
  onChangeFilters?: <T>(filter: T[]) => void | undefined;
  gridId: string;
  titleEmptyTable?: string;
  iconDirectionFilter?: 'start' | 'end';
  heightBodyEmptyData?: string;
  hasPagination?: Boolean;
  addNumeration?: Boolean;
  hasFilters?: Boolean;
  searchLabel?: String;
  widthNumeration?: string;
}

const StyledTableHeaderCell = styled(
  TableHeaderRow.Cell
)<StyledTableHeaderCellProps>(({ theme, align = 'left' }) => ({
  fontWeight: 'bold',
  backgroundColor: 'white',
  padding: '12px 0px',
  textAlign: align,

  '& .Title-title': {
    display: 'flex',
    alignItems: align,
    justifyContent: align,
    width: '100%'
  }
}));

const FilterCell = (props: any) => {
  const { column } = props;
  if (column?.hiddenFilterColumn) {
    return (
      <Table.Cell
        value={null}
        row={props.row}
        column={props.column}
        tableRow={props.tableRow}
        tableColumn={props.tableColumn}
        style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
      />
    );
  }

  return (
    <TableFilterRow.Cell
      {...props}
      style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
    >
      <TextFieldCustomDataGrid {...props} />
    </TableFilterRow.Cell>
  );
};

const LoadingContainer = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  zIndex: 10,
});

const StyledHeaderCell = styled(TableHeaderRow.Cell)(({ theme, align }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200], // Color de fondo sutil y profesional
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '12px 8px',
  textAlign: align,
}));

const StyledTableCell = styled(Table.Cell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`, // Borde sutil entre filas
  padding: '12px 8px', // Espaciado consistente
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  fontSize: '0.875rem',
}));

const StyledTableRow = styled(Table.Row)(({ theme }) => ({
  // Efecto Zebra para mejor legibilidad
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Efecto Hover para interactividad
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
}));


const CustomDataGridTs = <T,>({
  rows,
  columns,
  getRowId,
  columsHide = [],
  actions = [],
  titleEmptyTable = 'Tabla sin datos',
  heightBodyEmptyData = '',
  onChangeFilters = () => { },
  hasPagination = true,
  addNumeration = false,
  hasFilters = true,
  searchLabel = '',
  widthNumeration = '65px'
}: Props<T>) => {
  const [pageSizes] = useState([5, 10, 15]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [filteredRowsNumber, setFilteredRowsNumber] = useState<any[]>([]);

  const columnVisible = useMemo(() => {
    const visible = columns.filter(col => !columsHide.includes(col.name));
    if (!addNumeration) {
      return visible;
    }
    return [
      {
        name: 'rowNumber',
        title: 'Nro.',
        width: widthNumeration,
        hiddenFilterColumn: true,
        align: 'right'
      },
      ...visible
    ];
  }, [columns, columsHide]);

  const updateFilteredRows = (rowsData: any[]) => {
    let rowsNumbered = [];
    if (filters.length === 0) {
      rowsNumbered = rowsData.map((row, index) => {
        const rowNumbered = { rowNumber: index + 1, ...row };
        return rowNumbered;
      });
    }
    if (filters.length > 0) {
      filters.forEach(filter => {
        rowsNumbered = rowsData.filter(row =>
          String(row[filter.columnName])
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        );
        rowsData = rowsNumbered;
      });
    } else {
      rowsNumbered = rowsData;
    }

    rowsNumbered = rowsNumbered.map((row, index) => {
      return { rowNumber: index + 1, ...row };
    });

    setFilteredRowsNumber(rowsNumbered);
  };

  useEffect(() => {
    updateFilteredRows(rows);
  }, [rows, filters]);

  const columnExtensions = useMemo(() => {
    return columnVisible.map(column => {
      const columnWithExtension = column as Column & ColumnExtension;
      return {
        columnName: column.name,
        width: columnWithExtension.width || 'auto',
        align: columnWithExtension.align || 'left',
        wordWrapEnabled: true
      };
    });
  }, [columnVisible]);

  const handleFilterChange = (values: any) => {
    const changedFilters = values?.filter((item: any) => !!item?.value);
    onChangeFilters(values);
    setFilters(changedFilters);
    updateFilteredRows(rows);
  };

  const CustomHeaderCell = (props: any) => {
    const { column } = props;
    const align = column.alignHeader || 'left';
    const fontSizeHeader = column.fontSizeHeader || '14px';

    return (
      <StyledTableHeaderCell
        {...props}
        align={align}
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #ccc',
          textAlign: align,
          fontSize: fontSizeHeader
        }}
      />
    );
  };

const ActionCell = (props: any) => {
  const { column, row } = props;

  // ⚡ Obtén el valor ya calculado (respetando getCellValue)
  const columnConfig = columnVisible.find((c) => c.name === column.name) as Column;
  const rawValue = row[column.name];
  const value =
    typeof columnConfig?.getCellValue === "function"
      ? columnConfig.getCellValue(row, column.name)
      : rawValue;

  const columnDef = columnVisible.find(
    (c) => c.name === column.name
  ) as ColumnExtended;

  const commonStyle = {
    fontSize: columnDef?.fontSize || "13px",
    whiteSpace: "normal",
    wordWrap: "break-word",
    padding: "8px",
  };

  // 🔸 Caso especial: columna de acciones
  if (column.name === "actions") {
    const filteredActions = actions.filter((action) => {
      if (typeof action.hidden === "function") return !action.hidden(row);
      return !action.hidden;
    });

    return (
      <Table.Cell {...props} style={commonStyle}>
        <ActionColumn row={row} actions={filteredActions} />
      </Table.Cell>
    );
  }

  // 🔹 Mostrar el valor ya formateado (getCellValue)
  const containsHTML =
    typeof value === "string" && /<[a-z][\s\S]*>/i.test(value);

  return (
    <Table.Cell {...props} style={commonStyle}>
      {containsHTML ? <RenderHTML html={value} /> : value}
    </Table.Cell>
  );
};


  const theme = useTheme();

  theme.components.MuiTable = {
    styleOverrides: {
      root: {
        '& thead .MuiTableCell-head': {
          backgroundColor: '#e8e8e8',
          border: 'none',
          fontSize: 'clamp(0.825rem, 0.650rem + 0.25vi, 2.75rem) !important',
          fontWeight: 'bold'
        },
        ...(heightBodyEmptyData && {
          '& .TableNoDataCell-text': {
            padding: `${heightBodyEmptyData} 0 !important`,
            fontSize: 'clamp(0.625rem, 0.596rem + 0.29vi, 2.75rem) !important'
          }
        })
      }
    }
  };

  theme.components.MuiTableCell = {
    styleOverrides: {
      body: {
        fontSize: 'clamp(0.625rem, 0.594rem + 0.25vi, 2.75rem) !important',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        padding: '8px'
      }
    }
  };

  theme.components.MuiInputLabel = {
    styleOverrides: {
      root: {
        fontSize: 'clamp(0.625rem, 0.594rem + 0.25vi, 2.75rem) !important',
        top: '0px',
        marginTop: '8px'
      }
    }
  };
  useEffect(() => {
    if (!rows || rows.length === 0) {
      setFilteredRowsNumber([]);
      setCurrentPage(0); // reset paginación también
    }
  }, [rows]);


  const FilterCellComponent = useMemo(() => {
    return (props: any) => {
      const { column } = props;

      if (column?.hiddenFilterColumn) {
        return (
          <Table.Cell
            value={null}
            row={props.row}
            column={props.column}
            tableRow={props.tableRow}
            tableColumn={props.tableColumn}
            style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
          />
        );
      }

      return (
        <TableFilterRow.Cell
          {...props}
          style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc' }}
        >
          <TextFieldCustomDataGrid {...props} searchLabel={searchLabel} />
        </TableFilterRow.Cell>
      );
    };
  }, [searchLabel]);




  // 1) Comparadores
const naturalText = (a?: any, b?: any) =>
  String(a ?? "").localeCompare(String(b ?? ""), undefined, { numeric: true, sensitivity: "base" });

const asNumber = (v: any) => {
  if (typeof v === "number") return v;
  const s = String(v ?? "").trim().replace(/\./g, "").replace(/,/g, "."); // "1.234,56" -> 1234.56
  const n = Number(s);
  return Number.isNaN(n) ? Number(v) : n;
};
const numCompare = (a: any, b: any) => asNumber(a) - asNumber(b);

const dateCompare = (a: any, b: any) => {
  const toTs = (x: any) => {
    if (x instanceof Date) return x.getTime();
    const iso = Date.parse(String(x ?? ""));
    if (!Number.isNaN(iso)) return iso;
    const m = String(x ?? "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); // DD/MM/YYYY
    return m ? new Date(+m[3], +m[2]-1, +m[1]).getTime() : Number.MIN_SAFE_INTEGER;
  };
  return toTs(a) - toTs(b);
};

// 2) Di cuáles columnas usan cada comparador (pon aquí tus nombres)
const TEXT_COLS = ["cliente", "agencia", "producto"];
const NUM_COLS  = ["monto", "saldo", "total"];
const DATE_COLS = ["fecha", "fechaVenc", "creadoEl"];

// 3) Construye columnExtensions para IntegratedSorting
const sortingComparators = [
  ...TEXT_COLS.map(columnName => ({ columnName, compare: naturalText })),
  ...NUM_COLS.map(columnName  => ({ columnName, compare: numCompare })),
  ...DATE_COLS.map(columnName => ({ columnName, compare: dateCompare })),
];


  return (
      <Paper sx={{ padding: 0, width: '100%' }}>
        <Grid
          rows={filteredRowsNumber}
          columns={columnVisible}
          getRowId={getRowId || (row => (row as any).id)}
        >
         <SortingState  columnExtensions={[
      { columnName: 'acciones', sortingEnabled: true }, 
    ]}/>
         <IntegratedSorting columnExtensions={sortingComparators}/>
          {hasFilters && (
            <FilteringState
              defaultFilters={[]}
              filters={filters}
              onFiltersChange={handleFilterChange}
            />
          )}

          {hasPagination && (
            <PagingState
              currentPage={currentPage}
              onCurrentPageChange={setCurrentPage}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          )}
          {hasPagination && <IntegratedPaging />}

          <Table
            cellComponent={ActionCell}
            columnExtensions={columnExtensions}
            messages={{ noData: titleEmptyTable }}
          />
          <TableHeaderRow cellComponent={CustomHeaderCell}  showSortingControls/>
          {hasFilters && (
            <TableFilterRow
              iconComponent={SearchIcon}
              cellComponent={FilterCellComponent}
            />
          )}
          {hasPagination && (
            <PagingPanel pageSizes={pageSizes} messages={{ rowsPerPage: '' }} />
          )}
        </Grid>
      </Paper>
  );
};

export default CustomDataGridTs;
