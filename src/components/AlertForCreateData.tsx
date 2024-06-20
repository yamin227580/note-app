import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
  openForCreate: boolean;
  setOpenForCreate: Dispatch<SetStateAction<boolean>>;
  msg: string;
}

const AlertForCreateData = ({
  openForCreate,
  setOpenForCreate,
  msg,
}: Props) => {
  return (
    <Box>
      <Dialog
        open={openForCreate}
        onClose={() => setOpenForCreate(false)}
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
              You created {msg} successfully.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={() => setOpenForCreate(false)}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default AlertForCreateData;
