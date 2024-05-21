import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0.2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 1,
        height: "5vh",
        // maxHeight: "3vw",
        fontSize: "14px !important",
        fontWeight: 600,
        color: "white",
        background: "#4FC4F7",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            // position: "absolute",
            // right: 8,
            // top: 0.5,
            padding: 0,
            // marginLeft: 2,
            color: "white",
            "&:hover": {
              // backgroundColor: "#e0e0e0",
              // color: "black",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Modal({
  title,
  width,
  type,
  maxHeight,
  closeCallback,
  children,
}) {
  return (
    <div>
      <BootstrapDialog
        onClose={(event, reason) => {
          if (
            (reason && reason == "backdropClick") ||
            reason == "escapeKeyDown"
          )
            return;
          closeCallback;
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxHeight: maxHeight ? maxHeight : "100vh",
            maxWidth: width ? width : "45vw",
            borderRadius: 3,
          },
        }}
        sx={{ marginLeft: "23vw" }}
        open={true}
      >
        {type != "add" ? (
          <BootstrapDialogTitle onClose={closeCallback}>
            {title}
          </BootstrapDialogTitle>
        ) : (
          <BootstrapDialogTitle> {title}</BootstrapDialogTitle>
        )}

        <Box sx={{ minHeight: "15vh", overflow: "auto", p: 0, m: 0 }}>
          {children}
        </Box>
      </BootstrapDialog>
    </div>
  );
}
