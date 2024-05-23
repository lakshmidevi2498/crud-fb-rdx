import axios from 'axios';

const url = 'https://crud-fb-rdx-default-rtdb.firebaseio.com/student.json';

export const getStudentData = async () => {
    try {
        const response = await axios.get(url);
        if (response.data) {
            console.log(response.data)
            const fetchedStudents = Object.keys(response.data).map(key => ({
                id: key,
                ...response.data[key]
            }));
            console.log("this is api file in get call----->",fetchedStudents) 
            return fetchedStudents;
        } else {
            console.log("ghb")
            return [];
            
        }
    } catch (error) {
        console.log('Error is:', error);
        return [];
    }
}



export const saveStudentsData = async (newStudent) => {
    try {
        const response = await axios.post(url,newStudent);
        console.log("This is API post call data---->", response.data.name);
        const studentId = response.data.name; 
        return { id: studentId, ...newStudent }; 
    } catch (error) {
        console.log("Error is:", error);
        throw error;
    }
};




export const deleteStudentData = async (id) => {
    try {
        await axios.delete(`https://crud-fb-rdx-default-rtdb.firebaseio.com/student/${id}.json`);
        console.log("This is api delete call");

        return id;
    } catch (error) {
        console.error("Error deleting student:", error);
       
    }
};



export const updateStudentChangesData = async (studentToUpdate, id) => {
    console.log("this is api file in put call----->")
    try {
        await axios.put(`https://crud-fb-rdx-default-rtdb.firebaseio.com/student/${id}.json`, studentToUpdate);
        return { ...studentToUpdate, id };
    } catch (error) {
        console.log("Error updating student:", error);
        throw error;
    }
};
