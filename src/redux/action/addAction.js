

export const ADD_STUDENT_START = "ADD_STUDENT_START";
export const ADD_STUDENT_SUCCESS = "ADD_STUDENT_SUCCESS";
export const ADD_STUDENT_ERROR = "ADD_STUDENT_ERROR";


export const addedStudentDataStart = () => {
    console.log("this is action ADD_STUDENT_START call------>")
    return{
        type: ADD_STUDENT_START
    }
    
};

export const addedStudentDataSuccess = (student) => {
    console.log("this is action ADD_STUDENT_SUCCESS call------>")
    return{
        type: ADD_STUDENT_SUCCESS,
        payload: student
    }
    
};

export const addedStudentDataError = (error) => {
    console.log("this is action ADD_STUDENT_ERROR call------>")
    return{
        type: ADD_STUDENT_ERROR,
        payload: error
    }
   
};
 