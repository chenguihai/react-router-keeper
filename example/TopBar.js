import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {changeThemeColor} from './MainRedux'

class TopBar extends Component {

    static propTypes = {
        themeColor: PropTypes.string,
        onChangeThemeColor: PropTypes.func
    }

    handleChangeThemeColor(color) {
        if (this.props.onChangeThemeColor) {
            this
                .props
                .onChangeThemeColor(color)
        }
    }

    render() {
        return (
            <header className="topbar clearfix" data-mb-theme={this.props.themeColor}>

                <div className="topbar-title">
                    <a href="#">React-Router-Keeper Example</a>
                </div>

                <button
                    className="btn bg-blue"
                    onClick={this
                    .handleChangeThemeColor
                    .bind(this, 'blue')}>blue</button>
                <button
                    className="btn bg-green"
                    onClick={this
                    .handleChangeThemeColor
                    .bind(this, 'green')}>green</button>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {themeColor: state.Main.themeColor}
}
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeThemeColor: (color) => {
            dispatch(changeThemeColor(color))
        }
    }
}
TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBar)

export default TopBar;