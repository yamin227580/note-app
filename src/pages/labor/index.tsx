import AlertForDeleteData from "@/components/AlertForDeleteData";
import CreateLabor from "@/components/CreateLabor";
import EditLabor from "@/components/EditLabor";
import MenuBar from "@/components/MenuBar";
import { AppContext } from "@/context/AppContext";
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
import { useContext, useState } from "react";

const LaborPage = () => {
  const [open, setOpen] = useState(false);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();
  const [openForEdit, setOpenForEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number>();
  const { data, setData } = useContext(AppContext);
  const [openForDeleteAlert, setOpenForDeleteAlert] = useState(false);

  let count: number = 1;

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

  const handleDelete = async () => {
    try {
      if (idToDelete) {
        const response = await fetch(
          `${config.apiBaseUrl}/labor?id=${idToDelete}`,
          {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          }
        );
        const { laborsData } = await response.json();
        setData({ ...data, labors: laborsData });
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
      <MenuBar activeSectionValue="labor" />
      <Box
        sx={{
          backgroundColor: data.isLightTheme ? "white" : "secondary.main",
          width: "100vw",
          height: "100vh",
          zIndex: 40,
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
            Create Labor
          </Button>
        </Box>
        <CreateLabor open={open} setOpen={setOpen} />
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
            {data.labors.length > 0 && (
              <TableContainer
                component={Paper}
                sx={{
                  width: { xs: "99vw", sm: 600 },
                  // margin: "0 auto",
                }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        No
                      </StyledTableCell>

                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ fontSize: 12, marginLeft: { sm: 15 } }}>
                          Labor Type
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ fontSize: 12, marginLeft: { sm: 15 } }}>
                          Labor Price
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.labors.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          {count++}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box sx={{ fontSize: 12, marginLeft: { sm: 15 } }}>
                            {`${item.laborType.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                          sx={{ fontSize: 12 }}
                        >
                          <Box sx={{ fontSize: 12, marginLeft: { sm: 15 } }}>
                            {`${item.price.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                          sx={{ fontSize: 12, cursor: "pointer" }}
                        >
                          <EditIcon
                            onClick={() => {
                              setIdToEdit(item.id);
                              setOpenForEdit(true);
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                          sx={{ fontSize: 12, cursor: "pointer" }}
                        >
                          <DeleteIcon
                            onClick={() => {
                              setIdToDelete(item.id);
                              setOpenForDelete(true);
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
        <EditLabor
          idToEdit={idToEdit}
          openForEdit={openForEdit}
          setOpenForEdit={setOpenForEdit}
        />
        <Dialog open={openForDelete} onClose={handleClose}>
          <DialogContent sx={{ width: 260 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mb: 3,
                mt: 2,
              }}
            >
              <Typography sx={{ fontSize: 13 }}>
                {" "}
                Are you sure to delete?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                fontSize: 10,
              }}
            >
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="contained">
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
      <AlertForDeleteData
        openForDeleteAlert={openForDeleteAlert}
        setOpenForDeleteAlert={setOpenForDeleteAlert}
        msg="labor data"
      />
    </Box>
  );
};
export default LaborPage;
