import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  openForDeleteAlert: boolean;
  setOpenForDeleteAlert: Dispatch<SetStateAction<boolean>>;
  msg: string;
}

const AlertForDeleteData = ({
  openForDeleteAlert,
  setOpenForDeleteAlert,
  msg,
}: Props) => {
  return (
    <Box>
      <Dialog
        open={openForDeleteAlert}
        onClose={() => setOpenForDeleteAlert(false)}
      >
        <DialogContent sx={{ width: 300 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ mt: 3, fontSize: 14 }}>
              You deleted {msg} successfully.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenForDeleteAlert(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default AlertForDeleteData;
