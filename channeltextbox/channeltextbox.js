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
        }
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
                <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
            </div>)
    };

    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value});
    messageValid = (txt) => txt && txt.replace(/\s/g,'').length;
    userClickedInput = () => console.log('clicked input');
    submitMessage = () => {
        if(this.messageValid(this.state.channelText)){
            this.props.submitMessageFn(this.state.channelText);
            document.getElementById('channeltextbox').value = '';
        }
    }
}
export default withStyles(styles)(ChannelTextBoxComponent);
