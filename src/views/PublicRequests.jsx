import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PublicReqModal from "../components/PublicReqModal.jsx";
import AddReward from "../components/AddRewardModal.jsx";
import ResolveReq from "../components/ResolveModal.jsx";
import { TextField } from "@material-ui/core";
import axios from "axios";
import "./PublicRequest.scss";

export default function PublicRequests() {
  const [showModal, setShowModal] = useState(false);
  const [showResolve, setShowResolve] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPublicRequests = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/public/requests/")
      .then((response) => {
        setLoading(false);
        const requests = response.data;
        setRows(requests);
        console.log("setRows(requests)");
      })
      .catch((e) => {
        setLoading(false);
        console.log("Couldn't display the public requests." + e);
      });
  };

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
    fetchPublicRequests();
  }, []);

  const filterRows = () => {
    return rows.filter((row) => {
      return (
        [...new Set(row.rewards.map((reward) => reward.item.toLowerCase()))]
          .join()
          .includes(filter) || row.description.toLowerCase().includes(filter)
      );
    });
  };

  const displayRewards = (array) => {
    if (!array.length) return <span>None</span>;
    let arr = array.map((item) => item.item);
    let map = {};
    for (let i = 0; i < arr.length; ++i) {
      map[arr[i]] ? map[arr[i]]++ : (map[arr[i]] = 1);
    }
    return Object.keys(map).map((reward, index) => {
      if (map[reward] > 1) {
        return (
          <span key={reward + (index * 1000 + map[reward])}>
            {`${reward} (x${map[reward]})`}
            {Object.keys(map).length - 1 !== index ? ", " : ""}
          </span>
        );
      } else {
        return (
          <span key={reward + (index * 1000 + map[reward])}>
            {reward}
            {Object.keys(map).length - 1 !== index ? ", " : ""}
          </span>
        );
      }
    });
  };

  return (
    <div id="give-someone">
      <div
        className="justify-between align-center"
        style={{ marginBottom: "30px" }}
      >
        <h1>Public Requests</h1>
        <div className="flex justify-between align-center">
          <TextField
            label="Filter by task or reward"
            variant="outlined"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={createFavour}
            style={{ height: "56px", marginLeft: "20px" }}
          >
            + Create Request
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        {filterRows().length
          ? filterRows().map((row, index) => (
              <Grid item xs={4} key={index + Math.random(100000)}>
                <div className="card" key={row.item + index}>
                  <div className="card--title">{row.description}</div>
                  <div className="card--body">
                    <span>Rewards: </span>
                    {displayRewards(row.rewards)}
                  </div>
                  <div className="btns">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        addReward(row);
                      }}
                    >
                      Add Reward
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        resolve(row);
                      }}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              </Grid>
            ))
          : !loading && (
              <div className="empty-state">
                <img src="/empty.png" alt="" class="empty-state__img"></img>
                <h2>Could not find any public requests</h2>
              </div>
            )}
      </Grid>

      <PublicReqModal
        onClose={() => {
          setShowModal(false);
        }}
        isOpen={showModal}
        resolveFavour={(file) => console.log("resolveFavour() ", file)}
        createFavour={(form) => console.log("createFavour() ", form)}
        addRequest={fetchPublicRequests}
      />
      <AddReward
        selectedRow={selectedRow} /*favour sent as prop for id*/
        onClose={() => {
          setShowAddRewardModal(false);
        }}
        isOpen={showAddRewardModal}
        rewardAdded={fetchPublicRequests}
      />
      <ResolveReq
        selectedRow={selectedRow} /*favour sent as prop for id*/
        onClose={() => {
          setShowResolve(false);
        }}
        isOpen={showResolve}
        resolveFavour={(file) => console.log("resolveFavour() ", file)}
        createFavour={(form) => console.log("createFavour() ", form)}
        requestResolved={fetchPublicRequests}
      />
    </div>
  );
}
