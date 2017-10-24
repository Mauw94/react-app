import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

//let entryFetched = false;

const style = {
    margin: '10px'
};

class ProbleemmeldingDetailsPage extends React.Component {
    constructor() {
        super();
        this.state = {afgehandeld: '',};
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        const locatieid = this.props.match.params.locatieid;
        console.log(locatieid);
        HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
        HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
    }

    checkAfgehandeld() {
        if (this.props.probleemEntry.afgehandeld === 1) {
            this.state = {afgehandeld: "JA"};
        } else {
            this.state = {afgehandeld: "NEE"};
        }
    }

    render() {
        const fetchedEntry = this.props.probleemEntry;
        const locatieEntry = this.props.locatieEntry;
        console.log('afgehandeld? ' + this.props.probleemEntry.afgehandeld);
        this.checkAfgehandeld();
        return (
            <form>
                <div className={'form-group'} style={{textAlign: 'center'}}>
                    <h3>Details of probleem melding: {fetchedEntry.id}</h3>
                    <p style={style}>Probleem: {fetchedEntry.probleem}</p>
                    <p style={style}>Locatie: {locatieEntry.naam}</p>
                    <p style={style}>Datum: {fetchedEntry.datum}</p>
                    <p style={style}>Afgehandeld: {this.state.afgehandeld}</p>
                    <Link to={'/problemen'}>
                        <button className={'btn btn-default'}>Back</button>
                    </Link>
                </div>
            </form>
        );
    }

    componentDidMount() {
        this.props.setTitle('Details');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        probleemEntry: state.probleemEntry,
        locatieEntry: state.locatieEntry,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...mapDispatchTitleToProps(dispatch, ownProps),
        setEntry: (entry) => {
            dispatch({type: 'SET_PROBLEEMMELDING_ENTRY', payload: entry});
        },
        setLocatie: (locatie) => {
            dispatch({type: 'SET_LOCATIE_ENTRY', payload: locatie});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingDetailsPage)
