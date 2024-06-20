import { AppContext } from "@/context/AppContext";
import { ProjectToUpdate } from "@/types/typesForApp";
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
import { useContext, useEffect, useState } from "react";
import AlertForUpdateData from "./AlertForUpdateData";

interface Props {
  idToEdit: number | undefined;
  openForEdit: boolean;
  setOpenForEdit: (value: boolean) => void;
}

const defaultProjectData = {
  siteName: "",
  siteAddress: "",
  date: "",
  totalPrice: 0,
};

const EditProject = ({ idToEdit, openForEdit, setOpenForEdit }: Props) => {
  const { data, setData, updateProject } = useContext(AppContext);
  const [projectData, setProjectData] =
    useState<ProjectToUpdate>(defaultProjectData);
  const [value, setValue] = useState<Dayjs | null>();
  const currentProjectData = data.projects.find((item) => item.id === idToEdit);
  const [openForUpdateAlert, setOpenForUpdateAlert] = useState(false);
  useEffect(() => {
    if (currentProjectData) {
      setProjectData({
        siteName: currentProjectData?.siteName,
        siteAddress: currentProjectData?.siteAddress,
        date: currentProjectData?.date,
        totalPrice: currentProjectData?.totalPrice,
      });
    }
  }, [currentProjectData]);

  const handleUpdateProject = async () => {
    const response = await fetch(`${config.apiBaseUrl}/project`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idToEdit: idToEdit,
        projectData,
      }),
    });
    const { updatedProjectId } = await response.json();
    //setData({ ...data, projects: projectsData });
    updateProject(idToEdit as number, projectData);
    setProjectData(defaultProjectData);
    setOpenForEdit(false);
    setOpenForUpdateAlert(true);
  };

  return (
    <Box>
      <Dialog open={openForEdit} onClose={() => setOpenForEdit(false)}>
        <DialogTitle sx={{ ml: { xs: 2, sm: 0 } }}>Update Project</DialogTitle>
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
              value={dayjs(projectData.date)}
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
              value={projectData.siteName}
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
              value={projectData.siteAddress}
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
              value={projectData.totalPrice === 0 ? "" : projectData.totalPrice}
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
              onClick={() => setOpenForEdit(false)}
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
              onClick={handleUpdateProject}
              sx={{ mr: { xs: 3 } }}
            >
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <AlertForUpdateData
        openForUpdateAlert={openForUpdateAlert}
        setOpenForUpdateAlert={setOpenForUpdateAlert}
        msg="project data"
      />
    </Box>
  );
};
export default EditProject;
