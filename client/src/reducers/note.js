import types from '../actions/types';

const initialState = {
  list: []
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case types.ADD_ALL_NOTES:
            return {
                list: action.notes
            };
        case types.ADD_NOTE:
            return {
                list: [
                    ...state.list, {
                    note: action.note
                    }
                ]
            };
        case types.UPDATE_NOTE:
            return {
                list: [
                    ...state.list.slice(0, action.index),
                    {
                      ...state.list[action.index],
                      content: action.content,
                    },
                    ...state.list.slice(action.index + 1)
                  ]
            };
        case types.DELETE_NOTE:
            return {
                ...state.list,
                list: state.list.filter((item) => item.id !== action.id)
            };
        default:
            return state;
    }
}
export default reducer;