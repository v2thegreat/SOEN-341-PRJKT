import { red } from "@material-ui/core/colors";
import { withTheme } from "@material-ui/styles";

const styles = theme => ({
    root: {
      backgroundColor: '#2C2F33',
      color: 'white',
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    listItem: {
      cursor: 'pointer'
    },
    newChannelButton: {
      color: 'white',
      backgroundColor: '#7289DA',
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    }
  });
  
  export default styles;