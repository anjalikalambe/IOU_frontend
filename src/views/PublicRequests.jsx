import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublicReqModal from "../components/PublicReqModal.jsx";
import AddReward from "../components/AddRewardModal.jsx";
import ResolveReq from "../components/ResolveModal.jsx";
import "./PublicRequest.scss";

export default function PublicRequests() {
  const [showModal, setShowModal] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const createFavour = () => {
    setShowModal(true);
    setSelectedRow({});
  };
  const addReward = () => {
    setShowAddRewardModal(true);
  };
  const resolve = () => {
    setShowResolve(true);
  };

  return (
    <div id="give-someone">
      <div className="justify-between" style={{ marginBottom: "30px" }}>
        <h1>Public Requests</h1>
        <Button variant="outlined" onClick={createFavour}>
          + Create Request
        </Button>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <div className="card">
            <div className="card--title">Clean fridge</div>
            <div className="card--body">Reward: Coffee, Chocolate</div>
            <div className="btns">
              <Button variant="outlined" color="primary" onClick={addReward}>Add Reward</Button>
              <Button variant="contained" color="primary" onClick={resolve}>Resolve</Button>
            </div>
          </div>
        </Grid>
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
        selectedRow={selectedRow}
        onClose={() => {
          setShowAddRewardModal(false);
        }}
        isOpen={showAddRewardModal}
        addReward={(form) => console.log("createFavour() ", form)}
      />
      <ResolveReq
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
