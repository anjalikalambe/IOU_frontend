import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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

export default function GiveSomeone(props) {
  const classes = useStyles();
  const [file, setFile] = useState('')
  const [item, setItem] = useState('')
  
  const [name, setName] = useState('')

  const handleClose = () => {
    props.onClose();
  };

  const handleFile = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const handleSave = () => {
    props.createFavour({ name, item })
    handleClose()
  }

  return (
    <div id="giftModal">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.isOpen}>
          <div className={classes.paper}>
            {props.selectedRow.name ? 
              <div>

                <h2 id="transition-modal-title" style={{ maxWidth: '500px' }}>
                  Resolve {props.selectedRow.name}'s {props.selectedRow.item} favour?
                </h2>
                <span className="sub-title">(IF {props.selectedRow.name.toUpperCase()} PAYED YOU BACK)</span>
                
                <div className="flex justify-between" style={{marginTop: '30px'}}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => props.resolveFavour(file)}
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
                <span className="sub-title">(THAT SOMEONE OWES YOU)</span>
                <form className="modal">
                  <TextField
                    label="Person you owe"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Item</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      label="Item"
                    >
                      <MenuItem value={'Coffee'}>Coffee</MenuItem>
                      <MenuItem value={'Cupcake'}>Cupcake</MenuItem>
                      <MenuItem value={'Cookie'}>Cookie</MenuItem>
                      <MenuItem value={'Chocolate'}>Chocolate</MenuItem>
                    </Select>
                  </FormControl>
                  {file ?
                    <img
                      src={file}
                      style={{ maxHeight: '350px', marginBottom: '20px', maxWidth: '800px', width: 'auto' }}
                    />
                    : null
                  }
                  <input type="file" onChange={(e) => handleFile(e)}/>
                </form>
                <div className="flex justify-between">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={!item || !name || !file}
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