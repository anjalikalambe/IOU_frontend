import React, { useState } from 'react'

import './GiftFavours.scss'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, rewardsEarned) {
  return { name, rewardsEarned };
}
let rows = [
  createData('David', '10'),
  createData('Anjali', '7'),
  createData('Bragg', '5'),
];


export default function GiveSomeone() {
  return (
    <div id="give-someone">
      <div className="justify-between" style={{marginBottom: '30px'}}>
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
              <TableRow key={row.name + index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.rewardsEarned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}