import React from 'react';
import { connect } from 'react-redux';
import '../styles/common.css';
import '../styles/questionList.css';

class QuestionList extends React.Component {
    state = {
        selectedTab: 'unanswered'
    };

    handleTabSelected = (event) => {
        this.setState({
            selectedTab: event.target.dataset.tabkey
        });
    }

    renderTabHeaders = () => {
        const tabs = [
            {
                text: 'Unanswered Questions',
                tabKey: 'unanswered'
            },{
                text: 'Answered Questions',
                tabKey: 'answered'
            }
        ];
        return (
            <div className='tabs'>
                {
                    tabs.map(tab =>
                        <div
                            className={`tab ${this.state.selectedTab === tab.tabKey ? 'grey-background' : ''}`}
                            data-tabkey={tab.tabKey}
                            onClick={this.handleTabSelected}
                            key={tab.tabKey}
                        >
                            {tab.text}
                        </div>
                    )
                }
            </div>
        );
    }

    toQuestion = (event, id) => {
        event.preventDefault();
        this.props.history.push(`/questions/${id}`);
    }

    renderQuestionOverview = (id) => {
        const question = this.props.questions[id];
        const author = this.props.users[question.author];
        return (
            <div key={id} className='question-overview-container'>
                <div className='question-author'>{author.name} asks:</div>
                <div className='question-overview'>
                    <img className='avatar' src={author.avatarURL} alt='avatar of user'></img>
                    <div className='full-width left-splitter'>
                        <h2>Would you rather</h2>
                        <div>...{question.optionOne.text.slice(5, 20)}...</div>
                        <button
                            className='btn view-poll'
                            onClick={(event) => this.toQuestion(event, id)}
                        >
                            View Poll
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { questions, users, authedUser } = this.props;
        const answeredQuestionsIds = Object.keys(users[authedUser].answers);
        const selectedQuestions = this.state.selectedTab === 'answered'
            ? answeredQuestionsIds
            : Object.keys(questions).filter(q => answeredQuestionsIds.indexOf(q) === -1);
        const sortedQuestions = selectedQuestions.sort((a,b) => questions[b].timestamp - questions[a].timestamp);

        return (
            <div className='container'>
                { this.renderTabHeaders() }
                <div className='container-body'>
                { selectedQuestions.length ===0
                    ? <div>No available questions</div>
                    : sortedQuestions.map(id => this.renderQuestionOverview(id)) }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    authedUser,
    questions,
    users
});

export default connect(mapStateToProps)(QuestionList);