import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class NewChannelComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            message: null
        };
    }

    render() {

        const { classes } = this.props;

        return(
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Send A Message!</Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitNewChannel(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-channel-id'>
                                Enter Your Channel ID
                            </InputLabel>
                            <Input required
                                   className={classes.input}
                                   autoFocus
                                   onChange={(e) => this.userTyping('username', e)}
                                   id='new-channel-id'>
                            </Input>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor='new-chanel-message'>
                                Enter Your Message
                            </InputLabel>
                            <Input required
                                   className={classes.input}
                                   onChange={(e) => this.userTyping('message', e)}
                                   id='new-channel-message'>
                            </Input>
                        </FormControl>
                        <Button fullWidth variant='contained' color='primary' className={classes.submit} type='submit'>Send</Button>
                    </form>
                    {
                        this.state.serverError ?
                            <Typography component='h5' variant='h6' className={classes.errorText}>
                                Unable to locate the user
                            </Typography> :
                            null
                    }
                </Paper>
            </main>
        );
    }
    componentWillMount() {
        if(!firebase.auth().currentUser)
            this.props.history.push('/login');
    }
    userTyping = (inputType, e) => {
        switch (inputType) {
            case 'username':
                this.setState({ username: e.target.value });
                break;

            case 'message':
                this.setState({ message: e.target.value });
                break;
            default:
                break;
        }
    }
    submitNewChannel = async (e) => {
        e.preventDefault();
        const userExists = await this.userExists();
        if(userExists) {
            const channelExists = await this.channelExists();
            channelExists ? this.goToChannel() : this.createChannel();
        }
    }
    buildDocKey = () => [firebase.auth().currentUser.email, this.state.username].sort().join(':');
    createChannel = () => {
        this.props.newChannelSubmitFn({
            sendTo: this.state.username,
            message: this.state.message
        });
    }
    goToChannel = () => this.props.goToChannelFn(this.buildDocKey(), this.state.message);
    chatExists = async () => {
        const docKey = this.buildDocKey();
        const channel = await
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .get();
        console.log(channel.exists);
        return channel.exists;
    }
    userExists = async () => {
        const usersSnapshot = await
            firebase
                .firestore()
                .collection('users')
                .get();
        const exists = usersSnapshot
            .docs
            .map(_doc => _doc.data().email)
            .includes(this.state.username);
        this.setState({ serverError: !exists });
        return exists;
    }
}
export default withStyles(styles)(NewChannelComponent);