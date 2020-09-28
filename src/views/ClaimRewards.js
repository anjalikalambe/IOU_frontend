import React, { useState } from 'react'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import RewardsModal from '../components/ClaimModal.js'

function createData(name, assignedBy, item, picture, status) {
  return { name, assignedBy, item, picture, status };
}

const rows = [
  createData('Jack', 'David', 'Cupcake', "https://dummyimage.com/600x400/000/fff", "Pending"),
  createData('Jack', 'Jack', 'Cookie', "", "Resolved"),
  createData('Jill', 'Jill', 'Coffee', "https://dummyimage.com/600x400/000/fff", "Resolved"),
];


export default function GiveSomeone() {

  const [showModal, setShowModal] = useState(false);
  
  const [selectedRow, setSelectedRow] = useState({})
  
  const createFavour = () => {
    setShowModal(true);
    setSelectedRow({});
  };

  const resolve = (row) => {
    setShowModal(true);
    setSelectedRow(row)
  }

  return (
    <div id="give-someone">
      <div className="justify-between" style={{marginBottom: '30px'}}>
        <h1>Claim Rewards</h1>
        <Button variant="outlined" onClick={createFavour}>
          + Create Favour
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>You owe</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name + index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.item}</TableCell>
                <TableCell className="img-wrapper">
                  <div className="align-center">
                    {row.picture
                      ? <img className="img-favour" src={row.picture} alt="" />
                      : "Not provided"
                    }
                  </div>
                </TableCell>
                <TableCell>
                  <div className="align-center">
                    {row.status === 'Resolved'
                      ? <CheckCircleIcon style={{color: 'green', fontSize: '30px'}}/>
                      : <Button variant="contained" color="primary" onClick={() => resolve(row)}>
                          Resolve 
                        </Button>
                    }
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <RewardsModal
        selectedRow={selectedRow}
        onClose={() => {
          setShowModal(false);
          setTimeout(() => {
            setSelectedRow({});            
          }, 500);
        }}
        isOpen={showModal}
        resolveFavour={(file) => console.log('resolveFavour() ', file)}
        createFavour={(form) => console.log('createFavour() ', form)}
      />
    </div>
  )
}