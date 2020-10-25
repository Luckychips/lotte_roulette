import React from 'react';
import {Route} from 'react-router-dom';
import {Home, Event} from '../pages';

function App() {
    return (
        <>
            <Route exact path="/" component={Home} />
            <Route path="/event" component={Event} />
        </>
    );
}

export default App;
