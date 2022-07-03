const actions = [
    "UPDATE_USER",
    "ADD_NOTE",
    "UPDATE_NOTE",
    "DELETE_NOTE",
    "ADD_ALL_NOTES"
  ];
  
const actionTypes = {};
    actions.forEach(action => {
    actionTypes[action] = action;
});
  
export default actionTypes;