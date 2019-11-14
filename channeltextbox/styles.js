const styles = theme => ({

  sendButton: {
    color: 'darkblue',
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },

  channelTextBoxContainer: {
    position: 'fixed',
    bottom: '10px',
    left: '315px',
    boxSizing: 'border-box',
    overflow: 'auto',
    width: 'calc(100% - 300px - 50px)'
  },

  channelTextBox: {
    width: 'calc(100% - 25px)'
  }

})

export default styles
