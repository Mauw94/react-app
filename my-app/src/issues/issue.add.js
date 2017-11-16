import React from 'react';
import {connect} from 'react-redux';
import mapDispatchPropsToTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import DropDownMenu from 'material-ui/DropDownMenu';

const style = {
    margin: '10px'
};

let fetched = false;

class ProbleemeldingAddPage extends React.Component {
    constructor() {
        super();
<<<<<<< HEAD
        this.state = {showMessage: false,};
        this.state = {value: null,};
        this.state = {redirect: false};
        this.state = {priorityValue: 'laag'};
        this.state = {location: 'none'}
=======
        this.state = {showMessage: false,value: null,redirect: false,locatieParam: false,priorityValue: 'laag'};
>>>>>>> 340f5c58b1ea03e4235584e598e892b44e2112b1
    }

    componentWillMount() {
        if (!fetched) {
            HttpService.getLocaties().then(fetchedEntries => this.props.setLocations(fetchedEntries));
            fetched = true;
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    handleChangeLocation = (event, index, location) => this.setState({location})

    handlePriorityChange = (event, index, priorityValue) => this.setState({priorityValue});

    render() {
        const locatieid = this.props.match.params.locatieid;
        if (!isNaN(locatieid)) {
            this.setState({locatieParam: true})
        }

        const Menus = (props) => props.entries.map((e) => (
            <MenuItem key={e.id} value={e.id} primaryText={e.naam}/>
        ));

        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center', display: 'inline-block'}}>
                    <h3 style={{marginBottom: '50px'}}>Vul de velden in.</h3>

                    <DropDownMenu value={this.state.location} onChange={this.handleChangeLocation}>
                        <Menus entries={this.props.locationEntries}/>
                        <MenuItem value={'gent'} primaryText="gent"/>
                        <MenuItem value={'brussel'} primaryText="brussel"/>
                    </DropDownMenu>

                    <div className="form-group">
                        <TextField hintText="Locatie id" name="locatieid" type="text" style={style} required/>
                        <TextField hintText="Probleem" name="probleem" type="text" style={style} required/>
                        <DatePicker hintText="Datum" name="datum" style={style}
                                    required/>
                        <SelectField floatingLabelText="Afgehandeld?" value={this.state.value} required
                                     onChange={this.handleChange}>
                            <MenuItem value={false} primaryText={'No'} required/>
                            <MenuItem value={true} primaryText={'Yes'} required/>
                        </SelectField>
                        <DropDownMenu value={this.state.priorityValue} onChange={this.handlePriorityChange}>
                            <MenuItem value={'laag'} primaryText="Laag"/>
                            <MenuItem value={'middelmatig'} primaryText="Middelmatig"/>
                            <MenuItem value={'hoog'} primaryText="Hoog"/>
                        </DropDownMenu>
                    </div>
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        type="submit" style={style}>Add new probleem
                    </button>
                    <Link style={{color: 'black'}}
                          to="/">
                        <button className="mdl-button mdl-js-button'" style={style}>Back
                        </button>
                    </Link>
                </form>
                {this.state.redirect && (<Redirect to={'/'}/>)}
            </div>
        )
    }

    save = (ev) => {
        ev.preventDefault();
        this.setState({redirect: true})
        const locatieid = ev.target['locatieid'].value;
        const probleem = ev.target['probleem'].value;
        const datum = ev.target['datum'].value;
        const afgehandeld = this.state.value;
        const updownvote = this.state.priorityValue;
        const userid = 0;

        HttpService.addProbleemMelding(locatieid, probleem, datum, afgehandeld, updownvote, userid).then(() => {
            this.props.addEntry({
                "locatieid": locatieid,
                "probleem": probleem,
                "datum": datum,
                "afgehandeld": afgehandeld,
                "updownvote": updownvote,
                "userid": userid
            });
        });
        ev.target['locatieid'].value = "";
        ev.target['probleem'].value = "";
        ev.target['datum'].value = "";
    }

    componentDidMount() {
        this.props.setTitle('Add probleemmelding');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locationEntries: state.locationEntries,
        issueEntries: state.issueEntries,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchPropsToTitle(dispatch, ownProps),
        addEntry: (entry) => {
            dispatch({type: 'ADD_PROBLEEMMELDING_ENTRY', payload: entry});
        },
        setLocations: (locaties) => {
            dispatch({type: 'SET_LOCATIE_ENTRIES', payload: locaties});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemeldingAddPage)