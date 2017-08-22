import React from 'react';
import {Route,RouteDOM,RouteTab} from '../src'

import TEST1 from './TEST1'
import TEST2 from './TEST2'
import TEST3 from './TEST3'

const AppRoutes = (
    <section id="content">
        <RouteTab/>
        <Route path="/" component={TEST1} routeName='TEST1'/>
        <Route path="/test2|:params" component={TEST2} routeName='TEST2'/>
        <Route path="/test3|:keep|:params|:routeName" component={TEST3} keepParam="keep" isClose={false}/>
        <RouteDOM/>
    </section>
);

export default AppRoutes;