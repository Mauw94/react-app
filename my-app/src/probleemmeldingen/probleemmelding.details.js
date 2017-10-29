import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';

const style = {
    margin: '10px'
};

let fetched = false;

class ProbleemmeldingDetailsPage extends React.Component {

    componentWillMount() {
        const id = this.props.match.params.id;
        const locatieid = this.props.match.params.locatieid;
        console.log(locatieid);
<<<<<<< HEAD
        if (!fetched) {
            HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
            HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            fetched = true;
=======
        HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
        HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
        HttpService.getScoreByIdProbleemmelding(id).then(fetchedScore => this.props.setScore(fetchedScore));
        this.checkAfgehandeld();
        this.berekenScore();
    }


    checkAfgehandeld() {
        if (this.props.probleemEntry.afgehandeld === 1) {
            this.afgehandeld = 'Ja';
        } else {
            this.afgehandeld = 'Nee'
>>>>>>> master
        }
    }
    berekenScore(){
        console.log("test");
        this.score = this.props.scoreEntry.totaleScore/this.props.scoreEntry.aantalScores;
    }

    render() {
        const fetchedEntry = this.props.probleemEntry;
        const locatieEntry = this.props.locatieEntry;
<<<<<<< HEAD
        console.log('afgehandeld? ' + this.props.probleemEntry.afgehandeld);

        return (
            <div>
                <form>
                    <div className={'form-group'}
                         style={{textAlign: 'left', marginTop: '150px', marginLeft: '120px', padding: '15px'}}>
                        <p style={style}><b>Probleem:</b> {fetchedEntry.probleem}</p>
                        <p style={style}><b>Locatie: </b> {locatieEntry.naam}</p>
                        <p style={style}><b>Datum: </b> {fetchedEntry.datum}</p>
                        <p style={style}><b>Afgehandeld: </b> {fetchedEntry.afgehandeld}</p>
                        <Link to={'/problemen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
=======
        const scoreEntry = this.props.scoreEntry;

        return (
            <form>
                <div className={'form-group'} style={{textAlign: 'center'}}>
                    <h3>Details of probleem melding: {fetchedEntry.id}</h3>
                    <p style={style}>Probleem: {fetchedEntry.probleem}</p>
                    <p style={style}>Locatie: {locatieEntry.naam}</p>
                    <p style={style}>Datum: {fetchedEntry.datum}</p>
                    <p style={style}>Afgehandeld: {this.afgehandeld}</p>
                    <p style={style}>Score: {this.score} </p>
                    <Link to={'/problemen'}>
                        <button className={'btn btn-default'}>Back</button>
                    </Link>
                </div>
            </form>
>>>>>>> master
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
        scoreEntry: state.scoreEntry,
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
        },
        setScore:(score)=>{
            dispatch({type: 'SET_SCORE_ENTRY', payload:score});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingDetailsPage)
