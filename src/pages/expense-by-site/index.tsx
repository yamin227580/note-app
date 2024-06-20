import AlertForNotExitData from "@/components/AlertForNotExitData";
import MenuBar from "@/components/MenuBar";
import { AppContext } from "@/context/AppContext";
import { expenseDataBySiteType } from "@/types/typesForApp";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
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

const ExpenseBySite = () => {
  const { data, filterBySite } = useContext(AppContext);
  const [siteName, setSiteName] = useState<string>("");
  const [expenseData, setExpenseData] = useState<expenseDataBySiteType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openForAlert, setOpenForAlert] = useState<boolean>(false);
  let count: number = 1;

  const handleOnChangeSiteName = (evt: SelectChangeEvent<string>) => {
    setSiteName(evt.target.value);
    filterBySite(evt.target.value);
    if (expenseData.length === 0) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (data.expensesDataBySiteWithTotal) {
      setExpenseData(data.expensesDataBySiteWithTotal);
    }
    if (data.projects.length === 0) {
      setOpenForAlert(true);
    }
    return () => {
      data.expensesDataBySiteWithTotal = [];
    };
  }, [data.expensesDataBySiteWithTotal]);

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

  return (
    <Box>
      <MenuBar activeSectionValue="expense-by-site" />
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
            mr: 4,
          }}
        >
          <FormControl
            fullWidth
            sx={{
              width: { xs: "60%", sm: "20%" },
              mt: 2,
            }}
          >
            <InputLabel
              sx={{
                color: data.isLightTheme ? "black" : "info.main",
              }}
            >
              Choose Site
            </InputLabel>
            <Select
              value={siteName}
              label="Choose SiteName"
              onChange={handleOnChangeSiteName}
              sx={{
                color: data.isLightTheme ? "black" : "info.main",
              }}
            >
              {data.projects.map((item) => (
                <MenuItem key={item.id} value={item.siteName}>
                  <ListItemText primary={item.siteName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {expenseData.length ? (
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
              {expenseData.length > 0 && (
                <Box
                  sx={{
                    width: "100%",
                    color: data.isLightTheme ? "black" : "info.main",
                  }}
                >
                  <Typography
                    sx={{
                      mb: 2,
                      ml: { xs: -12, sm: 3 },
                      fontWeight: "bold",
                    }}
                  >
                    {`Site Name : ${expenseData[0]?.siteName}`}
                  </Typography>
                </Box>
              )}

              {expenseData.length > 0 && (
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
                          <Box sx={{ marginLeft: { xs: -4, sm: 0 } }}>
                            Labor Type
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontSize: 12 }}>
                          <Box sx={{ marginLeft: { xs: -6.2, sm: 0 } }}>
                            Number
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontSize: 12 }}>
                          <Box sx={{ marginLeft: { xs: -10, sm: 0 } }}>
                            Price
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell sx={{ fontSize: 12 }}>
                          <Box sx={{ marginLeft: { xs: -7, sm: 0 } }}>
                            Total Price
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expenseData.map((item) => (
                        <StyledTableRow key={item.id}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "12px" }}
                          >
                            <Box sx={{ marginLeft: { xs: -1, sm: 0 } }}>
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
                          <StyledTableCell component="th" scope="row">
                            <Box
                              sx={{
                                marginLeft: { xs: -3, sm: 0 },
                                fontSize: { xs: 10, sm: 12 },
                                width: { xs: 50 },
                              }}
                            >
                              {`${item.laborType.toLocaleString()}`}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <Box
                              sx={{
                                marginLeft: { xs: -6, sm: 0 },
                                fontSize: { xs: 10, sm: 12 },
                              }}
                            >
                              {`${item.number.toLocaleString()}`}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "12px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -10, sm: 0 },
                                fontSize: { xs: 10, sm: 12 },
                              }}
                            >
                              {`${item.laborPrice?.toLocaleString()}`}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            style={{ fontSize: "12px" }}
                          >
                            <Box
                              sx={{
                                marginLeft: { xs: -7, sm: 0 },
                                fontSize: { xs: 10, sm: 12 },
                              }}
                            >
                              {(
                                item.laborPrice && item.laborPrice * item.number
                              )?.toLocaleString()}
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          Total Expenses
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          {expenseData[0]?.totalPrice?.toLocaleString()}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Box>
        ) : (
          <AlertForNotExitData open={open} setOpen={setOpen} />
        )}
      </Box>
      <Dialog
        open={openForAlert}
        onClose={() => setOpenForAlert(false)}
        sx={{ width: 350 }}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ mt: 3, fontSize: 13 }}>
              There is not any project now.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => setOpenForAlert(false)}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default ExpenseBySite;
