import React, {Component} from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom';
import LocatiePage from './locaties/locatie.page';
import LocatieAddPage from './locaties/locatie.add.page';
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
                        onLeftIconButtonTouchTap={this.toggleState}
                        style={{ backgroundColor: '#f7e122' }}/>
                    <Drawer open={this.state.drawerOpen}
                    style={{backgroundColor: '#fff8c9'}}
                    docked={false}>
                        <MenuItem onClick={this.toggleState} style={{fontWeight: 'bold'}}>
                            <ActionHome/>
                            <Link to="/">Dashboard</Link>
                        </MenuItem>
                        <MenuItem onClick={this.toggleState} style={{fontWeight: 'bold'}}>
                            <ActionFlightTakeoff/>
                            <Link to="/locaties">Locaties</Link>
                        </MenuItem>
                    </Drawer>
                    <Route exact={true} path="/" component={DashboardPage}/>
                    <Route exact={true} path="/locaties" component={LocatiePage}/>
                    <Route path="/locaties/add" component={LocatieAddPage}/>
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

