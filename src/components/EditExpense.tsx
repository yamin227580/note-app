import { AppContext } from "@/context/AppContext";
import { ExpenseToUpdate } from "@/types/typesForApp";
import { config } from "@/utils/config";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";

interface Props {
  idToEdit: number | undefined;
  openForEdit: boolean;
  setOpenForEdit: (value: boolean) => void;
}

const defaultExpenseData = {
  siteName: "",
  laborType: "",
  date: "",
  number: 0,
};

const EditExpense = ({ idToEdit, openForEdit, setOpenForEdit }: Props) => {
  const { data, setData } = useContext(AppContext);
  const [expenseData, setExpenseData] =
    useState<ExpenseToUpdate>(defaultExpenseData);
  const [value, setValue] = useState<Dayjs | null>();
  const currentExpenseData = data.expenses.find((item) => item.id === idToEdit);

  useEffect(() => {
    if (currentExpenseData) {
      setExpenseData({
        siteName: currentExpenseData?.siteName,
        laborType: currentExpenseData?.laborType,
        date: currentExpenseData?.date,
        number: currentExpenseData?.number,
      });
    }
  }, [currentExpenseData]);

  const handleUpdateExpense = async () => {
    const response = await fetch(`${config.apiBaseUrl}/expense`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        idToEdit: idToEdit,
        expenseData,
      }),
    });
    const { expensesData } = await response.json();
    setData({ ...data, expenses: expensesData });
    setExpenseData(defaultExpenseData);
    setOpenForEdit(false);
  };

  const handleOnChange = (evt: SelectChangeEvent<string>) => {
    setExpenseData({ ...expenseData, laborType: evt.target.value });
  };

  const handleOnChangeSiteName = (evt: SelectChangeEvent<string>) => {
    setExpenseData({ ...expenseData, siteName: evt.target.value });
  };

  return (
    <Box>
      <Dialog open={openForEdit} onClose={() => setOpenForEdit(false)}>
        <DialogTitle sx={{ ml: { xs: 2, sm: 0 } }}>Update Expense</DialogTitle>
        <DialogContent sx={{ width: { xs: 300, sm: 400 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <DatePicker
              sx={{
                width: { xs: 230, sm: 350 },
                mt: 1,
                pb: 1,
                mb: 3,
              }}
              label="ရက်စွဲရွေးပါ"
              format="YYYY-MM-DD"
              value={dayjs(expenseData.date)}
              onChange={(newValue) => {
                // Extract only YYYY-MM-DD from the date object
                const formattedDate = dayjs(newValue).format("YYYY-MM-DD");
                setExpenseData({ ...expenseData, date: formattedDate });
                // Do something with the formatted date
                console.log("Formatted date:", formattedDate);
                // Set the value in your state
                setValue(newValue);
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ pl: { xs: 1, sm: 0 } }}>Labor</InputLabel>
              <Select
                sx={{ width: { xs: 230, sm: 350 }, ml: { xs: 1, sm: 0 } }}
                value={expenseData.laborType}
                label="Choose Labor"
                onChange={handleOnChange}
              >
                {data.labors.map((item) => (
                  <MenuItem key={item.id} value={item.laborType}>
                    <ListItemText primary={item.laborType} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              sx={{
                width: { xs: "90%", sm: "100%" },

                mb: 4,
                mt: 4,
              }}
              placeholder="number"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={expenseData.number}
              onChange={(evt) => {
                const inputValue = Number(evt.target.value);
                if (!isNaN(inputValue)) {
                  setExpenseData({
                    ...expenseData,
                    number: Number(inputValue),
                  });
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ pl: { xs: 1, sm: 0 } }}>Site Name</InputLabel>
              <Select
                sx={{ width: { xs: 230, sm: 350 }, ml: { xs: 1, sm: 0 } }}
                value={expenseData.siteName}
                label="Choose SiteName"
                onChange={handleOnChangeSiteName}
              >
                {data.projects.map((item) => (
                  <MenuItem key={item.id} value={item.siteName}>
                    <ListItemText primary={item.siteName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              sx={{ mr: { xs: 4 } }}
              variant="contained"
              disabled={
                !expenseData.date ||
                !expenseData.laborType ||
                !expenseData.siteName ||
                !expenseData.number
              }
              onClick={handleUpdateExpense}
            >
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default EditExpense;
