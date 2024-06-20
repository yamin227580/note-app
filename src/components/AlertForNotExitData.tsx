import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertForNotExitData = ({ open, setOpen }: Props) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent sx={{ width: 280 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ mt: 3, fontSize: 13 }}>
              There is no expenses for this site.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default AlertForNotExitData;
