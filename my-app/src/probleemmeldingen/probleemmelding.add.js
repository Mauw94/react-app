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

const style = {
    margin: '10px'
};

let fetched = false;

class ProbleemeldingAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false,};
        this.state = {value: null,};
        this.state = {redirect: false}
        this.state = {locatieParam: false}
    }

    componentWillMount() {
        if (!fetched) {
            HttpService.getLocaties().then(fetchedEntries => this.props.setEntries(fetchedEntries));
            fetched = true;
        }
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const locatieid = this.props.match.params.locatieid;
        if (!isNaN(locatieid)) {
            this.setState({locatieParam: true})
        }
        const message = (
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <span>Locatie id is: {locatieid}</span>
            </div>
        );
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center', display: 'inline-block'}}>
                    <h3 style={{marginBottom: '50px'}}>Vul de velden in.</h3>
                    {this.state.locatieParam ? message : null}
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
                {this.state.redirect && (<Redirect to={'/problemen'}/>)}
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
        const updownvote = 0;

        HttpService.addProbleemMelding(locatieid, probleem, datum, afgehandeld, updownvote).then(() => {
            this.props.addEntry({
                "locatieid": locatieid,
                "probleem": probleem,
                "datum": datum,
                "afgehandeld": afgehandeld,
                "updownvote": updownvote
            });
        });
        ev.target['locatieid'].value = "";
        ev.target['probleem'].value = "";
        ev.target['datum'].value = "";
    }

    componentDidMount() {
        this.props.setTitle('Add probleemmelding.');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        locatieEntries: state.locatieEntries,
        probleemEntries: state.probleemEntries,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchPropsToTitle(dispatch, ownProps),
        addEntry: (entry) => {
            dispatch({type: 'ADD_PROBLEEMMELDING_ENTRY', payload: entry});
        },
        setEntries: (locaties) => {
            dispatch({type: 'SET_LOCATIE_ENTRIES', payload: locaties});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemeldingAddPage)