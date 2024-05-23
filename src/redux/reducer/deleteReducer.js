const initialState = {
    students: [],
    loading: false,
    error: null
};

export const ReducerDelete = (state = initialState, action) => {
    
    switch (action.type) {
        case 'DELETE_STUDENT_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case "DELETE_STUDENT_SUCCESS":
            console.log('this is data in REDUCER DELETE_STUDENT_SUCCESS call file ----->', )
            return {
                ...state,
                 students: state.students.filter(student => student.id !== action.payload.id),
                 loading: false,
                error: null
            };
        case "DELETE_STUDENT_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};










