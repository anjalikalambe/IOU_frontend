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
import Loader from './UI/MiniLoader'

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
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setItem("");
    props.onClose();
  };

  // adds a reward to the existing public request by calling the addReward endpoint on API, endpoint is protected and thus token needs to be sent
  const handleSave = async () => {
    setLoading(true);
    const favour = props.selectedRow;
    let id = favour._id;
    
    let body = {
      item: item
    }

    //token received from localStorage and sent in req header
    let token = JSON.parse(localStorage.getItem('data')).token;

    try {
      await axios.post("/public/requests/addReward/", body, { headers: { 'Authorization': token }, params: { "id": id } })
      props.rewardAdded();

    } catch (e) {
      console.log("Could not add reward");
    }
    
    setLoading(false);
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
                    <MenuItem value={"Juice"}>Juice</MenuItem>
                    <MenuItem value={"Cupcake"}>Cupcake</MenuItem>
                    <MenuItem value={"Voucher"}>Voucher</MenuItem>
                    <MenuItem value={"Hot Chocolate"}>Hot Chocolate</MenuItem>
                  </Select>
                </FormControl>
              </form>
              <div className="flex justify-between">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={!loading && <SaveIcon />}
                  onClick={handleSave}
                  disabled={!item || loading}
                >
                  {loading ? <Loader /> : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
