import React from 'react';
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
import HelpIcon from '@material-ui/icons/Help';
import CancelIcon from '@material-ui/icons/Cancel';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, all, search,type} = props;
  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
       {type == "users" ?
      <DialogTitle id="simple-dialog-title">Etkinliğe kayıt olan kişiler</DialogTitle> : <DialogTitle id="simple-dialog-title">Etkinlikte sorulan sorular</DialogTitle> }    
      <List>
        
        {type == "users" ? all.map((email,i) => (
        all[i].event.id === search ?
          <ListItem key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={all[i].name + " TC: " + all[i].tc} />
          </ListItem> : null
        )) : all.map((email,i) => (
          all[i].eventId === search ?
            <ListItem key={email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <HelpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={all[i].askingPerson + " sordu: " + "'"+ all[i].question + "'"} />
            </ListItem> : null
          ))}

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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const {liste, search, type} = props;  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      {type == "users" ?
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        KATILIMCILARI LİSTELE
      </Button> :
       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       ETKİNLİK SORULARINI LİSTELE
     </Button>
      }
      <SimpleDialog open={open} onClose={handleClose} all={liste} search={search} type={type}/>
    </div>
  );
}