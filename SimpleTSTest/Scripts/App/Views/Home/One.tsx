import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IRouteParams extends RouteComponentProps<{ id: number }> { }

export const One = (props: IRouteParams) => {

    return (
        <div><h1>Page One</h1></div>
    );
}
