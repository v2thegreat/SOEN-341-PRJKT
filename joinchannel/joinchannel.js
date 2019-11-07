import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography } from '@material-ui/core';
import styles from './styles';
const firebase = require("firebase");

class JoinChannelComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            channelname: null
        };
    }
    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">Join Channel</Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitJoinChannel(e)}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="join-channel-channelname">
                                Enter the channel name
                            </InputLabel>
                            <Input required className={classes.input} autoFocus
                                   onChange={(e) => this.userTyping(e)} id='join-channel-channelname'>
                            </Input>
                        </FormControl>
                        <Button fullWidth className={classes.submit} variant='contained' color="primary"
                                type="submit">Submit</Button>
                    </form>
                </Paper>
            </main>
        );

    }

    userTyping = (e) => this.setState({channelname: e.target.value});

    submitJoinChannel = async (e) => {this.joinChannel(); this.goToChannel();}

    joinChannel = () => {
        this.props.joinChannelFn({channelname: this.state.channelname});
    }
    goToChannel = () => this.props.goToChannelFn(this.buildDocKey(), this.message);


    // buildDocKey = () => {
    //     return [firebase.auth().currentUser.email, this.state.username].sort().join(':');
    // }

}
export default withStyles(styles)(JoinChannelComponent);