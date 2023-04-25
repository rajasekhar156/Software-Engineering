import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MaterialReactTable from 'material-react-table';

export const ActiveEntries = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  
  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  
  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
      // console.log("22");
      let url;
      url = `http://localhost:5001/api/in-vehicles`;
      // url.searchParams.set(
      //   'start',
      //   `${pagination.pageIndex * pagination.pageSize}`,
      // );

      // url.searchParams.set('size', `${pagination.pageSize}`);
      // url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
      // url.searchParams.set('globalFilter', globalFilter ?? '');
      // url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

      try {
        const response = await fetch(url);
        const j1son = await response.json();
        console.log(j1son);
        setData(j1son);
        // console.log(j1son.length);
        setRowCount(j1son.length);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;

      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,]);
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'vehicleNumber',
        header: 'Vehicle Number',
      },

      {
        accessorKey: 'personName',
        header: 'Person Name',
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
      },
      {
        accessorKey: 'emailId',
        header: 'Email ID',
      },
      {
        accessorKey: 'entryTime',
        header: 'Entry Time',
      },

    ],
    [],
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    navigate("/Add");
  };
  const handleLatestEntry = async (e) => {
    e.preventDefault();
    navigate("/Home");
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/Search");
  };
  return (
    <div>
      <Box sx={{ width: 1000 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 0.8 }}>
              Active Entries
            </Typography>
            <Button color="inherit" onClick={handleLatestEntry}>
              Latest Entry
            </Button>
            <Button color="inherit" onClick={handleAdd}>
              Add Entry
            </Button>
            <Button color="inherit" onClick={handleSearch}>
              Search
            </Button>
          </Toolbar>
        </AppBar>

        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection
          getRowId={(row) => row.vehicleNumber}
          initialState={{ showColumnFilters: true }}
          manualFiltering
          manualPagination
          manualSorting
          muiToolbarAlertBannerProps={
            isError
              ? {
                color: 'error',
                children: 'Error loading data',
              }
              : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={rowCount}
          state={{
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
          }}
        />

      </Box>
    </div>
  );
};
