import { useMemo, useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";
import DownloadIcon from "@mui/icons-material/Download";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
  Divider,
  ListSubheader,
  IconButton,
} from "@mui/material";
import MDButton from "components/MDButton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Column, Accessor } from "react-table";
import { useReactToPrint } from "react-to-print";
import PdfGenerator from "layouts/pages/Mindcompdf/PdfGenerator";
import ReactDOM from "react-dom";
interface DataItem {
  [key: string]: any;
}
interface Props {
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  canSearch?: boolean;
  importbtn?: boolean;
  selectColumnBtn?: boolean;
  showTotalEntries?: boolean;
  table: {
    columns: Column<DataItem>[];
    rows: DataItem[];
    pdfRows?: DataItem[];
  };
  pagination?: {
    variant: "contained" | "gradient";
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
  pdfGeneratorProps?: {
    isPdfMode: boolean;
    hiddenText: string;
    additionalInfo?: any;
  };
}

interface TableRow {
  [key: string]: any;
}

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  importbtn,
  selectColumnBtn,
  pdfGeneratorProps,
}: Props): JSX.Element {
  let defaultValue: any;
  let entries: any[];

  if (entriesPerPage) {
    defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : "10";
    entries = entriesPerPage.entries ? entriesPerPage.entries : ["10", "25", "50", "100"];
  }

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});
  const [openColumnSelector, setOpenColumnSelector] = useState(false);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState<null | HTMLElement>(null);
  const getAccessorString = (accessor: string | Accessor<DataItem>): string => {
    if (typeof accessor === "string") {
      return accessor;
    }
    if (typeof accessor === "function") {
      // For function accessors, we can't reliably get a string representation
      // So we'll return an empty string or some placeholder
      return "";
    }
    // If it's neither a string nor a function (shouldn't happen, but TypeScript doesn't know that)
    return "";
  };
  const columns = useMemo<Column<DataItem>[]>(() => {
    const allColumns = table.columns as Column<DataItem>[];
    if (Object.keys(visibleColumns).length === 0) {
      const initialVisibleColumns = allColumns.reduce((acc, column) => {
        acc[getAccessorString(column.accessor)] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setVisibleColumns(initialVisibleColumns);
      return allColumns;
    }
    return allColumns.filter((column) => visibleColumns[getAccessorString(column.accessor)]);
  }, [table.columns, visibleColumns]);

  const data = useMemo<DataItem[]>(() => table.rows, [table]);
  const tableInstance = useTable<DataItem>(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  }: any = tableInstance;

  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  const setEntriesPerPage = (value: any) => setPageSize(value);

  const renderPagination = pageOptions.map((option: any) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  const handleInputPagination = ({ target: { value } }: any) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  const handleInputPaginationValue = ({ target: value }: any) => gotoPage(Number(value.value - 1));

  const [search, setSearch] = useState(globalFilter);

  const onSearchChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 100);

  const setSortedValue = (column: any) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const getVisibleData = () => {
    const dataToUse = table.pdfRows || table.rows;
    return dataToUse.map((row) => {
      const visibleRow: DataItem = {};
      Object.keys(row).forEach((key) => {
        if (visibleColumns[key]) {
          visibleRow[key] = row[key];
        }
      });
      return visibleRow;
    });
  };
  const tableRef = useRef(null);

  const generatePdf = useReactToPrint({
    content: () => {
      if (tableRef.current) {
        // Force a re-render of the PdfGenerator with current visible columns
        const pdfGeneratorElement = tableRef.current.querySelector(".pdf-generator");
        if (pdfGeneratorElement) {
          pdfGeneratorElement.innerHTML = "";
          ReactDOM.render(
            <PdfGenerator
              data={getVisibleData()}
              isPdfMode={true}
              hiddenText={pdfGeneratorProps?.hiddenText || ""}
              additionalInfo={pdfGeneratorProps?.additionalInfo}
            />,
            pdfGeneratorElement
          );
        }
      }
      return tableRef.current;
    },
  });
  const downloadXLSX = (tableData: TableRow[]) => {
    const flattenArrayData = (data: any): string => {
      if (Array.isArray(data)) {
        return data.map((item) => flattenArrayData(item)).join(", ");
      }
      return String(data);
    };

    const filteredTableData = tableData.map((row) => {
      const filteredRow: DataItem = {};
      columns.forEach((column) => {
        const accessor = getAccessorString(column.accessor);
        filteredRow[accessor] = flattenArrayData(row[accessor]);
      });
      return filteredRow;
    });

    const headers = columns.map((column) => column.Header as string);
    const data = filteredTableData.map((row) =>
      columns.map((column) => row[getAccessorString(column.accessor)])
    );

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  const handleColumnSelectorOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleColumnSelectorClose = () => {
    setColumnMenuAnchorEl(null);
  };

  const handleColumnToggle = (columnName: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch || importbtn || selectColumnBtn ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;Entries per page
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto" pr={1}>
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }: any) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
          {(importbtn || selectColumnBtn) && (
            <MDBox display="flex" alignItems="center">
              {importbtn && (
                <MDBox mr={1}>
                  <IconButton
                    // variant="gradient"
                    // color="info"
                    // id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <DownloadIcon />
                  </IconButton>
                </MDBox>
              )}
              {selectColumnBtn && (
                <IconButton onClick={handleColumnSelectorOpen}>
                  <ViewColumnIcon fontSize="large" />{" "}
                </IconButton>
              )}
            </MDBox>
          )}
          {pdfGeneratorProps && (
            <MDBox ref={tableRef} className="hidden-text">
              <PdfGenerator
                data={getVisibleData()}
                isPdfMode={true}
                hiddenText={pdfGeneratorProps.hiddenText}
                additionalInfo={pdfGeneratorProps.additionalInfo}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup: any, key: any) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, key: any) => (
                <DataTableHeadCell
                  key={key}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: any, key: any) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell: any, key: any) => (
                  <DataTableBodyCell
                    key={key}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(event: any) => {
                    handleInputPagination(event);
                    handleInputPaginationValue(event);
                  }}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={generatePdf}>PDF</MenuItem>
        <MenuItem onClick={() => downloadXLSX(table.pdfRows || table.rows)}>Excel</MenuItem>
      </Menu>
      <Menu
        anchorEl={columnMenuAnchorEl}
        open={Boolean(columnMenuAnchorEl)}
        onClose={handleColumnSelectorClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiMenu-list": {
              padding: 0,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ListSubheader sx={{ lineHeight: "40px", backgroundColor: "background.paper" }}>
          Select Columns
        </ListSubheader>
        <Divider />
        <MDBox sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {table.columns.map((column) => (
            <MenuItem key={getAccessorString(column.accessor)} sx={{ padding: 0 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={visibleColumns[getAccessorString(column.accessor)]}
                    onChange={() => handleColumnToggle(getAccessorString(column.accessor))}
                    size="medium"
                  />
                }
                label={column.Header as React.ReactNode}
                sx={{ width: "100%", padding: "8px 16px" }}
              />
            </MenuItem>
          ))}
        </MDBox>
      </Menu>
    </TableContainer>
  );
}

DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: ["5", "10", "15", "20", "25"] },
  canSearch: false,
  importbtn: false,
  selectColumnBtn: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

export default DataTable;
