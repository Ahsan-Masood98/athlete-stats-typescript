import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import useHttp from "../../hooks/use-http";

// type that enforces 'id' property and allows other properties
type DataItemWithId<T> = { id: number } & T;

type Props<T> = {
  openDeleteConfirmation: boolean;
  handleDeleteConfirmationClose: () => void;
  deleteRow: DataItemWithId<T> | null; // Use DataItemWithId type here
  url: string;
};

const DeleteModal = <T,>({
  openDeleteConfirmation,
  handleDeleteConfirmationClose,
  deleteRow,
  url,
}: Props<T>) => {
  const { deleteData } = useHttp({ url });
  return (
    <>
      <Dialog
        open={openDeleteConfirmation || false}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the <strong>Record</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (deleteRow) {
                deleteData(deleteRow.id);
                alert(console.log({ deleteRow }));
              }
            }}
            color="primary"
          >
            <span onClick={handleDeleteConfirmationClose}>Delete</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
