import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

interface IMatch extends RouteComponentProps<{ id: number }> { }

class Index extends React.Component<{}, {}>{

    render() {

        const Home = () => {
            return <div><h1>Home</h1></div>
        };

        const One = (props: IMatch) => {
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
                        <li><Link to="/one/1">One dot 1</Link></li>
                        <li><Link to="/two">Two</Link></li>
                    </ul>

                    <hr />

                    <Route path="/" component={ Home } />
                    <Route path="/one/:id?" component={ One } />
                    <Route path="/two" component={ Two } />

                </div>

            </Router>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('mountNode'));
