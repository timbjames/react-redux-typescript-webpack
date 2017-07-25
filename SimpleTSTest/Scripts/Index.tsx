import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Index extends React.Component<{}, {}>{

    render() {

        return (
            <h1>Here</h1>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('mountNode'));
