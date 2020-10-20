import React, { useState, useEffect } from "react";
import HomeNav from "../components/HomeNav";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./HomeLeaderboard.scss";

export default function HomeLeaderboard() {
  const [rows, setRows] = useState([]);
  
  const fetchLeaderboardUsers = () => {
    axios
      .get("http://localhost:5000/users/leaderboard/")
      .then((response) => {
        setRows(response.data);
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
  }

  useEffect(() => {
    fetchLeaderboardUsers();
    const interval = setInterval(() => fetchLeaderboardUsers(), 2000)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col" style={{ width: "100%" }}>
      <div className="homenav-wrapper">
        <HomeNav />
      </div>
      <div class="home-requests" style={{marginTop: '10px'}}>
        <div
          className="justify-between align-center"
          style={{ marginBottom: "30px" }}
        >
          <h1>Leaderboard</h1>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Rewards Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.username + index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.numRewards}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}