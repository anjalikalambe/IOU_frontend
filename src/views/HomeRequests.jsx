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
import "./HomeLeaderboard.scss";

class HomeRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rows: []};
  }

  componentDidMount() {
    console.log('component rendered');

      axios.get("http://localhost:5000/public/requests/")
        .then(response => {
          let requests = response.data;
          this.setState({ rows: requests });
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
        <div className="table-wrapper">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Requester</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Rewards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row, index) => (
                  <TableRow key={row.opened_by + index}>
                    <TableCell>{row.opened_by}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      {row.rewards.map((reward, index) => {
                        return (
                          <span>
                            {reward.item}
                            {row.rewards.length - 1 !== index && ", "}
                          </span>
                        );
                      })}
                    </TableCell>
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

export default HomeRequests;
