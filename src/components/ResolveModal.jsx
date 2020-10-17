import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";

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
  const [item, setItem] = useState("");

  const [name, setName] = useState("");

  const handleClose = () => {
    props.onClose();
  };

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    // props.createFavour({ name, item }); /*I think we can remove this? since backend creates the favour to person who completed? */

    const favour = props.selectedRow;

    let auth = localStorage.getItem('data');
    auth = JSON.parse(auth);
    let token = auth.token;

    axios.post("http://localhost:5000/public/requests/delete/", {},{ headers: { 'Authorization': token }, params:{"favour" : favour}  })
      .then(()=>console.log("Sucessfully resolved request"))
      .catch(e => console.log("Could not resolve request"));

    handleClose();
  };

  return (
    <div id="giftModal">
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
                ) : null}
                <input type="file" onChange={(e) => handleFile(e)} />
              </form>
              <div className="flex justify-between">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!file}
                >
                  Resolve
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
