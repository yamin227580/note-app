import { AppContext } from "@/context/AppContext";
import { CreateLaborPayload } from "@/types/typesForApp";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultLaborData = {
  laborType: "",
  price: 0,
};
const CreatLabor = ({ open, setOpen }: Props) => {
  const [laborData, setLaborData] =
    useState<CreateLaborPayload>(defaultLaborData);
  const { addLabor } = useContext(AppContext);

  const handleCreateLabor = async () => {
    if (laborData.laborType && laborData.price) {
      const response = await fetch(`${config.apiBaseUrl}/labor`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(laborData),
      });
      const { laborsData } = await response.json();
      addLabor(laborsData);
      setOpen(false);
      setLaborData(defaultLaborData);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Labor</DialogTitle>
        <DialogContent sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              sx={{ width: "100%", mb: 4 }}
              placeholder="labor type"
              onChange={(evt) =>
                setLaborData({
                  ...laborData,
                  laborType: evt.target.value,
                })
              }
            />
            <TextField
              sx={{ width: "100%", mb: 4 }}
              placeholder="price"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(evt) => {
                const inputValue = Number(evt.target.value);
                if (!isNaN(inputValue)) {
                  setLaborData({ ...laborData, price: Number(inputValue) });
                }
              }}
            />
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!laborData.laborType || !laborData.price}
              onClick={handleCreateLabor}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default CreatLabor;
