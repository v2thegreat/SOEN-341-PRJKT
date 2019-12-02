import React from 'react';
import styles from './styles';
import {withStyles} from '@material-ui/core/styles';

class ChannelViewComponent extends React.Component {

  componentDidUpdate = () => {
    const container = document.getElementById('channelViewContainer');
    if (container)
      container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const {classes, channel, user} = this.props;

    if (channel === undefined) {
      return (<div className={classes.channelPage}>
        <div className={classes.channelTitle}>WELCOME TO SOEN 341</div>
      </div>);
    } else {
      return (
          <div>
            <div className={classes.channelHeader}>
              Your channel {channel.channelName}
            </div>

            <main id='channelViewContainer' className={classes.content}>
              {
                channel.messages.map((_msg, _index) => {
                  return (
                      <div key={_index}
                           className={_msg.sender === user
                               ? classes.userSent
                               : classes.friendSent}>
                        {_msg.sender} says:<br/>
                        {_msg.message}
                      </div>
                  );
                })
              }
            </main>
          </div>
      );
    }
  }

}

export default withStyles(styles)(ChannelViewComponent);