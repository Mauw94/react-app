import React from 'react';
import {connect} from 'react-redux';
import mapDispatchPropsToTitle from '../common/title-dispatch-to-props';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import HttpService from '../common/http-service';
import {Link} from 'react-router-dom';

const style = {
    margin: '10px'
};

class ProbleemeldingAddPage extends React.Component {
    constructor() {
        super();
        this.state = {showMessage: false};
    }

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
                        <DatePicker hintText="Datum" name="datum" style={style} errorText={'Please choose a date'} required/>
                        <TextField hintText={'Afgehandeld? 0:1'} name={'afgehandeld'} type={'number'} required/>
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
        const afgehandeld = ev.target['afgehandeld'].value;

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
        ev.target['afgehandeld'].value = "";
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