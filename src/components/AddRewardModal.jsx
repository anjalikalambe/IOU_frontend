import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
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

export default function AddReward(props) {
  const classes = useStyles();
  const [item, setItem] = useState("");

  const handleClose = () => {
    props.onClose();
  };

  const handleSave = () => {
    const favour = props.selectedRow;
    let id = favour._id;
    
    let body = {
      item: item
    }

    let auth = localStorage.getItem('data');
    auth = JSON.parse(auth);
    let token = auth.token;

    axios.post("http://localhost:5000/public/requests/addReward/", body, { headers: { 'Authorization': token }, params:{"id" : id}  })
      .then(() => {
        props.rewardAdded();
      })
      .catch(e => console.log("Could not add reward"));
    
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
              <h2 id="transition-modal-title">Add a Reward</h2>
              <span className="sub-title">(ONTO THE EXISTING REWARD LIST)</span>
              <form className="modal">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Your Reward
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    label="Your Reward"
                  >
                    <MenuItem value={"Coffee"}>Coffee</MenuItem>
                    <MenuItem value={"Gift Card"}>Gift Card</MenuItem>
                    <MenuItem value={"Juice"}>Juice</MenuItem>
                    <MenuItem value={"Cupcake"}>Cupcake</MenuItem>
                    <MenuItem value={"Voucher"}>Voucher</MenuItem>
                  </Select>
                </FormControl>
              </form>
              <div className="flex justify-between">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!item}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
