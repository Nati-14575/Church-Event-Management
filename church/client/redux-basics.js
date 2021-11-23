const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};
// Reducer
const reducer = (state = initialState, action) => {
    if (action.type === "INCREMENT") {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === "ADD_COUNTER") {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
};
// Store
const store = createStore(reducer);

// Subscription
store.subscribe(() => {
    console.log(store.getState());
});


// Dispatching
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'ADD_COUNTER', value: 5 });

