import { RECEIVE_USERS } from '../actions/users';
import { SAVE_QUESTION_ANSWER, SAVE_NEW_QUESTION } from '../actions/questions';

export default function users(state = null, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;
        case SAVE_QUESTION_ANSWER:
            const { qid, answer, authedUser } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            };
        case SAVE_NEW_QUESTION:
            const { author } = action.question;
            return {
               ...state,
               [author]: {
                 ...state[author],
                 questions: state[author].questions.concat([action.question.id])
               }
            };
        default:
            return state;
    }
}