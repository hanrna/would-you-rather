import { _getUsers, _getQuestions } from '../utils/_DATA';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export function handleInitialData() {
    return (dispatch) => {
        const usersPromise = _getUsers();
        const questionsPromise = _getQuestions();
        Promise.all([usersPromise, questionsPromise]).then(
            ([users, questions]) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            }
        );
    }
}