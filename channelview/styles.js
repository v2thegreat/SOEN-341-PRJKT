const styles = theme => ({

  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '5vh',
    width: 'calc(100% - 300px)',
    backgroundColor: '#23272A',
    position: 'absolute'
  },

  userSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#7289DA',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  friendSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#7289DA',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  channelHeader: {
    width: 'calc(100% - 301px)',
    height: '5vh',
    backgroundColor: '#2C2F33',
    position: 'fixed',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '1.25vh',
    boxSizing: 'border-box'
  },

  channelPage: {
    width: 'calc(100% - 300px)',
    height: '100%',
    backgroundColor: '#23272A',
    position: 'fixed',
    marginLeft: '300px',
    fontSize: '50px',
    paddingTop: '1.25vh',
    boxSizing: 'border-box'
  },

  channelTitle: {
    width: 'calc(100% - 301px)',
    top: '45%',
    backgroundColor: '#23272A',
    position: 'fixed',
    fontSize: '50px',
    textAlign: 'center',
    color: 'white'
  },

  webkitscrollbar: {
    width: '10px'
  },

  //   /* Track */
  webkitscrollbartrack: {
    background: '#f1f1f1',
    borderradius: '10px'
  },

  /* Handle */
  webkitscrollbarthumb: {
    background: '#888',
    borderradius: '10px'
  },

  /* Handle on hover */
  webkitscrollbarthumbhover: {
    background: '#555'
  }
})

export default styles
