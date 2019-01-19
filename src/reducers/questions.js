import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, SAVE_NEW_QUESTION } from '../actions/questions';

export default function questions(state = null, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions;
        case SAVE_QUESTION_ANSWER:
            const { qid, answer, authedUser } = action;
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            };
        case SAVE_NEW_QUESTION:
            const { question } = action;
            return {
               ...state,
               [question.id]: question
            };
        default:
            return state;
    }
}