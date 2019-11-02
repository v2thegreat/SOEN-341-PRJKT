import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChannelViewComponent extends React.Component {

    componentDidUpdate = () => {
        const container = document.getElementById('channelview-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {
        const {classes, channel, user} = this.props;
        if (channel === undefined) {
            return (<main id='channelview-container' className={classes.content}></main>);
        } else {
            return (
                <div>
                    {/*div not working*/}
                    <div className={classes.channelHeader}>
                        Your channel {channel.users.filter(_usr => _usr !== user)[0]}
                    </div>

                    <main id='channelview-container' className={classes.content}>
                        {
                            channel.messages.map((_msg, _index) => {
                                return (
                                    <div key={_index}
                                         className={_msg.sender === user ? classes.userSent : classes.friendSent}>
                                        {_msg.message}
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            )
        }
    }

}
export default withStyles(styles)(ChannelViewComponent);