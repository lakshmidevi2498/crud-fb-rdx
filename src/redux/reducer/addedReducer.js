

const initialState = {
    students: [],
    loading: false,
    error: null
};

export const ReducerAdd = (state = initialState, action) => {
    
    switch (action.type) {
        case 'ADD_STUDENT_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case "ADD_STUDENT_SUCCESS":
            console.log('this is data in REDUCER ADD_STUDENT_SUCCESS call file ----->', )
            return {
                ...state,
                loading: false,
                students: [...state.students, action.payload],
                error: null
            };
        case "ADD_STUDENT_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

