import React, { useState, useEffect, HtmlHTMLAttributes } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import { toast } from "react-toastify";
import { getGender } from "../../services/publicDataServices";
import useErrorHandling from "../../hooks/use-errorHandeler";
import useHttp from "../../hooks/use-http";
import { Gender } from "../../types/modal";

type FormValues = {
  id: number;
  name: string;
  gender_id: number;
  [key: string]: number | string;
};
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
  updateRow?: any; // give appropriate type
  title: string;
};

const AthleteModel: React.FC<Props> = ({
  open,
  setOpen,
  url,
  updateRow,
  title,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    id: updateRow?.id ?? null,
    name: updateRow?.name ?? "",
    gender_id: updateRow?.gender_id?.id ?? null,
  });
  const { createData, updateData } = useHttp({ url });
  const [genderData, setGenderData] = useState<Gender[]>([]);
  const { handleError } = useErrorHandling();

  const handleSave = async () => {
    if (updateRow) {
      if (validateForm()) {
        const id = formValues.id;
        const params = {
          name: formValues.name,
          gender_id: formValues.gender_id,
        };
        updateData(id, params);
        setOpen(false);
      }
    } else {
      if (validateForm()) {
        createData(formValues);
        setOpen(false);
      }
    }
  };

  const getGenderById = async () => {
    try {
      const response = await getGender({ id: formValues.gender_id });
      const data = response.data;
      setGenderData(data.data);
      console.log(data.data);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    if (formValues.gender_id !== null) {
      getGenderById();
    }
  }, []);
  const validateForm = () => {
    for (const key in formValues) {
      if (formValues[key] === "" && key !== "id") {
        toast.warning("Please fill in all required fields.", {
          toastId: "formValidation",
        });
        return false;
      }
    }
    return true;
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const genderDataHandler = async (value: string) => {
    try {
      const response = await getGender({ name: value });
      const data = response.data;
      setGenderData(data.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title} Athlete</DialogTitle>
        <DialogContent sx={{ width: "500px" }}>
          <DialogContentText>{title} a Record</DialogContentText>
          <InputLabel htmlFor="name" required>
            Name
          </InputLabel>
          <TextField
            id="name"
            autoFocus
            margin="dense"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.name || ""}
            onChange={handleFieldChange}
          />
          <InputLabel htmlFor="gender_id" required>
            Gender
          </InputLabel>
          <Autocomplete
            options={genderData}
            getOptionLabel={(option) => option.name}
            id="gender_id"
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            onChange={(event, newValue) => {
              const simulatedEvent = {
                target: {
                  name: "gender_id",
                  value: newValue ? newValue.id.toString() : "",
                },
              };
              handleFieldChange(
                simulatedEvent as React.ChangeEvent<HTMLInputElement>
              );
            }}
            onInputChange={(event, value) => {
              if (value) {
                genderDataHandler(value);
              } else {
                setGenderData([]);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                id="gender_id"
                name="gender_id"
                placeholder={genderData.length > 0 ? genderData[0].name : ""}
                variant="standard"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AthleteModel;
