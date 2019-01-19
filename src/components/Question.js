import React from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/questions';
import { NotFound } from './NotFound';
import '../styles/common.css';
import '../styles/question.css';

class Question extends React.Component {
    renderQuestionVoteResults = () => {
        const vote1 = this.props.question.optionOne.votes.length;
        const vote2 = this.props.question.optionTwo.votes.length;
        const options = [{
            text: this.props.question.optionOne.text,
            total: vote1 + vote2,
            voteCount: vote1,
            voted: this.props.answer && this.props.answer === 'optionOne',
            key: 'optionOne'
        },{
            text: this.props.question.optionTwo.text,
            total: vote1 + vote2,
            voteCount: vote2,
            voted: this.props.answer && this.props.answer === 'optionTwo',
            key: 'optionTwo'
        }];
        return (
            <div>
                <h2>Results:</h2>
                {
                    options.map(option =>
                        <div key={option.key} className={`option ${option.voted ? 'voted' : ''}`}>
                            <div className='optionText'>{`Would you rather ${option.text}?`}</div>
                            { option.total !== 0 &&
                                <div className='bar'>
                                    <div className='progress' style={{width: `calc(100% / ${option.total} * ${option.voteCount})`}}>
                                        {option.voteCount !== 0 && <span className='percentage'>{(option.voteCount*100/option.total).toFixed(1)}%</span>}
                                    </div>
                                </div>
                            }
                            <div className='votes-overview'>{`${option.voteCount} out of ${option.total} votes`}</div>
                            {option.voted && <div className='your-vote-container'>
                                <span className='your-vote-text'>Your vote</span>
                            </div>}
                        </div>
                    )
                }
            </div>
        );
    }

    submitAnswer = () => {
        const {id, authedUser} = this.props;
        const answer = document.querySelector('input[name="answer"]:checked').value;
        this.props.dispatch(handleSaveQuestionAnswer({
            authedUser,
            qid: id,
            answer
        }));
    }

    renderQuestionDetail = () => {
        return (
            <div>
                <h2>Would you rather...</h2>
                <div>
                    <div>
                        <input type="radio" name="answer" value="optionOne" defaultChecked />
                        <label htmlFor="optionOne">{this.props.question.optionOne.text}</label>
                    </div>
                    <div>
                        <input type="radio" name="answer" value="optionTwo" />
                        <label htmlFor="optionTwo">{this.props.question.optionTwo.text}</label>
                    </div>
                </div>
                <button
                    className='btn'
                    onClick={this.submitAnswer}
                >
                    Submit
                </button>
            </div>
        );
    }
    render() {
        const { id, author } = this.props;
        return author
        ?(
            <div key={id} className='container'>
                <div className='question-author'>Asked by {author.name}</div>
                <div className='container-body question-detail'>
                    <img className='avatar' src={author.avatarURL} alt='avatar of user'></img>
                    <div className='full-width left-splitter'>
                        { this.props.answer
                        ? this.renderQuestionVoteResults()
                        : this.renderQuestionDetail() }
                    </div>
                </div>
            </div>
        )
        : <NotFound />;
    }
}


const mapStateToProps = ({ authedUser, users, questions }, props) => {
    const { questionId } = props.match.params;
    const question = questions[questionId];
    const answer = users[authedUser].answers[questionId] || null;

    return {
        authedUser,
        id: questionId,
        author: question ? users[question.author] : null,
        question,
        answer
    };
}

export default connect(mapStateToProps)(Question);