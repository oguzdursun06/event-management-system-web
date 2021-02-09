import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import CancelIcon from '@material-ui/icons/Cancel';
import { blue } from '@material-ui/core/colors';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import { Container } from '@material-ui/core';

function QuestionSimpleDialog(props) {
  const { onClose, open,name,eventId} = props;
  const handleListItemClick = (value) => {
    onClose(value);
  };
  
  let handleSubmit = async(event) => {
      event.preventDefault();
      let emptyItem = {
          askingPerson: name,
          eventId: eventId,
          question: title,
      };
      await fetch(`/api/questions`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emptyItem)
    }); 
    handleListItemClick('addAccount')

  }
  const [title, setTitle] = useState('')
  return (
    
    <Dialog aria-labelledby="simple-dialog-title" fullWidth="200px" open={open}>
      <DialogTitle id="simple-dialog-title"></DialogTitle>       
      <List>
<Container>

      <form onSubmit={handleSubmit}>
        <p className="h4 text-center mb-4">Etkinlik başladı, sorularınızı buradan sorabilirsiniz.</p>
          <MDBInput onChange={event => setTitle(event.target.value)} type="textarea" rows="4" cols="1" label="Sor" />
          <MDBBtn outline color="secondary" type="submit"> 
            Gönder
            <MDBIcon far icon="paper-plane" className="ml-1" />
          </MDBBtn>

      </form>

  </Container>

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
          <CancelIcon color="blue"/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Kapat" />
        </ListItem>
      </List>
    </Dialog>
  );
}

QuestionSimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  const name = props.name;
  const eventId = props.eventId;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Soru sorabilirsiniz
      </Button>
      <QuestionSimpleDialog open={open} onClose={handleClose} name={name} eventId={eventId}/>
    </div>
  );
}