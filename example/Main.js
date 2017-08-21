import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import TopBar from './TopBar'

import AppRoutes from './AppRoutes'

class AppMain extends Component {

    static propTypes = {
        themeColor: PropTypes.string
    }

    render() {
        return (
            <div id="main">
                <TopBar
                    themeColor={this.props.themeColor}/>
                <div className="link">
                    <a href="#/">TEST1</a>
                    <a href="#/test2|hello_test2">TEST2</a>
                    <a href="#/test3|keep|hello_test3|Hello3">TEST3(Hello3)</a>
                    <a href="#/test3|keep|hello_test4|Hello4">TEST3(Hello4)</a>
                </div>
                {AppRoutes}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {themeColor: state.Main.themeColor}
}

AppMain = connect(mapStateToProps)(AppMain)

export default AppMain;