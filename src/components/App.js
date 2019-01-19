import React, { Component } from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import Question from './Question';
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import NavigationBar from './NavigationBar';
import { NotFound } from './NotFound';
import { handleInitialData } from '../actions/shared'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    {!this.props.loading &&
                        (this.props.authedUser === null
                        ? <Login />
                        : <div>
                            <Switch>
                                <Route path='/' exact component={QuestionList} />
                                <Route path='/questions/:questionId' component={Question} />
                                <Route path='/add' component={NewQuestion} />
                                <Route path='/leaderboard' component={LeaderBoard} />
                                <Route component={NotFound} />
                            </Switch>
                        </div>)
                    }
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = ({ authedUser, users, questions }) => ({
    loading: users === null || questions === null,
    authedUser
});

export default connect(mapStateToProps)(App);
