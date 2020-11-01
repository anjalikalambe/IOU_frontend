import React, { useState, useEffect } from "react";
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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStore } from "../stores/helpers/UseStore";
import { Autocomplete } from "@material-ui/lab";
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

export default function GiveSomeone(props) {
  const classes = useStyles();
  const [favourImage, setFavourImage] = useState("");
  const [file, setFile] = useState("");
  const [item, setItem] = useState("");

  const [owed_by, setOwedBy] = useState("");
  const [owed_to, setOwedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    type: "info",
  });

  const { auth, owed, earned } = useStore(); //MobX global states

  const { open, message, type } = snackbarState;

  const openSnackbar = (message, type = "info") => {
    setSnackbarState({ open: true, message, type });
  };
  const closeSnackbar = () => {
    setSnackbarState({ open: false, message, type });
  };

  const handleClose = () => {
    setOwedBy("");
    setOwedTo("");
    setItem("");
    setFile("");
    setFavourImage("");
    props.onClose();
  };

  const validateFields = () => {
    if (props.status === "Favour") {
      return item && owed_to;
    } else {
      return item && owed_by;
    }
  };

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFavourImage(e.target.files[0]);
  };

  //Detects whether a party is formed or not
  const detectParty = (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    setTimeout(function () {
      axios
        .get("/favours/detectParty", {
          headers: { Authorization: token },
          params: { id: id },
        })
        .then((res) => {
          let people = res.data.people;
          let distinctPeople = [...new Set(people)];
          openSnackbar(
            res.data.message + distinctPeople + ". Meetup now!",
            "success"
          );
        })
        .catch((e) => console.log(e));
    }, 1000);
  };

  const handleSave = async () => {
    setLoading(true);
    let id;
    const formData = new FormData();
    formData.append("favourImage", favourImage);
    formData.append("item", item);
    formData.append(
      "owed_by",
      props.status === "Favour" ? auth.username : owed_by
    );
    formData.append(
      "owed_to",
      props.status === "Reward" ? auth.username : owed_to
    );
    console.log(loading);
    await axios
      .post("/favours/add", formData, {
        headers: { Authorization: auth.token },
      })
      .then((res) => {
        setLoading(false);
        console.log(loading);
        id = res.data.id;
        openSnackbar(res.data.message, "info");
        handleClose();
      })
      .catch((e) => {
        setLoading(false);
        openSnackbar(e.response.data.message, "error");
        handleClose();
      });
    detectParty(id);
    owed.fetchFavours();
    earned.fetchFavours();
  };

  const rewardChange = (e, newVal) => {
    setOwedBy(newVal);
  };
  const favourChange = (e, newVal) => {
    setOwedTo(newVal);
  };

  useEffect(() => {
    //Get the list of usernames so the user can easily select which user to reward
    axios
      .get("/users", {
        headers: { Authorization: auth.token },
      })
      .then((res) => {
        setUsers(res.data.filter((username) => username !== auth.username));
      });
  }, []);

  return (
    <div id="giftModal">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={closeSnackbar}
        key={"topright"}
        autoHideDuration={8000}
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
                {props.status === "Favour"
                  ? "Create A Favour"
                  : "Ask For Repayment"}
              </h2>
              <span className="sub-title">
                (
                {props.status === "Favour"
                  ? "THAT YOU OWE"
                  : "THAT SOMEONE OWES YOU"}
                )
              </span>
              <form className="modal">
                {props.status === "Reward" && (
                  <Autocomplete
                    options={users}
                    value={owed_by}
                    onChange={rewardChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Favour is owed by user..."
                        variant="outlined"
                      />
                    )}
                  />
                )}
                {props.status === "Favour" && (
                  <Autocomplete
                    options={users}
                    onChange={favourChange}
                    value={owed_to}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Favour is owed to user..."
                        variant="outlined"
                      />
                    )}
                  />
                )}

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Item
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    label="Item"
                  >
                    <MenuItem value={"Coffee"}>Coffee</MenuItem>
                    <MenuItem value={"Juice"}>Juice</MenuItem>
                    <MenuItem value={"Cupcake"}>Cupcake</MenuItem>
                    <MenuItem value={"Voucher"}>Voucher</MenuItem>
                    <MenuItem value={"Hot Chocolate"}>Hot Chocolate</MenuItem>
                  </Select>
                </FormControl>
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
                {props.status === "Reward" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={!loading && <SaveIcon />}
                    onClick={handleSave}
                    disabled={!validateFields() || !file || loading}
                  >
                    {loading ? <Loader style={{ paddingTop: "0" }} /> : "Save"}
                  </Button>
                )}
                {props.status === "Favour" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={!loading && <SaveIcon />}
                    onClick={handleSave}
                    disabled={!validateFields()}
                    disabled={!validateFields() || loading}
                  >
                    {loading ? <Loader /> : "Save"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
