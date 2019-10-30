import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';

class ChannelListComponent extends React.Component {


    render() {

        const { classes } = this.props;

        if (this.props.channels.length > 0) {
            return (
                <main className={classes.root}>
                    <Button variant='contained'
                        fullWidth 
                        className={classes.newChannelButton}
                        onClick={this.newChannel}>
                        Add Channel
                    </Button>
                    <List>
                        {
                            this.props.channels.map((_channel, _index) => {
                                return (
                                    <div key={_index}>
                                        <ListItem onClick={() => this.selectChannel(_index)}
                                            className={classes.listItem}
                                            selected={this.props.selectedChannelIndex === _index}
                                            alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt='Remy Sharp'>{_channel.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={_channel.users.filter(_user => _user !== this.props.userEmail)[0]}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component='span'
                                                            color='textPrimary'>
                                                            {_channel.messages[_channel.messages.length - 1].message.substring(0, 30) + '...'}
                                                        </Typography>
                                                    </React.Fragment>
                                                } />
                                        </ListItem>
                                        <Divider>

                                        </Divider>
                                    </div>
                                )
                            })
                        }
                    </List>
                </main>);
        } else {
            return (
                <main className={classes.root}>
                    <Button variant='contained'
                        fullWidth
                        onClick={this.newChannel}
                        className={classes.newChannelButton}>
                        Add Channel
                    </Button>
                    <List></List>
                </main>
            )
        }
    }

    newChannel = () => {
        console.log("Create new channel")
    }

    selectChannel = (index) => {
        console.log('Select channel', index);
    }
}

export default withStyles(styles)(ChannelListComponent)