export const makeFetchDuck = (name, url) => {
    const SET = name + '/SET';
    const FETCH_START = name + '/FETCH_START';
    const FETCH_END = name + '/FETCH_END';
    const FETCH_FAIL = name + '/FETCH_FAIL';

    const fetchAsyncActionCreator = () => () =>(dispatch, getState) => {
        dispatch(fetchStartActionCreator());
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(setUsersActionCreator(data))
            })
            .catch(() => dispatch(fetchFailActionCreator()))
            .finally(() => dispatch(fetchEndActionCreator()))
    };

    const setUsersActionCreator = users => ({
        type: SET,
        users,
    });

    const fetchStartActionCreator = () => ({type: FETCH_START});
    const fetchEndActionCreator = () => ({type: FETCH_END});
    const fetchFailActionCreator = () => ({type: FETCH_FAIL});

    const initialState = {
        users: null,
        isLoading: false,
        isError: false,
    };

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET:
                return {
                    ...state,
                    users: action.users,
                };
            case FETCH_START:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                };
            case FETCH_END:
                return {
                    ...state,
                    isLoading: false,
                };
            case FETCH_FAIL:
                return {
                    ...state,
                    isError: true,
                };

            default:
                return state
        }
    };

    return {
        fetchAsyncActionCreator,
        reducer,
    }
};