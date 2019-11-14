import DashboardComponent from './dashboard/dashboard.js';
import ChannelTextBoxComponent from './channeltextbox/channeltextbox.js'
import LoginComponent from './login/login'
import JoinChannelComponent from './joinchannel/joinchannel.js'
import ChannelListComponent from './channellist/channellist.js'
import ChannelViewComponent from './channelview/channelview.js'
import SignupComponent from './signup/signup'
const assert = require('assert');

it('Checking DashboardComponent', () =>{
    let te = new DashboardComponent.constructor();
    assert.equal(te.name, null);
    assert.equal(te.selectedChannel, null);
    assert.equal(te.email, null);
});

it('Checking ChannelTextBoxComponent', () =>{
    let te = new ChannelTextBoxComponent.constructor();
    assert.equal(te.channelText, null);
});

it('Checking LoginComponent', () =>{
    let te = new LoginComponent.constructor();
    assert.equal(te.email, null);
    assert.equal(te.password, null);
});

it('Checking joinchannel', () =>{
    let te = new JoinChannelComponent.constructor();
    assert.equal(te.channelname, null);
});

it('Checking ChannelListComponent', () =>{
    let te = new ChannelListComponent.constructor();
    assert.equal(te.channelExists, null);
});

it('Checking ChannelViewComponent', () =>{
    let te = new ChannelViewComponent.constructor();
    assert.equal(te.channelExists, null);
});

it('Checking SignupComponent', () =>{
    let te = new SignupComponent.constructor();
    assert.equal(te.email, null);
    assert.equal(te.password, null);
    assert.equal(te.passwordConfirmation, null);
});
