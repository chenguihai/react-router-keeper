import React from 'react';
import {Route,RouteDOM} from '../src'

import TEST1 from './TEST1'
import TEST2 from './TEST2'

const AppRoutes = (
    <section id="content">
        <Route path="/" component={TEST1}/>
        <Route path="/test2|:params" component={TEST2}/>
        <RouteDOM/>
    </section>
);

export default AppRoutes;