import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme/theme";
import AddIcon from "@mui/icons-material/Add";
import DataGriTable from "../components/customGrid/DataGrid";
import {
  GridAlignment,
  GridCellParams,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import ActionsButtonGrid from "../components/ActionsButtonGrid";
import useHttp from "../hooks/use-http";
import AthleteModel from "../components/modals/AthleteModel";
import { CustomToolbar } from "../components/customGrid/gridCustomToolbar";
import config from "../services/config.json";
import { Athlete } from "../types/modal";

const Athletes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);
  const [openUpdateConfirmation, setOpenUpdateConfirmation] =
    useState<boolean>(false);
  const [deleteRow, setDeleteRow] = useState<Athlete | null>(null);
  const [updateRow, setUpdateRow] = useState<Athlete | null>(null);
  const [rowData, setRowData] = useState<Athlete[]>([]);
  const [rowCountState, setRowCountState] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>();
  const [sortModel, setSortModel] = useState<GridSortModel>();
  const URL = config.apiUrl + "/athletes";
  const { getData } = useHttp<Athlete[]>({
    url: URL,
    paginationModel,
    setRowData,
    setRowCountState,
    setPaginationModel,
    setFilterModel,
    setSortModel,
  });

  useEffect(() => {
    getData();
  }, [location.search]);

  const stringOperators = getGridStringOperators().filter((op) =>
    ["contains", "equals"].includes(op.value)
  );

  const columns: GridColDef[] = [
    {
      field: "serial",
      headerName: "Sr#",
      flex: 0.5,
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Athlete Name",
      flex: 1,
      filterOperators: stringOperators,
    },
    {
      field: "gender_id",
      headerName: "Gender",
      filterable: false,
      flex: 1,
      type: "singleSelect",
      renderCell: (params: GridCellParams) => (
        <Typography>{params.row.gender_id.name}</Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 1,
      headerAlign: "center" as GridAlignment,
      renderCell: (params: GridCellParams<any, Athlete>) => (
        <ActionsButtonGrid
          // notDeleteRow={true}
          setDeleteRow={setDeleteRow}
          setOpenDeleteConfirmation={setOpenDeleteConfirmation}
          setUpdateRow={setUpdateRow}
          setOpenUpdateConfirmation={setOpenUpdateConfirmation}
          row={params.row}
        />
      ),
    },
  ];
  const rows = rowData?.map((athlete: Athlete, index: number) => ({
    id: athlete.id,
    serial: paginationModel.page * paginationModel.pageSize + index + 1,
    name: athlete.name,
    gender_id: {
      id: athlete.gender_id,
      name: athlete.gender?.name,
    },
  }));

  return (
    <Box sx={{ height: 400, width: "97%", margin: "10px" }}>
      <ToastContainer theme={theme.palette.mode} />
      <Paper elevation={3}>
        <Box p={2} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5" color={colors.primary[100]}>
            Atheletes Data
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add New Athelete
          </Button>
        </Box>
        {open && (
          <AthleteModel open={open} setOpen={setOpen} url={URL} title={"Add"} />
        )}
        {openUpdateConfirmation && (
          <AthleteModel
            open={openUpdateConfirmation}
            setOpen={setOpenUpdateConfirmation}
            url={URL}
            updateRow={updateRow}
            title={"Update"}
          />
        )}
        <DataGriTable
          rows={rows}
          columns={columns}
          url={URL}
          slots={{
            toolbar: CustomToolbar,
            loadingOverlay: LinearProgress,
          }}
          openDeleteConfirmation={openDeleteConfirmation}
          deleteRow={deleteRow}
          setOpenDeleteConfirmation={setOpenDeleteConfirmation}
          rowCountState={rowCountState}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          filterModel={filterModel as GridFilterModel}
          setFilterModel={
            setFilterModel as React.Dispatch<
              React.SetStateAction<GridFilterModel>
            >
          }
          sortModel={sortModel as GridSortModel}
          setSortModel={
            setSortModel as React.Dispatch<React.SetStateAction<GridSortModel>>
          }
        />
      </Paper>
    </Box>
  );
};

export default Athletes;
