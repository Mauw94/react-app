import React from 'react';
import {connect} from 'react-redux';
import mapDispatchPropsToTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';

const style = {
    margin: '10px'
};

class ProbleemeldingAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false,};
        this.state = {value: 0,};
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        const message = (
            <div style={{textAlign: 'center'}}><span>Entry toegevoegd!</span></div>
        );
        return (
            <div style={{marginTop: '50px'}}>
                <form onSubmit={this.save} style={{textAlign: 'center', display: 'inline-block'}}>
                    <h3 style={{marginBottom: '50px'}}>Vul de velden in.</h3>
                    <div className="form-group">
                        <TextField hintText="Locatie id" name="locatieid" type="text" style={style} required/>
                        <TextField hintText="Probleem" name="probleem" type="text" style={style} required/>
                        <DatePicker hintText="Datum" name="datum" style={style}
                                    required/>
                        <SelectField floatingLabelText="Afgehandeld?" value={this.state.value} required
                                     onChange={this.handleChange}>
                            <MenuItem value={0}>Nee</MenuItem>
                            <MenuItem value={1}>Ja</MenuItem>
                        </SelectField>
                    </div>
                    <button className="btn btn-default" type="submit" style={style}>Add new probleem</button>
                    <button className="btn btn-primary" style={style}><Link style={{color: 'white'}}
                                                                            to="/problemen">Back</Link>
                    </button>
                </form>
                {this.state.showMessage ? message : null}
            </div>
        );
    }

    save = (ev) => {
        ev.preventDefault();
        const locatieid = ev.target['locatieid'].value;
        const probleem = ev.target['probleem'].value;
        const datum = ev.target['datum'].value;
        const afgehandeld = this.state.value;

        HttpService.addProbleemMelding(locatieid, probleem, datum, afgehandeld).then(() => {
            this.props.addEntry({
                "locatieid": locatieid,
                "probleem": probleem,
                "datum": datum,
                "afgehandeld": afgehandeld
            });
            this.setState({showMessage: true})
        });
        ev.target['locatieid'].value = "";
        ev.target['probleem'].value = "";
        ev.target['datum'].value = "";
    }

    componentDidMount() {
        this.props.setTitle('Add probleem melding');
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchPropsToTitle(dispatch, ownProps),
        addEntry: (entry) => {
            dispatch({type: 'ADD_PROBLEEMMELDING_ENTRY', payload: entry});
        }
    }
}

export default connect(undefined, mapDispatchToProps)(ProbleemeldingAddPage)