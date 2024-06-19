import AlertForDeleteData from "@/components/AlertForDeleteData";
import CreateProject from "@/components/CreateProject";
import EditProject from "@/components/EditProject";
import MenuBar from "@/components/MenuBar";
import { AppContext } from "@/context/AppContext";
import { expenseDataBySiteType } from "@/types/typesForApp";
import { config } from "@/utils/config";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

interface siteNameWithTotalType {
  [key: string]: number;
}

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const { data, setData, filterBySite } = useContext(AppContext);
  const [idToDelete, setIdToDelete] = useState<number>();
  const [openForDelete, setOpenForDelete] = useState(false);
  const siteNameArray = data.projects
    ? data.projects.map((item) => item.siteName)
    : [];
  const [siteNameWithTotal, setSiteNameWithTotal] =
    useState<siteNameWithTotalType>({});
  const [isInitialRender, setIsInitialRender] = useState(true);
  let count: number = 1;
  const [openForEdit, setOpenForEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number>();
  const [openForDeleteAlert, setOpenForDeleteAlert] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  useEffect(() => {
    if (
      isInitialRender &&
      data.projects &&
      data.projects.length > 0 &&
      data.expenses &&
      data.labors
    ) {
      const updatedSiteNameWithTotal: siteNameWithTotalType = {};

      siteNameArray.forEach((name) => {
        const expenseDataWithTotal = filterBySite(name);
        const totalPrice = Number(
          expenseDataWithTotal.find(
            (item: expenseDataBySiteType) => item.siteName === name
          )?.totalPrice || 0
        );
        updatedSiteNameWithTotal[name] = totalPrice;
      });

      setSiteNameWithTotal(updatedSiteNameWithTotal);
      setIsInitialRender(false);
    }
  }, [data]);

  const handleDelete = async () => {
    try {
      if (idToDelete) {
        const response = await fetch(
          `${config.apiBaseUrl}/project?id=${idToDelete}`,
          {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          }
        );
        const { projectsData } = await response.json();
        setData({ ...data, projects: projectsData });
        setOpenForDelete(false);
        setOpenForDeleteAlert(true);
      }
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    }
  };

  const handleClose = () => {
    setOpenForDelete(false);
  };

  return (
    <Box>
      <MenuBar activeSectionValue="project" />
      <Box
        sx={{
          backgroundColor: data.isLightTheme ? "white" : "secondary.main",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            sx={{ mt: 3, mr: 4 }}
            onClick={() => setOpen(true)}
          >
            Create Project
          </Button>
        </Box>
        <CreateProject open={open} setOpen={setOpen} />
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40%",
              margin: "0 auto",
              mt: 5,
            }}
          >
            {data.projects.length > 0 && (
              <TableContainer
                component={Paper}
                sx={{
                  width: { xs: "100vw", sm: 800 },
                }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -1.7, sm: 0 } }}>No</Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>Date</Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -4, sm: 0 } }}>
                          Site Name
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>
                          Site Address
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>Total</Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -2, sm: 0 } }}>
                          Expense
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: { xs: 10, sm: 12 } }}>
                        <Box sx={{ marginLeft: { xs: -2, sm: 0 } }}>Remain</Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        <span></span>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <span></span>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.projects.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "10px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -1.8, sm: 0 },
                              fontSize: { xs: 9, sm: 12 },
                            }}
                          >
                            {count++}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Box
                            sx={{
                              marginLeft: { xs: -4.5, sm: 0 },
                              width: { xs: 48, sm: 80 },
                              fontSize: { xs: 8.5, sm: 12 },
                              fontStyle: "italic",
                            }}
                          >
                            {`${item.date.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "10px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -4, sm: 0 },
                              width: { xs: 45, sm: 80 },
                              fontSize: { xs: 10, sm: 12 },
                            }}
                          >
                            {`${item.siteName.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "10px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -3, sm: 0 },
                              width: { xs: 48, sm: 80 },
                              fontSize: { xs: 10, sm: 12 },
                            }}
                          >
                            {`${item.siteAddress.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "9.5px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -3.5, sm: 0 },
                              width: { xs: 35 },
                              fontSize: { xs: 9.5, sm: 12 },
                            }}
                          >
                            {`${item.totalPrice.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>

                        {siteNameWithTotal[item.siteName] ? (
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "9.5px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -2, sm: 0 },
                                width: { xs: 35 },
                                fontSize: { xs: 9.5, sm: 12 },
                              }}
                            >
                              {Number(
                                siteNameWithTotal[item.siteName]
                              ).toLocaleString()}
                            </Box>
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "9.5px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -2, sm: 0 },
                                width: { xs: 35 },
                                fontSize: { xs: 9.5, sm: 12 },
                              }}
                            >
                              {`0`}
                            </Box>
                          </StyledTableCell>
                        )}

                        {siteNameWithTotal[item.siteName] ? (
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "9.5px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -2, sm: 0 },
                                width: { xs: 35 },
                                fontWeight: "bold",
                                fontSize: { xs: 9.5, sm: 12 },
                              }}
                            >
                              {`${(
                                item.totalPrice -
                                siteNameWithTotal[item.siteName]
                              ).toLocaleString()}`}
                            </Box>
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "9.5px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -2, sm: 0 },
                                width: { xs: 35 },
                                fontSize: { xs: 9.5, sm: 12 },
                              }}
                            >
                              {`${item.totalPrice.toLocaleString()}`}
                            </Box>
                          </StyledTableCell>
                        )}
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: { xs: 6, sm: 10 },
                            cursor: "pointer",
                          }}
                        >
                          <Box sx={{ marginLeft: { xs: -2.5, sm: 0 } }}>
                            <EditIcon
                              sx={{
                                fontSize: { xs: 15, sm: 28 },
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setIdToEdit(item.id);
                                setOpenForEdit(true);
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{
                            fontSize: { xs: 6, sm: 10 },
                            cursor: "pointer",
                          }}
                        >
                          <Box sx={{ marginLeft: { xs: -3.8, sm: 0 } }}>
                            <DeleteIcon
                              sx={{
                                fontSize: { xs: 15, sm: 28 },
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setIdToDelete(item.id);
                                setOpenForDelete(true);
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
        <EditProject
          idToEdit={idToEdit}
          openForEdit={openForEdit}
          setOpenForEdit={setOpenForEdit}
        />
        <Dialog open={openForDelete} onClose={handleClose}>
          <DialogContent sx={{ width: 300 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mb: 3,
                mt: 2,
              }}
            >
              <Typography> Are you sure to delete?</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained">
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        <AlertForDeleteData
          openForDeleteAlert={openForDeleteAlert}
          setOpenForDeleteAlert={setOpenForDeleteAlert}
          msg="project data"
        />
      </Box>
    </Box>
  );
};
export default ProjectPage;
