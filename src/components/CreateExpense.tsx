import { AppContext } from "@/context/AppContext";
import { CreateExpensePayload } from "@/types/typesForApp";
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
import { Labor, Project } from "@prisma/client";
import dayjs, { Dayjs } from "dayjs";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultExpenseData = {
  date: "",
  laborType: "",
  number: 0,
  siteName: "",
};
const CreatExpense = ({ open, setOpen }: Props) => {
  const [expenseData, setExpenseData] =
    useState<CreateExpensePayload>(defaultExpenseData);

  const [value, setValue] = useState<Dayjs | null>();
  const [labors, setLabors] = useState<Labor[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const { data, setData, addExpense } = useContext(AppContext);

  const handleOnChange = (evt: SelectChangeEvent<string>) => {
    setExpenseData({ ...expenseData, laborType: evt.target.value });
  };

  const handleOnChangeSiteName = (evt: SelectChangeEvent<string>) => {
    setExpenseData({ ...expenseData, siteName: evt.target.value });
  };

  const handleCreateExpense = async () => {
    if (expenseData) {
      const response = await fetch(`${config.apiBaseUrl}/expense`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      const { expensesData } = await response.json();
      addExpense(expensesData);
      setOpen(false);
      setExpenseData(defaultExpenseData);
      setValue(null);
    }
  };

  useEffect(() => {
    setLabors(data.labors);
    setProjects(data.projects);
  }, [data]);

  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ ml: { xs: 2, sm: 0 } }}>
          Create New Expense
        </DialogTitle>
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
              value={value}
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
                sx={{
                  width: { xs: 230, sm: 350 },
                  ml: { xs: 1, sm: 0 },
                }}
                value={expenseData.laborType}
                label="Choose Labor"
                onChange={handleOnChange}
              >
                {labors.map((item) => (
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
                {projects.map((item) => (
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
              onClick={() => setOpen(false)}
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
              onClick={handleCreateExpense}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default CreatExpense;
