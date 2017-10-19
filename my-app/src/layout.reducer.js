const initialState = {
    locatieEntries: []
};

const layoutreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {...state, ...{title: action.payload}};
        case 'SET_LOCATIE_ENTRIES':
            return {...state, ...{locatieEntries: action.payload}};
        case 'ADD_LOCATIE_ENTRY':
            return {...state, ...{locatieEntries: [...state.locatieEntries, action.pay]}};
        case 'DELETE_LOCATIE_ENTRY':
            const id = action.payload;
            const entryToDeleteIndex = state.locatieEntries.findIndex(e => e.id === id);
            const locatieEntries = [...state.locatieEntries.slice(0, entryToDeleteIndex),
                ...state.locatieEntries.slice(entryToDeleteIndex + 1)];
            return {...state, ...{locatieEntries: locatieEntries}};
        default:
            return state;
    }
}

export default layoutreducer;