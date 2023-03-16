export const SET_USER_FAVORITE = 'SET_USER_FAVORITE';
export const SET_USER = 'SET_USER';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_BONUS = 'SET_BONUS';
export const SET_ONLINE_OPERATOR_LIST = 'SET_ONLINE_OPERATOR_LIST';

export const setFavorite = favorite => dispatch => {
    dispatch({
        type: SET_USER_FAVORITE,
        payload: favorite,
    });
};

export const setUser = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user,
    });
};

export const setBalance = balance => dispatch => {
    dispatch({
        type: SET_BALANCE,
        payload: balance,
    });
};

export const setBonus = bonus => dispatch => {
    dispatch({
        type: SET_BONUS,
        payload: bonus,
    });
};

export const setOnlineOperatorList = onlineOperatorList => dispatch => {
    dispatch({
        type: SET_ONLINE_OPERATOR_LIST,
        payload: onlineOperatorList,
    });
};