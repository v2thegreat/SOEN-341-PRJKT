import React from 'react';
import {
    Button,
    CssBaseline,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography,
    withStyles,
} from '@material-ui/core';
import styles from './styles';

const firebase = require('firebase');

class JoinChannelComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      channelName: null,
    };
  }

  render() {
    const {classes} = this.props;
    return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>Join Channel</Typography>
            <form className={classes.form} onSubmit={(e) => this.writeData(e)}>
              <FormControl fullWidth>
                <InputLabel htmlFor='joinChannelChannelName'>
                  Enter the channel name
                </InputLabel>
                <Input required className={classes.input} autoFocus
                       type='text' id='nameField'>
                </Input>
              </FormControl>
              <Button fullWidth className={classes.submit} variant='contained'
                      color='primary'
                      type='submit' onClick={this.writeData}>Submit</Button>
            </form>
          </Paper>
        </main>
    );

  }

  writeData = () => {
    const joinChannelName = document.getElementById('nameField').value;
    const email = firebase.auth().currentUser.email;
    firebase.firestore().collection('channels').doc(joinChannelName).update({
      users: firebase.firestore.FieldValue.arrayUnion(email),
    });
  };

}

export default withStyles(styles)(JoinChannelComponent);