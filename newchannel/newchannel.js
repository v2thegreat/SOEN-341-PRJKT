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

class NewChannelComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      channelName: null,
      userName: null,
      message: null,
    };
  };

  render() {

    const {classes} = this.props;

    return (
        <main className={classes.main}>
          <CssBaseline></CssBaseline>
          <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>Create Channel</Typography>
            <form className={classes.form}
                  onSubmit={(e) => this.submitNewChannel(e)}>
              <FormControl fullWidth>
                <InputLabel htmlFor='newChannelChannelName'>
                  Enter Your Channelname
                </InputLabel>
                <Input required className={classes.input} autoFocus
                       onChange={(e) => this.userTyping('channelName', e)}
                       id='newChannelChannelName'>
                </Input>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='newChannelUserName'>
                  Enter Friend's UserName
                </InputLabel>
                <Input required className={classes.input} autoFocus
                       onChange={(e) => this.userTyping('userName', e)}
                       id='newChannelUserName'>
                </Input>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='newChannelMessage'>
                  Enter your message
                </InputLabel>
                <Input required className={classes.input} autoFocus
                       onChange={(e) => this.userTyping('message', e)}
                       id='newChannelMessage'>
                </Input>
              </FormControl>
              <Button fullWidth className={classes.submit} variant='contained'
                      color='primary'
                      type='submit'>Submit</Button>
            </form>
          </Paper>
        </main>
    );
  }

  userTyping = (type, e) => {
    switch (type) {
      case 'channelName':
        this.setState({channelName: e.target.value});
        break;

      case 'userName':
        this.setState({userName: e.target.value});
        break;

      case 'message':
        this.setState({message: e.target.value});
        break;
      default:
        break;
    }
  };

  submitNewChannel = async (e) => {
    e.preventDefault();
    const userExists = await this.userExists();
    if(userExists) {
      const channelExists = await this.channelExists();
      channelExists ? this.goToChannel() : this.createChannel();
    }
    };

  createChannel = () => {
    this.props.newChannelSubmitFn({
      channelName: this.state.channelName,
      sendTo: this.state.userName,
      message: this.state.message,
    });
  };

  goToChannel = () => this.props.goToChannelFn(this.buildDocKey(),
      this.message);

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.userName].sort().join(':');
  };

  channelExists = async () => {
    const docKey = this.buildDocKey();
    const channel = await firebase.firestore()
      .collection('channels')
      .doc(docKey)
      .get();
    console.log(channel.exists);
    return channel.exists;
  };

  userExists = async () => {
    const usersSnapshot = await
      firebase
      .firestore()
      .collection('users')
      .get();
    const exists = usersSnapshot
    .docs
    .map(_doc => _doc.data().email)
    .includes(this.state.userName);
    this.setState({ serverError: !exists });
    return exists;
  }

}

export default withStyles(styles)(NewChannelComponent);