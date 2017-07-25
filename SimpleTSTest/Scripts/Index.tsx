import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Index extends React.Component<{}, {}>{

    render() {

        const Home = () => {
            return <div><h1>Home</h1></div>
        };

        const One = () => {
            return <div><h1>One</h1></div>
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
                        <li><Link to="/two">Two</Link></li>
                    </ul>

                    <hr />

                    <Route exact={ true } path="/" component={ Home } />
                    <Route exact={ true } path="/one" component={ One } />
                    <Route exact={ true } path="/two" component={ Two } />

                </div>

            </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('mountNode'));
