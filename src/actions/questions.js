import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';
export const SAVE_NEW_QUESTION = 'SAVE_NEW_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

function saveQuestionAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    };
}

export function handleSaveQuestionAnswer(answer) {
    return (dispatch) => {
        return _saveQuestionAnswer(answer).then(() => {
            dispatch(saveQuestionAnswer(answer));
        });
    };
}

function saveNewQuestion(question) {
    return {
        type: SAVE_NEW_QUESTION,
        question
    };
}

export function handleSaveNewQuestion(question) {
    return (dispatch) => {
        return _saveQuestion(question).then((formattedQuestion) => {
            dispatch(saveNewQuestion(formattedQuestion));
        });
    }
}