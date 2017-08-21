import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteLocation} from './RouterRedux'

class RouteTab extends Component {

    _setScrollPosition(orientation){
        const routeTabBox = this.refs.routeTabBox;
        const clientWidth = routeTabBox.clientWidth;
        const scrollWidth = routeTabBox.scrollWidth;
        const scrollLeft = routeTabBox.scrollLeft;
        if(orientation == 'left'){
            if(scrollWidth > clientWidth && (scrollWidth - scrollLeft) <= clientWidth){
                routeTabBox.scrollLeft = scrollLeft - clientWidth
            }
        }else{
            if(scrollWidth > clientWidth && (scrollWidth - scrollLeft) > clientWidth){
                routeTabBox.scrollLeft = scrollLeft + clientWidth
            }
        }
    }

    handleTabScrollLeft(e){
        this._setScrollPosition('left');
    }

    handleTabScrollRight(e){
        this._setScrollPosition('right');
    }

    handleTabClose(index){
        history.go(-1);
        this.props.onDeleteLocation(index);
    }

    renderClose(isClose, index) {
        if(isClose){
            return <span className='route-tab-close' title='关闭' onClick={this.handleTabClose.bind(this,index)}>×</span>
        }else{
            return null
        }
    }

    render() {
        const {locations} = this.props;
        return (
            <nav className='route-tab'>
                <div className='route-tab-btn' onClick={this.handleTabScrollLeft.bind(this)}><span className='route-tab-arrow'>←</span></div>
                <div className='route-tab-box no-scrollbar' ref='routeTabBox'>
                    {locations.map((item, index) => {
                        const classStr = item.isactive ? 'route-tab-item active' : 'route-tab-item';
                        const url = '#' + (item.match ? item.match.url : '/');
                        const isClose = item.isClose ? item.isClose : false;
                        return (
                            <div className={classStr} key={index}>
                                <a className='route-tab-title' href={url}>{item.routeName}</a>
                                {this.renderClose(isClose,index)}
                            </div>
                        )
                    })}
                </div>
                <div className='route-tab-btn' onClick={this.handleTabScrollRight.bind(this)}><span className='route-tab-arrow'>→</span></div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {locations: state.router.locations}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteLocation: (locationIndex) => {
            dispatch(deleteLocation(locationIndex))
        }
    }
}

RouteTab = connect(mapStateToProps, mapDispatchToProps)(RouteTab)

export default RouteTab;