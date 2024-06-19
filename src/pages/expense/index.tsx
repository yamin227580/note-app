import AlertForDeleteData from "@/components/AlertForDeleteData";
import CreatExpense from "@/components/CreateExpense";
import EditExpense from "@/components/EditExpense";
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

const ExpensePage = () => {
  const [open, setOpen] = useState(false);
  const { data, setData } = useContext(AppContext);
  let count: number = 1;
  const [openForDelete, setOpenForDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();
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

  const handleDelete = async () => {
    try {
      if (idToDelete) {
        const response = await fetch(
          `${config.apiBaseUrl}/expense?id=${idToDelete}`,
          {
            method: "DELETE",
            headers: { "content-type": "application/json" },
          }
        );
        const { expensesData } = await response.json();
        setData({ ...data, expenses: expensesData });
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
      <MenuBar activeSectionValue="expense" />
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
            Create Expense
          </Button>
        </Box>
        <CreatExpense open={open} setOpen={setOpen} />
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
            {data.expenses.length > 0 && (
              <TableContainer
                component={Paper}
                sx={{
                  width: { xs: "95vw", sm: 700 },
                }}
              >
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ marginLeft: { xs: -1, sm: 0 } }}>No</Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>Date</Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>
                          Site Name
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ marginLeft: { xs: -3, sm: 0 } }}>
                          Labor Type
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: 12 }}>
                        <Box sx={{ marginLeft: { xs: -2, sm: 0 } }}>Number</Box>
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.expenses.map((item) => (
                      <StyledTableRow key={item.id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -1, sm: 0 },
                              fontSize: { xs: 10, sm: 12 },
                            }}
                          >
                            {count++}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -3, sm: 0 },
                              fontSize: { xs: 10, sm: 12 },
                              width: { xs: 55, sm: 80 },
                            }}
                          >
                            {`${item.date.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -3, sm: 0 },
                              fontSize: { xs: 10, sm: 12 },
                              width: { xs: 75, sm: 80 },
                            }}
                          >
                            {`${item.siteName.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -3, sm: 0 },
                              fontSize: { xs: 10, sm: 12 },
                              width: { xs: 50, sm: 80 },
                            }}
                          >
                            {`${item.laborType.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px" }}
                        >
                          <Box
                            sx={{
                              marginLeft: { xs: -1, sm: 0 },
                              fontSize: { xs: 10, sm: 12 },
                            }}
                          >
                            {`${item.number.toLocaleString()}`}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Box sx={{ marginLeft: { xs: -4, sm: 0 } }}>
                            <EditIcon
                              sx={{
                                fontSize: { xs: 16, sm: 28 },
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setIdToEdit(item.id);
                                setOpenForEdit(true);
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <Box
                            sx={{
                              marginLeft: { xs: -4, sm: 0 },
                            }}
                          >
                            <DeleteIcon
                              sx={{
                                fontSize: { xs: 16, sm: 28 },
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
        <EditExpense
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
          msg="expense data"
        />
      </Box>
    </Box>
  );
};
export default ExpensePage;
