import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChannelListComponent from '../channellist/channellist'
import ChannelViewComponent from '../channelview/channelview';
import ChannelTextBoxComponent from '../channeltextbox/channeltextbox';
import NewChannelComponent from '../newchannel/newchannel';
const firebase = require("firebase");

class DashboardComponent extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedChannel: null,
            newChannelFormVisible: false,
            email: null,
            channels: [],
            friends:[]
        }
    }

    render() {
        const { classes } = this.props;
        return(
        <div>
            <ChannelListComponent history={this.props.history}
                                  newChannelButton={this.newChannelButtonClick}
                                  selectChannelButton={this.selectChannel}
                                  channels={this.state.channels}
                                  userEmail={this.state.email}
                                  selectedChannelIndex={this.state.selectedChannel}></ChannelListComponent>
            {
                this.state.newChannelFormVisible ?
                    null:
                    <ChannelViewComponent
                    user={this.state.email}
                    channel={this.state.channels[this.state.selectedChannel]}
                    ></ChannelViewComponent>
            }
            {
                this.state.selectedChannel !== null && !this.state.newChannelFormVisible ?
                    <ChannelTextBoxComponent messageReadFn={this.messageRead} submitMessageFn={this.submitMessage}></ChannelTextBoxComponent>:
                    null
            }
            {
                this.state.newChannelFormVisible ? <NewChannelComponent goToChannelFn={this.goToChannel} newChannelSubmitFn={this.newChannelSubmit}></NewChannelComponent> : null
            }
            <Button className={classes.signOutBtn} onClick={this.signOut} >Sign Out</Button>
        </div>
        );
    }

    signOut = () => firebase.auth().signOut();
    
    selectChannel = async (channelIndex) => {
        await this.setState({selectedChannel: channelIndex})
        this.messageRead();
    }

    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.channels[this.state.selectedChannel].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase.firestore().collection('channels').doc(docKey).update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                //wrong key word
                seenMessage: false
            });
    }
    //BUILD DOC KEY NO PROPERLY FORMATTED
    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

    newChannelButtonClick = () => this.setState({newChannelFormVisible: true, selectChannel: null});

    messageRead = () => {
        const docKey = this.buildDocKey(this.state.channels[this.state.selectedChannel].users.filter(_usr => _usr !== this.state.email)[0]);
        if(this.clickedChannelNotSender(this.state.selectedChannel)) {
            firebase.firestore().collection('channels').doc(docKey).update({seenMessage: true})
        } else {
            console.log('clicked message where user is sender');
        }
    }

    goToChannel = async (docKey, msg) => {
        const usersInChannel = docKey.split(':');
        const channel = this.state.chats.find(_channel => usersInChannel.every(_user => _channel.users.includes(_user)));
        this.setState({newChannelFormVisible: false});
        await this.selectChannel(this.state.channels.indexOf(channel));
        this.submitMessage(msg);
    }

    // newChannelSubmit = async (channelObj) => {
    //     const docKey = this.buildDocKey(channelObj.sendTo);
    //     await firebase.firestore().collection('channels').doc(docKey).set({
    //         seenMessage: false,
    //         users: [this.state.email, channelObj.sendTo],
    //         messages: [{
    //             message: channelObj.message,
    //             sender: this.state.email
    //         }]
    //     })
    //     this.setState({newChannelFormVisible: false});
    //     this.selectChannel(this.state.channels.length - 1);
    // }

    newChannelSubmit = async (channelObj) => {
        const docKey = this.buildDocKey(channelObj.sendTo);
        await 
          firebase
            .firestore()
            .collection('channels')
            .doc(docKey)
            .set({
              messages: [{
                message: channelObj.message,
                sender: this.state.email
              }],
              users: [this.state.email, channelObj.sendTo],
              messageRead: false
            })
        this.setState({ newChannelFormVisible: false });
        this.selectChannel(this.state.channels.length - 1);
      }

    clickedChannelNotSender = (channelIndex) => this.state.channels[channelIndex].messages[this.state.channels[channelIndex].messages.length-1].sender !== this.state.email;

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _user => {
          if(!_user)
            this.props.history.push('/login');
          else {
            await firebase
              .firestore()
              .collection('channels')
              .where('users', 'array-contains', _user.email)
              .onSnapshot(async res => {
                const channels = res.docs.map(_doc => _doc.data());
                await this.setState({
                  email: _user.email,
                  channels: channels,
                  friends: []
                });
                console.log(this.state);
              })
          }
      });
    }
}

export default withStyles(styles)(DashboardComponent);