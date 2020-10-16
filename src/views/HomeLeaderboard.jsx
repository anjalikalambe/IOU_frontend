import React, { useState } from "react";
import HomeNav from "../components/HomeNav";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import './HomeLeaderboard.scss'

class HomeLeaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    console.log('component rendered');

      axios.get("http://localhost:5000/users/leaderboard/")
        .then(response => {
          let users = response.data;
          this.setState({ rows: users });
        })
        .catch(e => {
          console.log("Error: " + e);
        });
  }

  render() {
    return (
      <div id="login" class="home-leaderboard">
        <div className="homenav-wrapper">
          <HomeNav />
        </div>
        <div className="bg" />
        <div className="table-wrapper highlighed-top">
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
                {this.state.rows.map((row, index) => (
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
}

export default HomeLeaderboard;