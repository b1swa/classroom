import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join';
import Class from './components/class/Class';

const App = () => (

    <Router>
        <Route path="/" exact component={Join} />
        <Route path="/class" exact component={Class} />
    </Router>
);

export default App;