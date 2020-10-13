import React, { useState } from "react";
import HomeNav from "../components/HomeNav";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './HomeLeaderboard.scss'
function createData(requester, task, reward) {
  return { requester, task, reward };
}
let rows = [
  createData("David", "Someone wash the dishes please", ["Coffee", "Chocolate"]),
  createData("David", "Someone wash the dishes please", ["Coffee", "Chocolate"]),
  createData("David", "Someone wash the dishes please", ["Coffee", "Chocolate"]),
  createData("David", "Someone wash the dishes please", ["Coffee", "Chocolate"]),
  createData("David", "Someone wash the dishes please", ["Coffee", "Chocolate"]),
];

const HomeLeaderboard = (props) => {
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
              {rows.map((row, index) => (
                <TableRow key={row.requester + index}>
                  <TableCell>{row.requester}</TableCell>
                  <TableCell>{row.task}</TableCell>
                  <TableCell>
                    {
                      row.reward.map((item, index) => {
                        return <span>{item}{row.reward.length - 1 !== index && ', '}</span>
                      })
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeLeaderboard;
