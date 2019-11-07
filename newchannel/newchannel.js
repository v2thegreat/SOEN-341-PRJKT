import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class NewChannelComponent extends React.Component {

    constructor() {
      super();
      this.state = {
        channelname: null,
        username: null,
        message: null
      };
    }

    render() {

        const {classes} = this.props;

        return(
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Create Channel</Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitNewChannel(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="new-channel-channelname">
                                Enter Your Channelname
                            </InputLabel>
                            <Input required className={classes.input} autoFocus onChange={(e) => this.userTyping('channelname', e)} id='new-channel-channelname'>
                            </Input>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="new-channel-username">
                                Enter Friend's Username
                            </InputLabel>
                            <Input required className={classes.input} autoFocus onChange={(e) => this.userTyping('username', e)} id='new-channel-username'>
                            </Input>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="new-channel-message">
                                Enter your message
                            </InputLabel>
                            <Input required className={classes.input} autoFocus onChange={(e) => this.userTyping('message', e)} id='new-channel-message'>
                            </Input>
                        </FormControl>
                        <Button fullWidth className={classes.submit} variant='contained' color="primary" type="submit">Submit</Button>
                    </form>
                </Paper>
            </main>
        );
    }

    userTyping = (type, e) => {
        switch (type) {
            case 'channelname':
                this.setState({channelname: e.target.value});
                break;

            case 'username':
              this.setState({username: e.target.value});
              break;

            case 'message':
              this.setState({message: e.target.value});
              break;
            default:
              break;
          }
    }

    submitNewChannel = async (e) => {
        e.preventDefault();
        // const userExists = await this.userExists();
        // if(userExists) {
            const channelExists = await this.channelExists();
            channelExists ? this.goToChannel() : this.createChannel();
        // }
    }

    createChannel = () => {
        this.props.newChannelSubmitFn({
          channelname: this.state.channelname,
          sendTo: this.state.username,
          message: this.state.message
        });
      }

    goToChannel = () => this.props.goToChannelFn(this.buildDocKey(), this.message);

    buildDocKey = () => {
        return [firebase.auth().currentUser.email, this.state.username].sort().join(':');
    }

    channelExists = async () => {
        const docKey = this.buildDocKey();
        const channel = await firebase.firestore().collection('channels').doc(docKey).get();
            console.log(channel.exists);
        return channel.exists;
    }

    //makes sure no 2 channel with same person but that considering 2 people
//     userExists = async () => {
//         const usersSnapshot = await
//         firebase
//           .firestore()
//           .collection('users')
//           .get();
//         const exists = usersSnapshot.docs
//             .map(_doc => _doc.data().email)
//             .includes(this.state.username);
//         //this.setState({ serverError: !exists });
//         return exists;
//       }
//
}

export default withStyles(styles)(NewChannelComponent);