import {Link} from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require('firebase');

class LoginComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      serverError: false,
    };
  }

  render() {

    const {classes} = this.props;

    return (
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>
              Log In!
            </Typography>
            <form onSubmit={(e) => this.submitLogin(e)}
                  className={classes.form}>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='loginEmailInput'>Enter Your
                  Email</InputLabel>
                <Input autoComplete='email' autoFocus
                       onChange={(e) => this.userTyping('email', e)}
                       id="loginEmailInput"></Input>
              </FormControl>
              <FormControl required fullWidth margin='normal'>
                <InputLabel htmlFor='loginPasswordInput'>Enter Your
                  Password</InputLabel>
                <Input autoComplete='currentPassword' type='password'
                       onChange={(e) => this.userTyping('password', e)}
                       id='loginPasswordInput'></Input>
              </FormControl>
              <Button type='submit' fullWidth variant='contained'
                      color='primary' className={classes.submit}>Log In</Button>
            </form>
            {this.state.serverError ?
                <Typography className={classes.errorText} component='h5'
                            variant='h6'>
                  Incorrect Login Information
                </Typography> :
                null
            }
            <h5 className={classes.noAccountHeader}>Don't Have An Account? <Link
                to='/signup'>Register</Link></h5>
          </Paper>
        </main>
    );
  }

  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case 'email':
        this.setState({email: event.target.value});
        break;
      case 'password':
        this.setState({password: event.target.value});
        break;
      default:
        break;
    }
  };
  submitLogin = async (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    await firebase.auth().
        signInWithEmailAndPassword(this.state.email, this.state.password).
        then(() => {
          this.props.history.push('/dashboard');
        }, err => {
          this.setState({serverError: true});
          console.log('Error logging in: ', err);
        });
  };
}

export default withStyles(styles)(LoginComponent);