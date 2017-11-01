import React, {Component} from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
import ActionExplore from 'material-ui/svg-icons/action/explore';
import ActionDone from 'material-ui/svg-icons/action/done';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
    BrowserRouter as Router, Route, Link
} from 'react-router-dom';
import LocatiePage from './locaties/locatie.page';
import LocatieAddPage from './locaties/locatie.add.page';
import ProbleemmeldingPage from './probleemmeldingen/probleemmelding.page';
import ProbleemmeldingAddPage from './probleemmeldingen/probleemmelding.add';
import ProbleemmeldingDetailsPage from './probleemmeldingen/probleemmelding.details';
import StatusmeldingPage from './statusmeldingen/statusmelding.page';
import LocatiePageDetails from './locaties/locatie.details';
import LocatiePageStatus from './locaties/locatie.statuschange';
import DashboardPage from './dashboard/dashboard.page';
import {connect} from 'react-redux';

const style = {
    fontWeight: 'bold',
    backgroundColor: '#fff8c9',
    color: 'black',
    fontSize: '24px'
};

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
                        style={{backgroundColor: '#b3d4fc'}}/>
                    <Drawer open={this.state.drawerOpen}
                            style={{backgroundColor: 'white'}}
                            docked={false}>
                        <Link to="/">
                            <MenuItem onClick={this.toggleState} style={style}>
                                <ActionHome/>
                                Dashboard
                            </MenuItem>
                        </Link>
                        <Link to="/locaties">
                            <MenuItem onClick={this.toggleState} style={style}>
                                <ActionFlightTakeoff/>
                                Locaties
                            </MenuItem>
                        </Link>
                        <Link to="/problemen">
                            <MenuItem onClick={this.toggleState} style={style}>
                                <ActionExplore/>
                                Meldingen
                            </MenuItem>
                        </Link>
                        <Link to="/statussen">
                            <MenuItem onClick={this.toggleState} style={style}>
                                <ActionDone/>
                                Statussen
                            </MenuItem>
                        </Link>
                    </Drawer>
                    <Route exact={true} path="/" component={DashboardPage}/>
                    <Route exact={true} path="/locaties" component={LocatiePage}/>
                    <Route path="/locaties/add" component={LocatieAddPage}/>
                    <Route exact={true} path="/problemen" component={ProbleemmeldingPage}/>
                    <Route path="/problemen/add" component={ProbleemmeldingAddPage}/>
                    <Route exact={true} path="/problemen/details/:id/:locatieid" component={ProbleemmeldingDetailsPage}/>
                    <Route path="/statussen" component={StatusmeldingPage}/>
                    <Route exact={true} path="/locaties/details/:id" component={LocatiePageDetails}/>
                    <Route exact={true} path="/locaties/status/:locatieid/:statusid" component={LocatiePageStatus}/>
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

