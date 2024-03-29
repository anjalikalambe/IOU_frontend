import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loader from "./UI/MiniLoader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "none",
    backgroundColor: "white",
    padding: "25px 30px",
    borderRadius: "4px",
  },
}));

export default function ResolvePublicReq(props) {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [favourImage, setFavourImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "info",
  });

  const { open, message, type } = snackbarState;

  const openSnackbar = (message, type = "info") => {
    setSnackbarState({ open: true, message, type });
  };
  const closeSnackbar = () => {
    setSnackbarState({ open: false, message, type });
  };

  const handleClose = () => {
    props.onClose();
    setFile("");
  };

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFavourImage(e.target.files[0]);
  };

  // resolves a public request by: 
  // 1. calling the API resolve to rewards endpoint which creates favours owed to person that completed request
  // 2. calls delete endpoint to remove the public request
  const handleSave = async () => {
    setLoading(true);
    let favour = props.selectedRow;
    const id = favour._id;
    const formData = new FormData();
    formData.append("favourImage", favourImage); // sends image with which request is closed and subsequent favours opened
    formData.append("id", id);
    formData.append("opened_by", favour.opened_by);
    formData.append("rewards", JSON.stringify(favour.rewards));

    let data = {
      id,
    };

    //token received from localStorage and sent in req headers
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      await axios.post("/favours/createRequestRewards", formData, { headers: { Authorization: token } });
      let res = await axios.post("/public/requests/delete", data, {
        headers: { Authorization: token }
      });
      openSnackbar(res.data.message, "info");
      props.requestResolved();

    } catch (e) {
      openSnackbar(e.response.data.message, "error");
      console.log("Could not resolve request");
    }

    setLoading(false);

    handleClose();
  };

  return (
    <div id="giftModal">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={closeSnackbar}
        key={"topright"}
        autoHideDuration={4000}
      >
        <Alert onClose={closeSnackbar} severity={type}>
          {message}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={classes.paper}>
            <div>
              <h2 id="transition-modal-title">Resolve Favour</h2>
              <form className="modal">
                {file ? (
                  <figure className="flex justify-center">
                    <img
                      alt=""
                      src={file}
                      style={{
                        maxHeight: "350px",
                        marginBottom: "20px",
                        maxWidth: "800px",
                        width: "auto",
                      }}
                    />
                  </figure>
                ) : null}
                <input type="file" onChange={(e) => handleFile(e)} />
              </form>
              <div className="flex justify-between">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={!loading && <SaveIcon />}
                  onClick={handleSave}
                  disabled={!file || loading}
                >
                  {loading ? <Loader /> : "Resolve"}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
