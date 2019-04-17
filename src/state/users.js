import {makeFetchDuck} from './makeFetchDuck'

const {
    fetchAsyncActionCreator,
    reducer
} = makeFetchDuck('users', 'https://randomuser.me/api?results=10');

export const fetchUsersAsyncActionCreator = fetchAsyncActionCreator();

export default reducer;
