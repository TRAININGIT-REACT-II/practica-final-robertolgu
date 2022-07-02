import types from '../actions/types';


const initialState = {
    username: "",
    id: "",
    token: ""
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
      case types.UPDATE_USER:
        return {
          username: action.user.username,
          id: action.user.id,
          token: action.user.token
        };
      default:
        return state;
    }
}
export default reducer;