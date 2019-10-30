import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChannelViewComponent extends React.Component {

    componentDidMount = () => {
        const container = document.getElementById('channelview-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }
    componentDidUpdate = () => {
        const container = document.getElementById('channelview-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {

        const { classes } = this.props;

        if(this.props.channel === undefined) {
            return(<main className={classes.content}></main>);
        } else if(this.props.channel !== undefined) {
            return(
                <div>
                    {/*div not working*/}
                    <div className={classes.channelHeader}>
                        Your conversation with {this.props.channel.users.filter(_usr => _usr !== this.props.user)[0]}
                    </div>
                    <main id='channelview-container' className={classes.content}>
                        {
                            this.props.channel.messages.map((_msg, _index) => {
                                return(
                                    <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent}>
                                        {_msg.message}
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            );
        } else {
            return (<div className='channelview-container'>Loading...</div>);
        }
    }
}

export default withStyles(styles)(ChannelViewComponent);