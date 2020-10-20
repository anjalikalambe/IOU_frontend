import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import './GiftFavours.scss'

export default function GiveSomeone() {
  const [rows, setRows] = useState([]);
  
  const fetchLeaderboardUsers = () => {
    axios
      .get("http://localhost:5000/users/leaderboard/")
      .then((response) => {
        let users = response.data;
        setRows(users);
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
    <div id="give-someone">
      <div className="justify-between" style={{ marginBottom: '30px' }}>
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
  )
}