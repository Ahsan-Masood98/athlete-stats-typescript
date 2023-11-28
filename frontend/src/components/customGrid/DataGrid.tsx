import React from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import DeleteModal from "../modals/DeleteModal";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use-http";

type Filtering = {
  field: string;
  value?: any;
  operator: string;
}[];
// type that enforces 'id' property and allows other properties
type DataItemWithId<T> = { id: number } & T;

interface DataGriTableProps<T> {
  columns: GridColDef[];
  rows: any; // Provide the appropriate type here
  openDeleteConfirmation?: boolean;
  deleteRow: DataItemWithId<T> | null;
  setOpenDeleteConfirmation?: React.Dispatch<React.SetStateAction<boolean>>;
  // columnVisibilityModel?: any; // Provide the appropriate type here
  rowCountState: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
  filterModel: GridFilterModel;
  setFilterModel: React.Dispatch<React.SetStateAction<GridFilterModel>>;
  sortModel: GridSortModel;
  setSortModel: React.Dispatch<React.SetStateAction<GridSortModel>>;
  slots: any; // Provide the appropriate type here
  url: string;
}

const DataGriTable = <T,>({
  columns,
  rows,
  openDeleteConfirmation,
  deleteRow,
  setOpenDeleteConfirmation,
  // columnVisibilityModel,
  rowCountState,
  paginationModel,
  setPaginationModel,
  filterModel,
  setFilterModel,
  sortModel,
  setSortModel,
  slots,
  url,
}: DataGriTableProps<T>) => {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useHttp({ url });
  // Pagination Funtionality
  const handlePaginationModelChange = async (
    newPaginationModel: GridPaginationModel
  ) => {
    setIsLoading(true);
    const { page, pageSize } = newPaginationModel;
    let sorting = [] as GridSortModel;
    let filtering = [] as Filtering;
    if (sortModel?.length > 0) {
      const { field, sort } = sortModel[0];
      sorting = [
        {
          field: field,
          sort: sort,
        },
      ];
    }
    if (filterModel?.items.length > 0) {
      const { field: fieldName, operator, value } = filterModel.items[0];
      if (value !== undefined) {
        filtering = [
          {
            field: fieldName,
            operator: operator,
            value: value,
          },
        ];
      }
    }
    setPaginationModel({
      page,
      pageSize,
    });
    queryParameters(filtering, sorting, page, pageSize);
  };
  // Sorting Funtionality
  const handleSortModelChange = async (newSortModel: GridSortModel) => {
    setIsLoading(true);
    setSortModel(newSortModel);
    const { page, pageSize } = paginationModel;
    let sorting = [] as GridSortModel;
    if (newSortModel.length > 0) {
      const { field, sort } = newSortModel[0];
      sorting = [
        {
          field: field,
          sort: sort,
        },
      ];
    }
    let filtering = [] as Filtering;
    if (filterModel.items.length > 0) {
      const { field: fieldName, operator, value } = filterModel.items[0];
      if (value !== undefined) {
        filtering = [
          {
            field: fieldName,
            operator: operator,
            value: value,
          },
        ];
      }
    }
    queryParameters(filtering, sorting, page, pageSize);
  };
  // Filtering Functionality
  const handleFilterModelChange = async (newFilterModel: GridFilterModel) => {
    setIsLoading(true);
    setFilterModel(newFilterModel);
    const { page, pageSize } = paginationModel;
    let sorting = [] as GridSortModel;
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      sorting = [
        {
          field: field,
          sort: sort,
        },
      ];
    }
    let filtering = [] as Filtering;
    if (newFilterModel.items.length > 0) {
      const { field, operator, value } = newFilterModel.items[0];
      if (value !== undefined) {
        filtering = [
          {
            field: field,
            operator: operator,
            value: value,
          },
        ];
      }
    }
    queryParameters(filtering, sorting, page, pageSize);
  };
  const queryParameters = (
    filtering: Filtering,
    sorting: GridSortModel,
    page: number,
    pageSize: number
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    });
    if (sorting.length > 0) {
      params.append("sort[0][field]", sorting[0].field);
      params.append("sort[0][sort]", sorting[0].sort ?? "");
    }
    if (filtering.length > 0 && filtering[0].value !== undefined) {
      params.append("filter[0][field]", filtering[0].field);
      params.append("filter[0][operator]", filtering[0].operator);
      params.append("filter[0][value]", filtering[0].value);
    }
    navigate(`?${params.toString()}`, { replace: true });
    setIsLoading(false);
  };
  const handleDeleteConfirmationClose = () => {
    if (setOpenDeleteConfirmation) {
      setOpenDeleteConfirmation(false);
    }
  };
  return (
    <>
      <Box p={2}>
        <DataGrid
          columns={columns}
          // columnVisibilityModel={columnVisibilityModel}
          rows={rows}
          rowCount={rowCountState}
          slots={slots}
          autoHeight={true}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          sortModel={sortModel}
          filterMode="server"
          onFilterModelChange={handleFilterModelChange}
          filterModel={filterModel}
          loading={isLoading}
          paginationMode="server"
          pageSizeOptions={[10, 20, 30]}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
        />
        {/*On Delete Dailog Implementaion*/}
        <DeleteModal
          url={url}
          openDeleteConfirmation={openDeleteConfirmation || false}
          handleDeleteConfirmationClose={handleDeleteConfirmationClose}
          deleteRow={deleteRow}
        />
      </Box>
    </>
  );
};

export default DataGriTable;
