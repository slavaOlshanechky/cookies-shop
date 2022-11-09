import { createAction, createSlice } from '@reduxjs/toolkit';
import confectionaryService from '../services/confectionary.service';

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

const isOutdated = (date) => {
    return Date.now() - date > 10 * 60 * 1000;
};

export const loadConfectionaryList = () => async (dispatch, getState) => {
    const { lastFetch } = getState.confectionary;
    if (isOutdated(lastFetch)) {
        dispatch(confectionaryRequestSend());
        try {
            const { content } = await confectionaryService.fetchAll();
            dispatch(confectionaryRequestSuccess(content));
        } catch (e) {
            dispatch(confectionaryRequestFail(e.message));
        }
    }
};

export const addConfectionary = (payload) => async (dispatch) => {
    dispatch(confectionaryAddRequestSend());
    try {
        const { content } = await confectionaryService.create(payload);
        dispatch(confectionaryAddRequestSuccess(content));
    } catch (e) {
        dispatch(confectionaryAddRequestFail(e.message));
    }
};

export const saveConfectionary = (payload) => async (dispatch) => {
    dispatch(confectionarySaveRequestSend());
    try {
        const { content } = await confectionaryService.patch(payload);
        dispatch(confectionarySaveRequestSuccess(content));
    } catch (e) {
        dispatch(confectionarySaveRequestFail(e.message));
    }
};

export const deleteConfectionary = (id) => async (dispatch) => {
    dispatch(confectionaryDeleteRequestSend());
    try {
        const { content } = await confectionaryService.delete(id);
        if (!content) {
            dispatch(confectionaryDeleteRequestSuccess(content));
        }
    } catch (e) {
        dispatch(confectionaryDeleteRequestFail(e.message));
    }
};

export const getLoadingStatus = () => (state) => state.confectionary.isLoading;
export const getConfectionaryList = () => (state) => state.confectionary.entities;
export const getConfectionaryById = (id) => (state) =>
    state.confectionary.entities.find((item) => item._id === id);

export default confectionaryReducer;
