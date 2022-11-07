import { createAction, createSlice } from '@reduxjs/toolkit';

const confectionarySlice = createSlice({
    name: 'confectionary',
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        confectionaryRequestSend: (state) => {
            state.isLoading = true;
        },
        confectionaryRequestSuccess: (state, action) => {
            state.isLoading = false;
            state.entities = action.payload;
        },
        confectionaryRequestFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        confectionaryDeleteRequestSuccess: (state, action) => {
            state.entities = state.entities.filter(
                (item) => item._id !== action.payload
            );
        },
        confectionaryDeleteRequestFail: (state, action) => {
            state.error = action.payload;
        },
        confectionaryAddRequestSuccess: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        confectionaryAddRequestFail: (state, action) => {
            state.error = action.payload;
        },
        confectionarySaveRequestSuccess: (state, action) => {
            const itemIndex = state.entities.findIndex(
                (i) => i._id === action.payload._id
            );
            state.entities[itemIndex] = action.payload;
        },
        confectionarySaveRequestFail: (state, action) => {
            state.error = action.payload;
        }
    }
});

const confectionaryDeleteRequestSend = createAction(
    'confectionary/confectionaryDeleteRequestSend'
);
const confectionaryAddRequestSend = createAction(
    'confectionary/confectionaryAddRequestSend'
);
const confectionarySaveRequestSend = createAction(
    'confectionary/confectionarySaveRequestSend'
);

const { reducer: confectionaryReducer, actions } = confectionarySlice;
const {
    confectionaryRequestSend,
    confectionaryRequestSuccess,
    confectionaryRequestFail,
    confectionaryDeleteRequestSuccess,
    confectionaryDeleteRequestFail,
    confectionaryAddRequestSuccess,
    confectionaryAddRequestFail,
    confectionarySaveRequestSuccess,
    confectionarySaveRequestFail


} = actions;

export const getConfectionaryList = () => (state) => state.confectionary.entities;

export default confectionaryReducer;
