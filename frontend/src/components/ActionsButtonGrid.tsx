import { Box, Button, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme/theme";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditNoteTwoToneIcon from "@mui/icons-material/EditNoteTwoTone";

const ActionsButtonGrid = <T,>(props: {
  setDeleteRow: React.Dispatch<React.SetStateAction<T>>;
  setOpenDeleteConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateRow: React.Dispatch<React.SetStateAction<T>>;
  setOpenUpdateConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  row: T;
  notDeleteRow?: boolean;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    setDeleteRow,
    setOpenDeleteConfirmation,
    setUpdateRow,
    setOpenUpdateConfirmation,
    row,
    notDeleteRow,
  } = props;
  const handleDeleteConfirmationOpen = () => {
    setDeleteRow(row);
    setOpenDeleteConfirmation(true);
  };

  const handleUpdateConfirmationOpen = () => {
    setUpdateRow(row);
    setOpenUpdateConfirmation(true);
  };

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"space-around"}>
      {!notDeleteRow && (
        <Button
          variant="contained"
          onClick={() => handleDeleteConfirmationOpen()}
          sx={{
            backgroundColor: colors.danger[600],
            "&:hover": {
              backgroundColor: colors.danger[600],
            },
            width: "40%",
          }}
        >
          <DeleteTwoToneIcon />
        </Button>
      )}
      <Button
        variant="contained"
        onClick={() => handleUpdateConfirmationOpen()}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
          width: "40%",
        }}
      >
        <EditNoteTwoToneIcon />
      </Button>
    </Box>
  );
};

export default ActionsButtonGrid;
