import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/authedUser';
import '../styles/navigationBar.css';

class NavigationBar extends React.Component {
    handleLogOut = () => {
        this.props.dispatch(logout());
    }
    render() {
        return (
            <div className='navbar'>
                <NavLink to='/' exact activeclass='active'>Home</NavLink>
                <NavLink to='/add' activeclass='active'>New Question</NavLink>
                <NavLink to='/leaderboard' activeclass='active'>Leader Board</NavLink>
                <div className={`login-user ${this.props.authorName ? '' : 'hidden' }`}>
                    Hello, {this.props.authorName}
                </div>
                <img className={`avatar login-avatar ${this.props.authorName ? '' : 'hidden' }`} src={this.props.avatarURL} alt='avatar of logged in user'/>
                <NavLink to='#' activeclass='active' className={`logout ${this.props.authorName ? '' : 'hidden' }`} onClick={this.handleLogOut}>Logout</NavLink>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return authedUser !== null
        ? {
            authorName: users[authedUser].name,
            avatarURL: users[authedUser].avatarURL }
        : {};
};

export default withRouter(connect(mapStateToProps)(NavigationBar));