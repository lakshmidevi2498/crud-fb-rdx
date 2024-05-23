import * as types from "../action/actionTypes"

export const getStudentDataStart=()=>{
   
    console.log('this is data in action GET_STUDENT_START call file ----->', )
        return {
            type: types.GET_STUDENT_START,    
        };
}

export const getStudentDataSuccess=(data)=>{
   
    console.log('this is data in action GET_STUDENT_SUCCESS call file ----->', data)
        return {
            type: types.GET_STUDENT_SUCCESS,
            payload: data,
           
        };
}

export const getStudentDataError=(error)=>{
   
    console.log('this is data in action GET_STUDENT_ERROR call file ----->', )
        return {
            type: types.GET_STUDENT_ERROR,
            payload: error
        };
}
