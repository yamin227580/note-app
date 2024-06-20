import { AppContext } from "@/context/AppContext";
import { LaborToUpdate } from "@/types/typesForApp";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AlertForUpdateData from "./AlertForUpdateData";

interface Props {
  idToEdit: number | undefined;
  openForEdit: boolean;
  setOpenForEdit: (value: boolean) => void;
}

const defaultLaborData = {
  laborType: "",
  price: 0,
};

const EditLabor = ({ idToEdit, openForEdit, setOpenForEdit }: Props) => {
  const { data, setData, updateLabor } = useContext(AppContext);
  const [laborData, setLaborData] = useState<LaborToUpdate>(defaultLaborData);
  const currentLaborData = data.labors.find((item) => item.id === idToEdit);
  const [openForUpdateAlert, setOpenForUpdateAlert] = useState(false);

  useEffect(() => {
    if (currentLaborData) {
      setLaborData({
        laborType: currentLaborData?.laborType,
        price: currentLaborData?.price,
      });
    }
  }, [currentLaborData]);

  const handleUpdateLabor = async () => {
    const response = await fetch(`${config.apiBaseUrl}/labor`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idToEdit: idToEdit,
        laborData,
      }),
    });
    const { updatedLaborId } = await response.json();
    //setData({ ...data, labors: laborsData });
    updateLabor(idToEdit as number, laborData);
    setLaborData(defaultLaborData);
    setOpenForEdit(false);
    setOpenForUpdateAlert(true);
  };

  return (
    <Box>
      <Dialog open={openForEdit} onClose={() => setOpenForEdit(false)}>
        <DialogTitle>Edit Labor</DialogTitle>
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
              value={laborData.laborType}
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
              value={laborData.price === 0 ? "" : laborData.price}
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
              onClick={() => setOpenForEdit(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!laborData.laborType || !laborData.price}
              onClick={handleUpdateLabor}
            >
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertForUpdateData
        openForUpdateAlert={openForUpdateAlert}
        setOpenForUpdateAlert={setOpenForUpdateAlert}
        msg="labor data"
      />
    </Box>
  );
};
export default EditLabor;
