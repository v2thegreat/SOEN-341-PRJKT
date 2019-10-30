import React from 'react';
import ChannelListComponent from '../channellist/channellist'

const firebase = require("firebase");

class DashboardComponent extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedChannel: null,
            newChannelFormVisible: false,
            email: null,
            channels: []
        }
    }

    render() {
        return(
        <div>
            <ChannelListComponent history={this.props.history} newChannelButton={this.newChannelButtonClick} selectChannelButton={this.selectChannel} channels={this.state.channels}
            userEmail={this.state.email} selectedChannelIndex selectedChannelIndex={this.state.selectedChannel}></ChannelListComponent>    
        </div>  
        );
    }

    selectChannel = (channelIndex) => {
        console.log('Select channel', channelIndex)
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

export default DashboardComponent;