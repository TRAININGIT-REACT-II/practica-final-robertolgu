import actionTypes from "./types";

export const addAllNotes = (notes) => ({
    type: actionTypes.ADD_ALL_NOTES,
    notes
});

export const addNote = (note) => ({
    type: actionTypes.ADD_NOTE,
    note
});

export const updateNote = (index) => ({
    type: actionTypes.UPDATE_NOTE,
    index
});

export const deleteNote = (id) => ({
    type: actionTypes.DELETE_NOTE,
    id
});