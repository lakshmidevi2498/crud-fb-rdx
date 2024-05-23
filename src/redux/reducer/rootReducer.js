import { combineReducers } from "redux";
import { ReducerAdd } from "../reducer/addedReducer"
import { ReducerDelete } from "./deleteReducer";
import { ReducerUpdate } from "./updateReducer";
import { ReducerGet } from "./getReducer";
import { addStudentDataSuccess } from "../action/addAction";
import { updateStudentDataSuccess } from "../action/updateAction";
import { deletedStudentDataSuccess } from "../action/deleteAction";
import { getStudentDataSuccess } from "../action/getAction";

export const rootReducer=combineReducers({
    getdatainformation:ReducerGet,
    postdatainformation:ReducerAdd,
    deletedatainformation:ReducerDelete,
    updatedatainformation:ReducerUpdate
   
})