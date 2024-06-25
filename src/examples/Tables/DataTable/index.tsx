/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Mindcom Group (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useEffect, useState, LegacyRef, forwardRef } from "react";
import * as XLSX from "xlsx";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import ReactDOMServer from "react-dom/server";
// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";
import DownloadIcon from "@mui/icons-material/Download";

// Material Dashboard 2 PRO React TS examples components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";
import { Menu, MenuItem } from "@mui/material";
import MDButton from "components/MDButton";
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import HeaderPdf from "layouts/pages/Mindcompdf/HeaderPdf";

// Declaring props types for DataTable
interface Props {
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  canSearch?: boolean;
  importbtn?: boolean;
  showTotalEntries?: boolean;
  table: {
    columns: { [key: string]: any }[];
    rows: { [key: string]: any }[];
  };
  pagination?: {
    variant: "contained" | "gradient";
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
}
// eslint-disable-next-line
interface TableRow {
  [key: string]: any; // Define the shape of your table rows here
}
// eslint-disable-next-line

interface PdfGeneratorProps {
  data: Array<Record<string, any>> | string;
  hiddenText: string;
  dataShown: string;
  isPdfMode: boolean;
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
}: Props): JSX.Element {
  let defaultValue: any;
  let entries: any[];

  if (entriesPerPage) {
    defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : "10";
    entries = entriesPerPage.entries ? entriesPerPage.entries : ["10", "25", "50", "100"];
  }

  const columns = useMemo<any>(() => table.columns, [table]);
  const data = useMemo<any>(() => table.rows, [table]);
  // eslint-disable-next-line
  const [tablerowdata, setTablerowdata] = useState([]);
  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  console.log(page, pageIndex, pageSize, "rowss for tableeeeeeeeeeee");
  // Set the default value for the entries per page when component mounts
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);
  /* eslint-disable react-hooks/exhaustive-deps */

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: any) => setPageSize(value);

  // Render the paginations
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

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }: any) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }: any) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
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

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  // pdfgeneration
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    // Set up table headers and rows
    const tableHeaders = table.columns.map((column) => column.Header);
    const filteredTableHeaders = tableHeaders.filter((header) => header !== "Action");

    const tableRows = table.rows.map((row) => {
      // Get the keys from the first row of the input data
      const keys = Object.keys(table.rows[0]);
      // Map the keys to the corresponding values in the current row
      return keys.map((key) => {
        const value = row[key];
        // Check if the value is an object
        if (typeof value === "object" && value !== null) {
          // If it's an object, convert it to a string using JSON.stringify
          return JSON.stringify(value);
        } else {
          // Otherwise, return the value as is
          return value;
        }
      });
    });

    // Flatten each individual row before passing to autoTable
    const flattenedTableRows = tableRows.map((row) => row.flat());

    // Add the table to the PDF document
    autoTable(doc, {
      head: [filteredTableHeaders],
      body: flattenedTableRows, // Pass flattenedTableRows as an array of arrays
    });

    // Save the PDF file
    doc.save("table.pdf");
  };
  // const handleGeneratePDF = () => {
  //   const doc = new jsPDF();

  //   // Add the header content
  //   const headerContent = ReactDOMServer.renderToStaticMarkup(<HeaderPdf isPdfMode={false} />);
  //   doc.setFontSize(18);
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const textWidth =
  //     (doc.getStringUnitWidth(headerContent) * doc.internal.getFontSize()) /
  //     doc.internal.scaleFactor;
  //   const x = (pageWidth - textWidth) / 2;
  //   doc.text(headerContent, x, 20);

  //   // Set up table headers and rows
  //   const tableHeaders = table.columns.map((column) => column.Header);
  //   const filteredTableHeaders = tableHeaders.filter((header) => header !== "Action");
  //   const tableRows = table.rows.map((row) => {
  //     // Get the keys from the first row of the input data
  //     const keys = Object.keys(table.rows[0]);
  //     // Map the keys to the corresponding values in the current row
  //     return keys.map((key) => row[key]);
  //   });

  //   // Flatten each individual row before passing to autoTable
  //   const flattenedTableRows = tableRows.map((row) => row.flat());

  //   // Add some spacing between the header and the table
  //   doc.setFontSize(12);
  //   const startY = 40;

  //   // Add the table to the PDF document
  //   autoTable(doc, {
  //     head: [filteredTableHeaders],
  //     body: flattenedTableRows, // Pass flattenedTableRows as an array of arrays
  //     startY: startY,
  //   });

  //   // Save the PDF file
  //   doc.save("table.pdf");
  // };
  const PdfGenerator = forwardRef<HTMLDivElement, PdfGeneratorProps>(
    ({ data, hiddenText, isPdfMode, dataShown }, ref) => {
      return (
        <div ref={ref as LegacyRef<HTMLDivElement>} className="hidden-text">
          {isPdfMode && <HeaderPdf isPdfMode={true} />}
          {Array.isArray(data) && data.length > 0 ? (
            <table border={1}>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, idx) => (
                      <td key={idx}>{String(value)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{typeof data === "string" ? data : "No data available"}</p>
          )}
          <div className="hidden-text">{hiddenText}</div>
        </div>
      );
    }
  );
  // excel generation
  const downloadXLSX = (tableData: TableRow[]) => {
    // Filter out the "Action" column header and its corresponding data
    const filteredTableData = tableData.map((row) => {
      const filteredRow: TableRow = {};
      Object.keys(row).forEach((key) => {
        if (key !== "action") {
          filteredRow[key] = row[key];
        }
      });
      return filteredRow;
    });

    const headers = Object.keys(filteredTableData[0]);
    const data = filteredTableData.map((row) => headers.map((header) => row[header]));

    // Create a new style object for the header row with a background color

    // Apply the header style to the first row of the worksheet (headers)
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table.xlsx");
  };

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }
  console.log(table.columns, "column data ");
  console.log(table.rows, "rowdata");
  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      {entriesPerPage || canSearch || importbtn ? (
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
              {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleGeneratePDF}>PDF</MenuItem>
                <MenuItem onClick={() => downloadXLSX(table.rows)}>XSL</MenuItem>
              </Menu>
              <MDButton
                variant="gradient"
                color="info"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <DownloadIcon />
              </MDButton> */}
            </MDBox>
          )}
          {importbtn && (
            <MDBox width="12rem" ml="auto">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleGeneratePDF}>PDF</MenuItem>
                <MenuItem onClick={() => downloadXLSX(table.rows)}>XSL</MenuItem>
              </Menu>
              <MDButton
                variant="gradient"
                color="info"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <DownloadIcon />
              </MDButton>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
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
                  {/* setHeader({column}) */}
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
                    {/* setBodydata(cell) */}
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
    </TableContainer>
  );
}

// Declaring default props for DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: ["5", "10", "15", "20", "25"] },
  canSearch: false,
  importbtn: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

export default DataTable;
