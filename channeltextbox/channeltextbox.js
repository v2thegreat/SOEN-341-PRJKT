import React from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChannelTextBoxComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            channelText:''
        }; //FORGOT ;
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.channelTextBoxContainer}>
                <TextField placeholder='Type your message...'
                           onKeyUp={(e) => this.userTyping(e)}
                           id='channeltextbox'
                           className={classes.channelTextBox}
                           onFocus={this.userClickedInput}></TextField>
                <Send onClick={this.submitMessage} className={classes.sendButton}></Send>
            </div>)
    };
    //MISTAKE CHATTEXT => CHANNELTEXT
    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({channelText: e.target.value});

    messageValid = (text) => text && text.replace(/\s/g,'').length;

    userClickedInput = () => this.props.messageReadFn();

    submitMessage = () => {
        if(this.messageValid(this.state.channelText)){
            this.props.submitMessageFn(this.state.channelText);
            document.getElementById('channeltextbox').value = '';
        }
    }
}
export default withStyles(styles)(ChannelTextBoxComponent);
