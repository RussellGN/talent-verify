"use client";

import { useState } from "react";
import {
   Button,
   CircularProgress,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";

type ConfirmationDialogProps = {
   title: string;
   message: string;
   confirm: () => void;
   show: boolean;
   closeDialog: () => void;
   proceedText?: string;
   cancelText?: string;
   showSpinnerOnConfirm?: boolean;
};

export default function ConfirmationDialog({
   title,
   message,
   confirm,
   show,
   closeDialog,
   proceedText,
   cancelText,
   showSpinnerOnConfirm,
}: ConfirmationDialogProps) {
   const [showSpinner, setShowSpinner] = useState(false);

   return (
      <Dialog
         open={show}
         onClose={closeDialog}
         aria-labelledby="popup-dialog-title"
         aria-describedby="popup-dialog-description"
         maxWidth="xs"
         sx={{ textAlign: "center" }}
      >
         <DialogTitle noWrap id="popup-dialog-title" sx={{ pt: 3 }}>
            {showSpinner && title.toLowerCase() === "logout" ? "Logging out..." : title}
            {title}
         </DialogTitle>
         <DialogContent>
            {showSpinner ? (
               <div className="flex justify-center items-center min-h-[8rem]">
                  <CircularProgress />
               </div>
            ) : (
               <>
                  <DialogContentText id="popup-dialog-description">{message}</DialogContentText>

                  <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
                     <Button onClick={closeDialog}>{cancelText ?? "Cancel"}</Button>
                     <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                           if (showSpinnerOnConfirm) {
                              setShowSpinner(true);
                           }
                           confirm();
                        }}
                     >
                        {proceedText ?? "Yes"}
                     </Button>
                  </DialogActions>
               </>
            )}
         </DialogContent>
      </Dialog>
   );
}
