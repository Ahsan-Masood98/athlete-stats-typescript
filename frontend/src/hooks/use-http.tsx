import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useErrorHandling from "./use-errorHandeler";
import { getAuthToken } from "../services/auth";
import {
  GridFilterModel,
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";

// isLoading,
// setIsLoading,
// getData,
// getSpecificRowData,
// createData,
// updateData,
// deleteData,
// customData,

const useHttp = <T,>(props: {
  url: string;
  paginationModel?: { page: number; pageSize: number };
  setRowData?: React.Dispatch<React.SetStateAction<T>>;
  setRowCountState?: React.Dispatch<React.SetStateAction<number>>;
  setPaginationModel?: (pagination: GridPaginationModel) => void;
  setFilterModel?: (filterModel: GridFilterModel) => void;
  setSortModel?: (sortModel: GridSortModel) => void;
}): {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getData: () => Promise<void>;
  getSpecificRowData: (params: any) => Promise<void>;
  createData: (params: any) => Promise<void>;
  updateData: (id: number, params: any) => Promise<void>;
  deleteData: (id: number) => Promise<void>;
  customData: any;
} => {
  const {
    url,
    paginationModel,
    setRowData,
    setRowCountState,
    setPaginationModel,
    setFilterModel,
    setSortModel,
  } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [customData, setCustomData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleError: handleErrorResponse } = useErrorHandling();
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const hasQueryParams = params.keys().next().done === false;
    const page = paginationModel?.page || 0;
    const page_size = paginationModel?.pageSize || 10;

    if (!hasQueryParams) {
      // Params has query parameters
      const param = new URLSearchParams({
        page: page.toString(),
        page_size: page_size.toString(),
      });
      navigate(`?${param.toString()}`, { replace: true });
    }

    // Construct the sort object
    const sortField = params.get("sort[0][field]");
    const sortDirectionString = params.get("sort[0][sort]");
    const sortDirection: GridSortDirection =
      sortDirectionString === "asc" || sortDirectionString === "desc"
        ? sortDirectionString
        : null;
    const sort =
      sortField && sortDirection
        ? [{ field: sortField, sort: sortDirection }]
        : [];

    // Construct the filter object
    const filterField = params.get("filter[0][field]");
    const filterOperator = params.get("filter[0][operator]");
    const filterValue = params.get("filter[0][value]");
    const filter =
      filterField && filterOperator && filterValue
        ? {
            field: filterField,
            operator: filterOperator,
            value: filterValue,
          }
        : null;
    if (setFilterModel) {
      setFilterModel({ items: filter ? [filter] : [] });
    }
    if (setPaginationModel) {
      setPaginationModel({
        page: parseInt(params.get("page") || page.toString()),
        pageSize: parseInt(params.get("page_size") || page_size.toString()),
      });
    }
    if (setSortModel) {
      setSortModel(sort);
    }

    return {
      page: parseInt(params.get("page") || page.toString()) + 1,
      page_size: parseInt(params.get("page_size") || page_size.toString()),
      sort,
      filter: [filter],
    };
  };
  const addInQueryPrams = (method: string) => {
    const queryParams = new URLSearchParams(location.search);
    const existingMethod = queryParams.get("method");
    if (existingMethod === method) {
      // Increment the number if the method already exists
      let count = 1;
      while (queryParams.has(`${method}${count}`)) {
        count++;
      }
      queryParams.set("method", `${method}${count}`);
    } else {
      // Set the method if it doesn't exist
      queryParams.set("method", method);
    }
    const updatedParams = queryParams.toString();
    navigate(`?${updatedParams}`, { replace: true });
  };

  const getData = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          ...getQueryParams(),
        },
        headers: {
          Authorization: "Bearer " + getAuthToken(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response?.data;
      if (setRowData) {
        setRowData(data.data.data);
      }
      if (setRowCountState) {
        setRowCountState(parseInt(data.data.total));
      }
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getSpecificRowData = async (params: any) => {
    try {
      const response = await axios.get(url, {
        params: {
          ...getQueryParams(),
          ...params,
        },
        headers: {
          Authorization: "Bearer " + getAuthToken(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = response?.data;
      if (setRowData) {
        setRowData(data.data.data);
      }
      setCustomData(data.custom_data);
      if (setRowCountState) {
        setRowCountState(data.data.meta.total);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          if (setRowData) {
            setRowData([] as T);
          }
        } else {
          handleErrorResponse(error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const createData = async (params: any) => {
    try {
      const response = await axios.post(
        url,
        { ...params },
        {
          headers: {
            Authorization: "Bearer " + getAuthToken(),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      addInQueryPrams("add");
    } catch (error) {
      handleErrorResponse(error);
    }
  };
  const updateData = async (id: number, param: any) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        url + "/" + id,
        { ...param },
        {
          headers: {
            Authorization: "Bearer " + getAuthToken(),
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      addInQueryPrams("update");
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteData = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(url + "/" + id, {
        headers: {
          Authorization: "Bearer " + getAuthToken(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message);
      addInQueryPrams("delete");
    } catch (error) {
      handleErrorResponse(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    setIsLoading,
    getData,
    getSpecificRowData,
    createData,
    updateData,
    deleteData,
    customData,
  };
};
export default useHttp;
