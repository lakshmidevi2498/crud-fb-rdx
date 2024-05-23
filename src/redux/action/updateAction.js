export const UPDATE_STUDENT_START = "DELETE_STUDENT_START";
export const UPDATE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
export const UPDATE_STUDENT_ERROR = "DELETE_STUDENT_ERROR";

export const updateStudentDataStart=()=>{
   
    console.log('this is data in action UPDATE_STUDENT_START call file ----->', )
        return {
            type: UPDATE_STUDENT_START,
            
        };
}

export const updateStudentDataSuccess=(data)=>{
   
    console.log('this is data in action UPDATE_STUDENT_SUCCESS call file ----->', )
        return {
            type: UPDATE_STUDENT_SUCCESS,
            payload: data
        };
}

export const updateStudentDataError=(error)=>{
   
    console.log('this is data in action UPDATE_STUDENT_ERROR call file ----->', )
        return {
            type: UPDATE_STUDENT_ERROR,
            payload: error
        };
}

