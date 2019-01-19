import React from 'react';
import { connect } from 'react-redux';
import { handleSaveNewQuestion } from '../actions/questions';
import '../styles/common.css';
import '../styles/newQuestion.css';

class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    };

    onInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    submitNewQuestion = (event) => {
        event.preventDefault();
        this.props.dispatch(handleSaveNewQuestion({
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: this.props.authedUser
        }));
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='container'>
                <div className='header new-question-header'>Create New Question</div>
                <div className='container-body'>
                    <span>Complete the question:</span>
                    <h2>Would you rather ...</h2>
                    <form>
                        <input
                            className='new-question-input'
                            type='text'
                            name='optionOne'
                            onChange={this.onInputChange}
                            placeholder='Enter option one text here'
                        />
                        <hr className='hr-text' data-content="OR" />
                        <input
                            className='new-question-input'
                            type='text'
                            name='optionTwo'
                            onChange={this.onInputChange}
                            placeholder='Enter option two text here'
                        />
                        <button
                            className='btn'
                            onClick={this.submitNewQuestion}
                            disabled={this.state.optionOne === '' || this.state.optionTwo === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser
});

export default connect(mapStateToProps)(NewQuestion);