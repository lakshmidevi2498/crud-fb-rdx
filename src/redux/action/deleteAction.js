
export const DELETE_STUDENT_START = "DELETE_STUDENT_START";
export const DELETE_STUDENT_SUCCESS = "DELETE_STUDENT_SUCCESS";
export const DELETE_STUDENT_ERROR = "DELETE_STUDENT_ERROR";

export const deletedStudentDataStart=()=>{
   
    console.log('this is data in action DELETE_STUDENT_START call file ----->', )
        return {
            type: DELETE_STUDENT_START,
            
        };
}

export const deletedStudentDataSuccess=(id)=>{
   
    console.log('this is data in action DELETE_STUDENT_SUCCESS call file ----->', id)
        return {
            type: DELETE_STUDENT_SUCCESS,
            payload: id
        };
}

export const deletedStudentDataError=(error)=>{
   
    console.log('this is data in action DELETE_STUDENT_ERROR call file ----->', )
        return {
            type: DELETE_STUDENT_ERROR,
            payload: error
        };
}