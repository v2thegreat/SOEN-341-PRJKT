import { red } from "@material-ui/core/colors";
import { withTheme } from "@material-ui/styles";

const styles = theme => ({
    root: {
      backgroundColor: '#2C2F33',
      color: 'white',
      position: 'absolute',
      left: '0',
      top: '0',
      bottom: '5vh',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    listItem: {
      cursor: 'pointer'
    },
    newChannelButton: {
      height: '5vh',
      color: 'white',
      backgroundColor: '#7289DA',
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'navyblue',
      position: 'absolute',
      top: '2.5vh',
      right: '5px'
    }
  });
  
  export default styles;