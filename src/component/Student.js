
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import {  getStudentDataStart, getStudentDataSuccess, getStudentDataError,} from '../redux/action/getAction';
import { addedStudentDataError, addedStudentDataStart, addedStudentDataSuccess} from '../redux/action/addAction';
 import { updateStudentDataError,updateStudentDataStart,updateStudentDataSuccess } from '../redux/action/updateAction';
 import {deletedStudentDataError,deletedStudentDataStart,deletedStudentDataSuccess } from '../redux/action/deleteAction';
import { getStudentData, saveStudentsData, updateStudentChangesData, deleteStudentData } from '../redux/api/studentApi';

const Student = ({ students, dispatch}) => {
    const [studentInfo, setStudentInfo] = useState({
        name: "",
        email: "",
        branch: "",
        id: "",
        base64: ""
    });
    const [showForm, setShowForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddModalForm, setShowAddModalForm] = useState(false);
    const [displayStudentDetails, setDisplayStudentDetails] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        dispatch(getStudentDataStart());
        try {
            const data = await getStudentData();
            dispatch(getStudentDataSuccess(data));
        } catch (error) {
            dispatch(getStudentDataError(error));
        }
    };

    const toggleAddForm = () => setShowForm(true);

    const cancel = () => {
        setShowForm(false);
        setShowAddForm(false);
        setStudentInfo({
            name: "",
            email: "",
            branch: "",
            id: "",
            base64: ""
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertBase64(file);
            setStudentInfo({ ...studentInfo, base64 });
        }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const saveData = async () => {
        const { name, email, branch, base64 } = studentInfo;
        if (!name || !email || !branch||!base64) {
            alert('Please enter all fields');
            return;
        }

        const newStudent = { name, email, branch, base64 };

        dispatch(addedStudentDataStart());
        try {
            const student = await saveStudentsData(newStudent);
            dispatch(addedStudentDataSuccess(student));
            getData();
            setStudentInfo("")
            setShowForm(false);
        } catch (error) {
            dispatch(addedStudentDataError(error));
        }
    };

    const updateData = (id) => {
        setShowAddForm(true);
        const studentUpdate = students.find(student => student.id === id);
        if (studentUpdate) {
            setStudentInfo(studentUpdate);
        }
    };

    const saveChanges = async () => {
        const { name, email, branch, base64, id } = studentInfo;
        if (!name || !email || !branch||!base64) {
            alert('Please enter all fields');
            return;
        }

        const studentToUpdate = { name, email, branch, base64 };

        dispatch(updateStudentDataStart());
        try {
            const data = await updateStudentChangesData(studentToUpdate, id);
            dispatch(updateStudentDataSuccess(data));
            getData();
            setShowAddForm(false);
        } catch (error) {
            dispatch(updateStudentDataError(error));
        }
    };

    const deleteData = async (id) => {
        dispatch(deletedStudentDataStart());
        try {
            await deleteStudentData(id);
            dispatch(deletedStudentDataSuccess(id));
            getData();
        } catch (error) {
            dispatch(deletedStudentDataError(error));
        }
    };

    const toggleShowAddForm=()=>{
        setShowAddForm(false) 
        
    }

    const displayDetails = (name, email, branch, base64) => {
        setDisplayStudentDetails({ name, email, branch, base64 });
        setShowAddModalForm(true);
    };

    const toggleDeleteForm = () => setShowAddModalForm(false);

    return (
        <div className='container-fluid'>
            <div className='Table row'>
                <div className="header d-flex justify-content-between p-3" id="head" style={{ backgroundColor: '#C035F3' }}>
                    <h3 className="text-light">MANAGE STUDENT DETAILS</h3>
                    <button className="btn btn-light fw-bold" onClick={toggleAddForm}>
                        Add Student+
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">S.No</th>
                            <th className='text-center' scope="col">Name</th>
                            <th className='text-center' scope="col">Email</th>
                            <th className='text-center' scope="col">Branch</th>
                            <th className='text-center' scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((student, index) => (
                            <tr key={student.id}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'><img style={{ borderRadius: 100, height: 30, width: 30 }} src={student.base64} alt="student" /> &nbsp;{student.name}</td>
                                <td className='text-center'>{student.email}</td>
                                <td className='text-center'>{student.branch}</td>
                                <td className='text-center'>
                                    <button className="btn text-primary fw-bold" onClick={() => updateData(student.id)}><i className="fas fa-pencil-alt fs-5"></i></button>
                                    <button className="btn text-danger fw-bold" onClick={() => deleteData(student.id)}> <i className="fas fa-trash-alt fs-5"></i></button>
                                    <button className="btn text-info fw-bold" onClick={() => displayDetails(student.name, student.email, student.branch, student.base64)}><i className="fa-regular fa-eye fs-5"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <div className="modal  " tabIndex="-1" role="dialog" style={{ display: 'block' }} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content bg-secondary p-3">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title text-warning">Add Student Details</h5>
                        <button type="button" className="close btn fs-4 fw-4" onClick={toggleAddForm}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className='text-light'>
                        <div className="form-group mb-3">
                            <label htmlFor="name ">Name</label>
                            <input type="text" className="form-control " id="name" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} />
                        </div>
                        <div className="form-group  mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={studentInfo.email} onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })} />
                        </div>
                        <div className="form-group  mb-3">
                            <label htmlFor="role">Branch</label>
                            <input type="text" className="form-control" id="branch" value={studentInfo.branch} onChange={(e) => setStudentInfo({ ...studentInfo, branch: e.target.value })} />
                        </div>
                        <div className="form-group  mb-3">
                             <label htmlFor="role" >UploadImage</label><br/>
                            <input type="file" id="myFile" name="filename"className='mb-2' onChange= {handleImage}/>
                            {studentInfo.image && <img src={studentInfo.image} alt="Preview" style={{ width: '200px', height: 'auto' }} />}
                          
                        </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <button type="button" className="btn btn-danger" onClick={cancel}>Close</button>
                       <button type="button" className="btn btn-primary" onClick={saveData}>Save</button>
                    </div>
                    </div>
                </div>
                </div>
            )}
            {showAddForm && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content  bg-secondary p-3">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title text-warning">EDIT Student Details</h5>
                        <button type="button" className="close btn fs-4 fw-4" onClick={toggleShowAddForm}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className='text-light'>
                        <div className="form-group mb-3">
                            <label htmlFor="name ">Name</label>
                            <input type="text" className="form-control " id="name" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} />
                        </div>
                        <div className="form-group  mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" value={studentInfo.email} onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })} />
                        </div>
                        <div className="form-group  mb-3">
                            <label htmlFor="role">Branch</label>
                            <input type="text" className="form-control" id="branch" value={studentInfo.branch} onChange={(e) => setStudentInfo({ ...studentInfo, branch: e.target.value })}  />
                        </div>
                        <div className="form-group  mb-3">
                             <label htmlFor="role" >UploadImage</label><br/>
                            <input type="file" id="myFile" name="filename"className='mb-2' onChange= {handleImage}/>
                            {studentInfo.image && <img src={studentInfo.image} alt="Preview" style={{ width: '200px', height: 'auto' }} />}
                          
                        </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                        <button type="button" className="btn btn-danger" onClick={cancel}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveChanges}>Savechanges</button>
                    </div>
                    </div>
                </div>
                </div>
            )}
            {showAddModalForm && (
                <div className="modal  " tabIndex="-1" role="dialog" style={{ display: 'block',background:"#94bbe9" }} >
                <div className="modal-dialog" role="document">
                    <div className="modal-content bg-light p-3">
                    <div className=" d-flex justify-content-between">
                        <h2 className="modal-title p-2" style={{color:'#933970'}}>PREVIEW</h2>
                        <button type="button" className="close btn fs-4 fw-4" onClick={toggleDeleteForm}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
    <form className='text-danger text-center'>
        <div>
            {displayStudentDetails.base64 && <img src={displayStudentDetails.base64} alt="Preview" style={{ width: '200px', height: 'auto' ,borderRadius:'25px'}} />}
        </div>
        <div className=" mb-3 mt-2">
            <h4 className='text-start'style={{color:'#b80fdd'}} >Name: {displayStudentDetails.name}</h4>
            <h4 className='text-start' style={{color:'#b80fdd'}}>Email: {displayStudentDetails.email}</h4>
            <h4 className='text-start' style={{color:'#b80fdd'}}>Branch: {displayStudentDetails.branch}</h4>
        </div>
    </form>
</div>
          </div>
                    
                    </div>
                </div>
                )}
        </div>

    );
};

const mapStateToProps = (state) => ({
    students: state.getdatainformation.students,
    loading: state.getdatainformation.loading,
    error: state.getdatainformation.error,
   
 
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);
