import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteProps } from 'react-router';
import { BrowserRouter as Router, Route, RouteComponentProps, Link } from 'react-router-dom';

interface IRouteParams extends RouteComponentProps<{ id: number }> { }

class MyRoute extends Route<RouteProps> {}

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
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/one">One</Link></li>
                        <li><Link to="/one/1">One dot 1</Link></li>
                        <li><Link to="/two">Two</Link></li>
                    </ul>

                    <hr />

                    <MyRoute path="/" component={ Home } />
                    <MyRoute path="/one/:id?" component={ One } />
                    <MyRoute path="/two" component={ Two } />

                </div>

            </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('mountNode'));
