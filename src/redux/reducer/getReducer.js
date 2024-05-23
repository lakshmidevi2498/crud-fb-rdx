import * as types from "../action/actionTypes";

const initialState = {
    students: [],
    loading: false,
    error: null
};

export const ReducerGet = (state = initialState, action) => {
   
    switch (action.type) {
        case types.GET_STUDENT_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.GET_STUDENT_SUCCESS:
            console.log('this is data in REDUCER GET_STUDENT_SUCCESS call file ----->', )
            return {
                ...state,
                students: action.payload, // Set students to the payload data
                loading: false,
                error: null
            };
        case types.GET_STUDENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};








