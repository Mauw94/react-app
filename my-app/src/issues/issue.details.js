import React from 'react';
import HttpService from '../common/http-service';
import {connect} from 'react-redux';
import mapDispatchTitleToProps from '../common/title-dispatch-to-props';
import {Link} from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    margin: '10px'
};

let fetched = false;

class ProbleemmeldingDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showMessage: false, value: '1'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        const locatieid = this.props.match.params.locatieid;

        if (!fetched) {
            HttpService.getProbleemMeldingById(id).then(fetchedEntry => this.props.setEntry(fetchedEntry));
            HttpService.getLocatieById(locatieid).then(fetchedLocatie => this.props.setLocatie(fetchedLocatie));
            HttpService.getScoreByIdProbleemmelding(id).then(fetchedScore => this.props.setScore(fetchedScore));
            this.checkAfgehandeld();

            fetched = true;

        }
    }

    handlePriorityChange = (event, index, priorityValue) => this.setState({priorityValue});

    checkAfgehandeld() {
        if (this.props.issueEntry.afgehandeld === 1) {
            this.afgehandeld = 'Ja';
        } else {
            this.afgehandeld = 'Nee'
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.score) {
            this.totalescore = parseInt(this.props.scoreEntry.totaleScore, 10) + parseInt(this.state.value, 10);
            this.aantalscore = parseInt(this.props.scoreEntry.aantalScores, 10) + 1;
            HttpService.updateScoreById(parseInt(this.props.scoreEntry.id, 10), parseInt(this.props.match.params.id, 10), this.totalescore, this.aantalscore).then(() => {
                HttpService.getScoreByIdProbleemmelding(this.props.match.params.id).then(fetchedScore => {
                    this.props.setScore(fetchedScore);
                    alert('Score updated.');
                });
            });
        } else {
            HttpService.postScore(parseInt(this.props.match.params.id, 10), parseInt(this.state.value, 10), 1).then(() => {
                HttpService.getScoreByIdProbleemmelding(this.props.match.params.id).then(fetchedScore => {
                    this.props.setScore(fetchedScore);
                    alert('Score created.');
                });

            });

        }

        this.score = parseInt(this.props.scoreEntry.totaleScore, 10) / parseInt(this.props.scoreEntry.aantalScores, 10);

    }

    render() {
        const probleemEntry = this.props.issueEntry;
        const locatieEntry = this.props.locationEntry;
        const scoreEntry = this.props.scoreEntry;
        const message = (
            <div style={{textAlign: 'center', marginTop: '30px'}}>
                <span>Prioriteit aangepast.</span>
            </div>
        );
        fetched = false;

        this.score = parseInt(scoreEntry.totaleScore, 10) / parseInt(scoreEntry.aantalScores, 10);
        console.log('test '+this.score);
        if(isNaN(this.score)){
            this.score = 0;
            console.log('test '+this.score);
        }


        return (
            <div>
                <form onSubmit={this.save} style={{textAlign: 'center', display: 'inline-block'}}>
                    <div className={'form-group'}
                         style={{textAlign: 'left', marginTop: '150px', marginLeft: '120px', padding: '15px'}}>
                        <p style={style}><b>Probleem:</b> {probleemEntry.probleem}</p>
                        <p style={style}><b>Locatie: </b> {locatieEntry.naam}</p>
                        <p style={style}><b>Datum: </b> {probleemEntry.datum}</p>
                        <p style={style}><b>Afgehandeld: </b> {probleemEntry.afgehandeld}</p>
                        <p style={style}><b>Score: </b> {this.score}</p>
                        <div>
                            <p style={style}><b>Priority: </b>{probleemEntry.updownvote}</p>
                            <DropDownMenu value={this.state.priorityValue} onChange={this.handlePriorityChange}>
                                <MenuItem value={'laag'} primaryText="Laag"/>
                                <MenuItem value={'middelmatig'} primaryText="Middelmatig"/>
                                <MenuItem value={'hoog'} primaryText="Hoog"/>
                            </DropDownMenu>
                        </div>
                        <Link to={'/problemen'}>
                            <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}>
                                Back
                            </button>
                        </Link>
                        <button className={'mdl-button mdl-js-button mdl-button--raised mdl-button--colored'}
                                type="submit" style={{margin: '10px'}}>
                            Prioriteit aanpassen
                        </button>
                    </div>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <div className={'form-group'} style={{marginLeft: '130px'}}>
                        <label>
                            Score:
                            <input type="number" min="1" max="5" value={this.state.value} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Beoordeel"
                               className={'mdl-button mdl-js-button mdl-button--raised'}/>
                    </div>
                </form>
                {this.state.showMessage ? message : null}
            </div>
        );
    }

    save = (ev) => {
        ev.preventDefault();
        const probleemEntry = this.props.issueEntry;


        const id = this.props.match.params.id;
        const locatieid = probleemEntry.locatieid;
        const probleem = probleemEntry.probleem;
        const datum = probleemEntry.datum;
        const afgehandeld = probleemEntry.afgehandeld;
        const priority = this.state.priorityValue;
        const userid = probleemEntry.userid;

        HttpService.updateProbleemMelding(id, locatieid, probleem, datum, afgehandeld, priority, userid).then(() => {
            this.props.updateProblem({
                "id": id,
                "locatieid": locatieid,
                "probleem": probleem,
                "datum": datum,
                "afgehandeld": afgehandeld,
                "updownvote": priority,
                "userid": userid
            });
            this.setState({showMessage: true})
        });
    }

    componentDidMount() {
        this.props.setTitle('Details');
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        issueEntry: state.issueEntry,
        locationEntry: state.locationEntry,
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
        setScore: (score) => {
            dispatch({type: 'SET_SCORE_ENTRY', payload: score});
        },
        updateProblem: (issue) => {
            dispatch({type: 'UPDATE_PROBLEEMMELDING_ENTRY', payload: issue})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProbleemmeldingDetailsPage)


