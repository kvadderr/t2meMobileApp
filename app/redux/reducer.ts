import { SET_USER_FAVORITE, SET_USER, SET_BALANCE, SET_BONUS, SET_ONLINE_OPERATOR_LIST } from './actions';

const initialState = {
    favorite: [],
    user: {},
    onlineOperatorList: [],
    balance: 0,
    bonus: 0
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_FAVORITE:
            return { ...state, favorite: action.payload };
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_BALANCE:
            return { ...state, balance: action.payload };
        case SET_BONUS:
            return { ...state, bonus: action.payload };
        case SET_ONLINE_OPERATOR_LIST:
            return { ...state, onlineOperatorList: action.payload };
        default:
            return state;
    }
}

export default userReducer;