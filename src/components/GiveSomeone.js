import React from 'react'

import './GiveSomeone.scss'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function createData(name, assignedBy, item, picture, status) {
  return { name, assignedBy, item, picture, status };
}

const rows = [
  createData('Jack', 'David', 'Cupcake', "https://dummyimage.com/600x400/000/fff", "Pending"),
  createData('Jack', 'Jack', 'Cookie', "", "Resolved"),
  createData('Jill', 'Jill', 'Coffee', "https://dummyimage.com/600x400/000/fff", "Resolved"),
];
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: 'none',
    backgroundColor: 'white',
    padding: '25px 30px',
    borderRadius: '4px'
  },
}));


export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [selectedRow, setSelectedRow] = React.useState({})

  const handleOpen = () => {
    setSelectedRow({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resolve = (row) => {
    setOpen(true);
    setSelectedRow(row)
  }
  

  return (
    <div id="give-someone">
      <div className="justify-between" style={{marginBottom: '30px'}}>
        <h1>Give Favours</h1>
        <Button variant="outlined" onClick={handleOpen}>
          + Create Favour
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {selectedRow.name ? 
              <div>
                <h2 id="transition-modal-title" style={{maxWidth: '500px'}}>
                  Resolve {selectedRow.name}'s {selectedRow.item} favour
                </h2>
                <form className="modal">
                  <input type="file" />
                </form>
                <div className="flex justify-between">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Resolve
                  </Button>
                </div>
              </div>
              :
              <div>
                <h2 id="transition-modal-title">
                  Create a favour
                </h2>
                <span className="sub-title">(THAT YOU OWE)</span>
                <form className="modal">
                  <TextField label="Person you owe" variant="outlined" />
                  <TextField label="What you owe" variant="outlined" />
                  <input type="file" />
                </form>
                <div className="flex justify-between">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </div>
              </div>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  )
}