import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteProps } from 'react-router';
import { BrowserRouter as Router, Route, RouteComponentProps, Link } from 'react-router-dom';

import { combineReducers } from 'redux';
import { createAction, handleActions, Action } from 'redux-actions';

import { ReduxContainerBuilder } from './ReduxContainer';

interface IRouteParams extends RouteComponentProps<{ id: number }> { }

class MyRoute extends Route<RouteProps> { }

interface IAreaState {
    name: string;
}

interface IMyActions {
    doSomething: () => void;
    receive: (name: string) => void;
}

const initialState = (): IAreaState => {
    return {
        name: ''
    };
}

class MyActions implements IMyActions {

    public doSomething = () => (dispatch: any): void => {

        dispatch(this.receive('tim'));
    }

    public receive = createAction('TEST', (name: string) => name);
}

const actionsDispatcherFactor = (dispatch: any): IMyActions => {

    const localActions = new MyActions();

    return {
        doSomething: () => {
            dispatch(localActions.doSomething());
        },
        receive: (name: string) => {
            dispatch(localActions.receive(name));
        }
    }
}

const areaStateReducer = handleActions<IAreaState>({

    'TEST': (state: IAreaState, action: Action<string>): IAreaState => {

        return { name: action.payload };
    }

}, initialState());

const rootReducer = combineReducers({
    areaState: areaStateReducer
});

interface IReduxComponentProps extends React.Props<ReduxComponent> {
    areaActions: IMyActions;
    areaState: IAreaState;
}

class PageComponent extends React.Component<IReduxComponentProps, {}>{

    render() {

        const { areaActions, areaState } = this.props;

        return (
            <div>
                <h1>State Object Yo {areaState.name}</h1>
                <button onClick={() => {
                    areaActions.doSomething();
                }}>CLick Me</button>
            </div>
        );
    }
}

class ReduxComponent extends React.Component<IReduxComponentProps, {}>{

    render() {

        const ReduxWrapper = () => {
            return ReduxContainerBuilder().NoneProps({
                mapDispatchToProps: (dispatch: any) => ({
                    areaActions: actionsDispatcherFactor(dispatch)
                }),
                mapStateToProps: (state: any) => ({
                    areaState: state.areaState
                }),
                pageComponent: PageComponent,
                rootReducer: rootReducer
            });
        };

        return (
            <ReduxWrapper />
        );
    }
}

class Index extends React.Component<{}, {}>{

    render() {

        const Home = () => {
            return <div><h1>Home</h1></div>
        };

        const One = (props: IRouteParams) => {

            return <div><h1>One { props.match.params && props.match.params.id }</h1></div>
        };

        const Two = () => {
            return <div><h1>Two</h1></div>
        };

        return (
            <Router>

                <div>

                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/one">One</Link></li>
                        <li><Link to="/one/1">One dot 1</Link></li>
                        <li><Link to="/two">Two</Link></li>
                        <li><Link to="/reduxyo">Redux</Link></li>
                    </ul>

                    <hr />

                    <MyRoute path="/home" component={ Home } />
                    <MyRoute path="/one/:id?" component={ One } />
                    <MyRoute path="/two" component={Two} />
                    <MyRoute path="/reduxyo" component={ReduxComponent } />

                </div>

            </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('mountNode'));
