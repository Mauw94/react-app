import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom';
import LocatiePage from './locaties/locatie.page';
import DashboardPage from './dashboard/dashboard.page';
import {connect} from 'react-redux';

class Layout extends Component {
    constructor() {
        super();
        this.state = {drawerOpen: false};
    }

    toggleState = () => {
        const currentState = this.state.drawerOpen;
        this.setState({drawerOpen: !currentState});
    }

    render() {
        return (
            <Router>
                <div>
                    <AppBar
                        title={this.props.title}
                        onLeftIconButtonTouchTap={this.toggleState}/>
                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleState}>
                            <Link to="/">Dashboard</Link>
                        </MenuItem>
                        <MenuItem onClick={this.toggleState}>
                            <Link to="/locaties">Locaties</Link>
                        </MenuItem>
                    </Drawer>
                    <Route exact={true} path="/" component={DashboardPage}/>
                    <Route exact={true} path="/locaties" component={LocatiePage}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        title: state.title,
    }
}

export default connect(mapStateToProps)(Layout)

