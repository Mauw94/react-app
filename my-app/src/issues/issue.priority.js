import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class IssuePriorityPage extends React.Component {

    constructor() {
        super();
        this.state = {priorityValue: ''};
    }

    handlePriorityChange = (event, index, priorityValue) => this.setState({priorityValue});

    componentWillMount(){

    }

    render() {
        return (
            <div>
                <DropDownMenu value={this.state.priorityValue} onChange={this.handlePriorityChange}>
                    <MenuItem value={'laag'} primaryText="Laag"/>
                    <MenuItem value={'middelmatig'} primaryText="Middelmatig"/>
                    <MenuItem value={'hoog'} primaryText="Hoog"/>
                </DropDownMenu>
            </div>
        );
    }

    componentDidMount(){

    }
}

const mapStateToProps = (state, ownProps) => {

}

const mapDispatchToProps = (dispatch, ownProps) => {

}

export default (mapStateToProps, mapDispatchToProps)(IssuePriorityPage)