const styles = theme => ({
  root: {
    backgroundColor: '#2C2F33',
    fontcolor: 'white',
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '5vh',
    width: '300px',
    boxShadow: '0px 0px 2px white'
  },
  listItem: {
    cursor: 'pointer',
    color: 'white'
  },
  newChannelButton: {
    height: '5vh',
    color: 'white',
    backgroundColor: '#7289DA',
    borderRadius: '0px'
  },
  joinChannelButton: {
    height: '5vh',
    color: 'white',
    backgroundColor: '#7289DA',
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'white',
    position: 'absolute',
    top: '2.5vh',
    right: '5px'
  }
})

export default styles
