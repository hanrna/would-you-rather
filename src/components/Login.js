import React from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import '../styles/common.css';
import '../styles/login.css';
import logo from '../resources/images/logo.svg';

class Login extends React.Component {
    state = {
        selectedUser: ''
    };

    handleSignIn = () => {
        this.props.dispatch(setAuthedUser(this.state.selectedUser));
    }

    handleSelectChange = (event) => {
        this.setState({
            selectedUser: event.target.value
        });
    }

    render() {
        return (
            <div className='container login-container'>
                <div className='header grey-background'>Welcome to the Would You Rather App!</div>
                <div className='container-body'>
                    <img src={logo} alt='app logo' />
                    <select value={this.state.selectedUser} className='login-select' onChange={this.handleSelectChange}>
                        <option value='' disabled>please select a user</option>
                        {
                            this.props.existingUsers.map(user => <option key={user} value={user}>{user}</option>)
                        }
                        </select>
                    <button
                        className='btn'
                        onClick={this.handleSignIn}
                        disabled={this.state.selectedUser === ''}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({users}) => ({
    existingUsers: Object.keys(users)
});

export default connect(mapStateToProps)(Login);