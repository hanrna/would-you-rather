import React from 'react';
import { connect } from 'react-redux';
import '../styles/common.css';
import '../styles/leaderBoard.css';

class LeaderBoard extends React.Component {
    render() {
        return (
            <div>
                {this.props.userList.map(user => (
                   <div className='container leader-user-container' key={user.id}>
                       <img className='avatar' src={user.avatarURL} alt='avatar of user'/>
                       <div className='left-splitter leader-user-info'>
                           <h3>{user.name}</h3>
                           <div className='question-count'>Answered questions {Object.keys(user.answers).length}</div>
                           <hr/>
                           <div className='question-count'>Created questions {user.questions.length}</div>
                       </div>
                       <div className='left-splitter'>
                           <div className='score-container'>
                               <div className='score-header full-width grey-background'>Score</div>
                               <div className='score'>
                                   <span className='score-text'>{Object.keys(user.answers).length + user.questions.length}</span>
                                   <div className='score-circle'/>
                               </div>
                           </div>
                       </div>
                   </div>
               ))}
            </div>
        );
    }
}

const mapStateToProps = ({users}) => ({
    userList: Object.values(users)
        .sort((a,b) =>
            Object.keys(b.answers).length + b.questions.length - Object.keys(a.answers).length - a.questions.length
        )
});

export default connect(mapStateToProps)(LeaderBoard);