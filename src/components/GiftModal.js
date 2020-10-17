import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    backgroundColor: 'white',
    padding: '25px 30px',
    borderRadius: '4px'
  },
}));


export default function GiveSomeone(props) {
  const classes = useStyles();
  const [favourImage, setFile] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [item, setItem] = useState('')
  
  const [name, setName] = useState('')
  const [owed_by, setOwedBy] = useState('')
  const [owed_to, setOwedTo] = useState('')

  const [favourError, setFavourError] = useState({
    error: false,
    message: "",
  });

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

  const clearErrors = () => {
    setFavourError({ error: false, message: "" });
  };

  const handleClose = () => {
    props.onClose();
    setOwedBy('');
    setOwedTo('');
    setItem('');
  };

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleSave = () => {
    const formData = new FormData();
    formData.append("favourImage", favourImage);
    formData.append('item', item);
    formData.append('owed_by', owed_by);
    formData.append('owed_to', owed_to);

    let auth = localStorage.getItem('data');
    auth = JSON.parse(auth);
    let token = auth.token;
    
    axios.post("http://localhost:5000/favours/add", formData, { headers: { 'Authorization': token } })
      .then((res) => {
        setFavourError(res.data.message);
        openSnackbar(res.data.message, "info");
      })
      .catch(e => {
        setFavourError(e.response.data);
        openSnackbar(e.response.data.message, "error");
      });

    handleClose();
  }

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
                <h2 id="transition-modal-title">
                  Create a favour
                </h2>
                <span className="sub-title">(THAT YOU OWE)</span>
                <form className="modal">
                  <TextField
                    label="Favour is owed by user..."
                    variant="outlined"
                    value={owed_by}
                    onChange={(e) => setOwedBy(e.target.value)}
                  />
                  <TextField
                    label="Favour is owed to user..."
                    variant="outlined"
                    value={owed_to}
                    onChange={(e) => setOwedTo(e.target.value)}
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Item</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      label="Item"
                    >
                      <MenuItem value={'Coffee'}>Coffee</MenuItem>
                      <MenuItem value={'Cupcake'}>Cupcake</MenuItem>
                      <MenuItem value={'Cookie'}>Cookie</MenuItem>
                      <MenuItem value={'Chocolate'}>Chocolate</MenuItem>
                    </Select>
                  </FormControl>
                  <input type="file" onChange={(e) => handleFile(e)}/>
                </form>
                <div className="flex justify-between">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!item || !owed_by || !owed_to}
                  >
                    Save
                  </Button>
                </div>
              </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}