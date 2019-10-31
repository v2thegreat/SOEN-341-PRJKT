import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChannelListComponent from '../channellist/channellist'
import ChannelViewComponent from '../channelview/channelview';
import ChannelTextBoxComponent from '../channeltextbox/channeltextbox';


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
                    <ChannelTextBoxComponent submitMessageFn={this.submitMessage}></ChannelTextBoxComponent>:
                    null
            }
            <Button className={classes.signOutBtn} onClick={this.signOut} >Sign Out</Button>
        </div>
        );
    }


    signOut = () => firebase.auth().signOut();
    selectChannel = (channelIndex) => {
        this.setState({selectedChannel:channelIndex})
    }


    submitMessage = (msg) => {
        const docKey = this.buildDocKey(this.state.channels[this.state.selectedChannel].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase
            .firestore()
            .collection('channels')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }

    buildDocKey = (user) => {
        [this.state.email, user].sort().join(':');
        }

    newChannelButtonClick = () => this.setState({newChannelFormVisible: true, selectChannel: null});

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