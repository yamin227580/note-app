import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  openForUpdateAlert: boolean;
  setOpenForUpdateAlert: Dispatch<SetStateAction<boolean>>;
  msg: string;
}

const AlertForUpdateData = ({
  openForUpdateAlert,
  setOpenForUpdateAlert,
  msg,
}: Props) => {
  return (
    <Box>
      <Dialog
        open={openForUpdateAlert}
        onClose={() => setOpenForUpdateAlert(false)}
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
              You updated {msg} successfully.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => setOpenForUpdateAlert(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default AlertForUpdateData;
