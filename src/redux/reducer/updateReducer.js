const initialState = {
    students: [],
    loading: false,
    error: null
};

export const ReducerUpdate = (state = initialState, action) => {
    console.log('this is data in reducer UPDATE call file ----->',)
    switch (action.type) {
        case 'UPDATE_STUDENT_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case "UPDATE_STUDENT_SUCCESS":
            console.log('this is data in REDUCER UPDATE_STUDENT_SUCCESS call file ----->', )
            return {
                ...state,
                 students: state.students.filter(student => student.id !== action.payload.id),
                 loading: false,
                error: null
            };
        case "UPDATE_STUDENT_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


