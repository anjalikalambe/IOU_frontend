import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublicReqModal from "../components/PublicReqModal.jsx";
import AddReward from "../components/AddRewardModal.jsx";
import ResolveReq from "../components/ResolveModal.jsx";
import "./PublicRequest.scss";
import axios from "axios";

export default function PublicRequests() {
  const [showModal, setShowModal] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [rows, setRows] = useState([]);

  const createFavour = () => {
    setShowModal(true);
    setSelectedRow({});
  };
  const addReward = (row) => {
    setShowAddRewardModal(true);
    setSelectedRow(row);
  };
  const resolve = (row) => {
    setShowResolve(true);
    setSelectedRow(row);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/public/requests/")
      .then((response) => {
        const requests = response.data;
        setRows(requests);
      })
      .catch(e => {
        console.log("Couldn't display the public requests." + e);
      });
  }, []);

  return (
    <div id="give-someone">
      <div className="justify-between" style={{ marginBottom: "30px" }}>
        <h1>Public Requests</h1>
        <Button variant="outlined" onClick={createFavour}>
          + Create Request
        </Button>
      </div>

      <Grid container spacing={3}>
        {rows.map((row, index) => (
          <Grid item xs={4}>
            <div className="card" key={row.item + index}>
              <div className="card--title">{row.description}</div>
              <div className="card--body"><span>Rewards: </span>
                {row.rewards.map((reward, index) => {
                  return (
                    <span>
                      {reward.item}
                      {row.rewards.length - 1 !== index && ", "}
                    </span>
                  );
                })}
              </div>
              <div className="btns">
                <Button variant="outlined" color="primary" onClick={() => { addReward(row) }}>Add Reward</Button>
                <Button variant="contained" color="primary" onClick={()=>{resolve(row)}}>Resolve</Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <PublicReqModal
        onClose={() => {
          setShowModal(false);
        }}
        isOpen={showModal}
        resolveFavour={(file) => console.log("resolveFavour() ", file)}
        createFavour={(form) => console.log("createFavour() ", form)}
      />
      <AddReward
        selectedRow={selectedRow} /*favour sent as prop for id*/
        onClose={() => {
          setShowAddRewardModal(false);
        }}
        isOpen={showAddRewardModal}
        addReward={(form) => console.log("addFavour() ", form)}
      />
      <ResolveReq
        selectedRow={selectedRow} /*favour sent as prop for id*/
        onClose={() => {
          setShowResolve(false);
        }}
        isOpen={showResolve}
        resolveFavour={(file) => console.log("resolveFavour() ", file)}
        createFavour={(form) => console.log("createFavour() ", form)}
      />
    </div>
  );
}
