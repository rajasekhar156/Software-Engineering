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
  const handlelogout = async (e) => {
      e.preventDefault();
      navigate('/');
  };
  return (
    <div>

          <Box position={"absolute"} top={"0%"} left={"0%"} width={1847} >
            <AppBar position="static">
                <Toolbar >
                <Box position={"absolute"} left={"20%"} width={700}>
                <Button color="inherit" onClick={handleLatestEntry} sx={{fontWeight : '800', fontSize: '15px'}}>Latest Entry</Button>
                <Button color="inherit" onClick = {handleAdd} sx={{fontWeight : '800', fontSize: '15px'}} >Add Entry</Button>
                <Button color="inherit" sx={{fontWeight : '1000', fontSize: '18px'}}>Active Entries</Button>
                <Button color="inherit" onClick={handleSearch} sx={{fontWeight : '800', fontSize: '15px'}}>Search Entry</Button>
                </Box>
                <Button color="inherit" onClick={handlelogout} sx={{fontWeight : '400', fontSize: '12px', position: 'absolute', left: '79%'}}>logout</Button>
            </Toolbar>
            </AppBar>
            </Box>
      <Box position={"absolute"} top={"10%"} left={"0%"} width={1847} >
        {/* <Button variant="text" onClick={fetchData}>Fetch In Vehicles</Button> */}
        {/* <TableContainer
          component={Paper}
          sx={{ overflow: "scroll", height: "500px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Person Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email ID</TableCell>
                <TableCell>Entry Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inVehicles.map((vehicle) => (
                <TableRow key={vehicle._id}>
                  <TableCell>{vehicle.vehicleNumber}</TableCell>
                  <TableCell>{vehicle.personName}</TableCell>
                  <TableCell>{vehicle.phoneNumber}</TableCell>
                  <TableCell>{vehicle.emailId}</TableCell>
                  <TableCell>{vehicle.entryTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
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
