import { AppContext } from "@/context/AppContext";
import { CreateProjectPayload } from "@/types/typesForApp";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import AlertForCreateData from "./AlertForCreateData";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultProjectData = {
  siteName: "",
  siteAddress: "",
  date: "",
  totalPrice: 0,
};
const CreatProject = ({ open, setOpen }: Props) => {
  const [projectData, setProjectData] =
    useState<CreateProjectPayload>(defaultProjectData);
  const { addProject } = useContext(AppContext);
  const [value, setValue] = useState<Dayjs | null>();
  const [openForCreate, setOpenForCreate] = useState(false);

  const handleCreateProject = async () => {
    if (projectData) {
      const response = await fetch(`${config.apiBaseUrl}/project`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(projectData),
      });
      const { projectsData } = await response.json();
      addProject(projectsData);
      setOpen(false);
      setProjectData(defaultProjectData);
      setValue(null);
      setOpenForCreate(true);
    }
  };

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent sx={{ width: { xs: 300, sm: 400 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <DatePicker
              sx={{ width: { xs: 230, sm: 350 }, mt: 1 }}
              label="ရက်စွဲရွေးပါ"
              format="YYYY-MM-DD"
              value={value}
              onChange={(newValue) => {
                // Extract only YYYY-MM-DD from the date object
                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                setProjectData({ ...projectData, date: formattedDate });
                // Do something with the formatted date
                console.log("Formatted date:", formattedDate);
                // Set the value in your state
                setValue(newValue);
              }}
            />

            <TextField
              sx={{
                width: { xs: "90%", sm: "100%" },
                mb: 4,
                mt: 4,
              }}
              placeholder="site name"
              onChange={(evt) =>
                setProjectData({
                  ...projectData,
                  siteName: evt.target.value,
                })
              }
            />
            <TextField
              sx={{
                width: { xs: "90%", sm: "100%" },
                mb: 4,
              }}
              placeholder="site address"
              onChange={(evt) =>
                setProjectData({
                  ...projectData,
                  siteAddress: evt.target.value,
                })
              }
            />
            <TextField
              sx={{
                width: { xs: "90%", sm: "100%" },
                mb: 4,
              }}
              placeholder="total price"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={(evt) => {
                const inputValue = Number(evt.target.value);
                if (!isNaN(inputValue)) {
                  setProjectData({
                    ...projectData,
                    totalPrice: Number(inputValue),
                  });
                }
              }}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={
                !projectData.siteAddress ||
                !projectData.siteName ||
                !projectData.date ||
                !projectData.totalPrice
              }
              onClick={handleCreateProject}
              sx={{ mr: { xs: 3 } }}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertForCreateData
        openForCreate={openForCreate}
        setOpenForCreate={setOpenForCreate}
        msg="new project"
      />
    </Box>
  );
};
export default CreatProject;
