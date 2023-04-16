import React, { useState, useEffect } from "react";
import studentService from "../services/studentService";
import {Button, Modal} from "react-bootstrap";
import Input from "../components/Input";
import majorService from "../services/majorService";
import {useFormik} from "formik";
import * as Yup from "yup"
import {toast} from "react-toastify";


const Student1 = (props) => {
    const [students, setStudent] = useState([]);
    const [major, setMajor] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false)
    const formilk = useFormik({
        initialValues:{
            id: 0,
            stuId: null,
            firstName: null,
            lastName: null,
            gender: null,
            phone: 0,
            email: null,
            majorId: null,
        },
        validationSchema: Yup.object({
            id: Yup.number().required(),
            stuId: Yup.string().required(),
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            gender: Yup.number().required(),
            phone: Yup.number().required(),
            email: Yup.string().required(),
            majorId: Yup.number().required(),
        }),
        onSubmit: ((values => {
            setIsWaiting(true);
            handleSave(values)
        }))
    })
    const handleRadioChange = (event) => {
        formilk.setFieldValue(event.target.name, event.target.value);
    };
    const showEditModal = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            studentService.get(id).then((res) => {
                formilk.setValues(res.data)
                // setMajor(res.data);
                handleShow();
            });
        } else {
            formilk.resetForm();
            // setMajor(defaultMajor);
            handleShow();
        }
    };
    const showDeleteModal = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            studentService.get(id).then((res) => {
                formilk.setValues(res.data)
                // setMajor(res.data);
                handleShow();
            });
        } else {
            formilk.resetForm();
            // setMajor(defaultMajor);
            handleShow();
        }
    };
    const handleSave = (data)=>{
        if (data.id === 0) {
            //neu major.id === 0 thi them moi
            studentService.add(data).then((res) => {
                setIsWaiting(false)
                if (res.errorCode === 0) {
                    loadData();
                    handleClose();
                    toast.success("Add successful!");
                } else {
                    toast.error(res.errorCode);
                }
            });
        } else {
            // nguoc lai thi update
            studentService.update(data.id, data).then((res) => {
                setIsWaiting(false)
                if (res.errorCode === 0) {
                    loadData();
                    handleClose();
                    toast.success("Update successful!");
                } else {
                    toast.error(res.errorCode);
                }
            });
        }
    }
    useEffect(()=>{
        loadApi();
    },[])
    const loadApi = () =>{
        studentService.list().then((res)=>{
            setStudent(res.data)
        });
        majorService.list().then((res)=>{
            setMajor(res.data)
        });
    }
    const loadData = () => {
        studentService.list().then((res) => {
            setStudent(res.data);
        });
    };
    const handleShow = () => setModalShow(true);
    const handleClose = () => setModalShow(false);
    return (
        <>
            <div className="container mt-4">
                <div className="card border-primary bt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h3 className="card-title">
                                    Student <small className="text-muted">list</small>
                                </h3>
                            </div>
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={()=>showEditModal(null,0)}
                                >
                                    <i className="bi-plus-lg"></i> Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered border-primary table-hover table-striped">
                                <thead>
                                <tr className="table-primary border-primary">
                                    <th style={{ width: "50px" }}>#</th>
                                    <th>Studen Id</th>
                                    <th>Full name</th>
                                    <th>Gender</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th style={{ width: "80px" }}></th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    students.map((aStudent,key)=>(
                                        <tr key={key}>
                                            <td>{aStudent.id}</td>
                                            <td>{aStudent.stuId}</td>
                                            <td>{aStudent.firstName} {aStudent.lastName}</td>
                                            <td>

                                                <i className={`fa-solid ${aStudent.gender == 1 ? 'fa-person' : 'fa-person-dress'} fa-xl`} style={{color: '#ff1a3c'}}></i>

                                            </td>
                                            <td>{aStudent.phone}</td>
                                            <td>{aStudent.email}</td>
                                            <td>
                                                <a href="/#" onClick={(e)=>showEditModal(e,aStudent.id)}>
                                                    <i className="bi-pencil-square text-primary"></i>
                                                </a>
                                                <a href="/#" onClick={(e)=>showDeleteModal(e,aStudent.id)}>
                                                    <i className="bi-trash text-danger"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Student{" "}
                        <small className="text-muted">
                            {Number(formilk.values.id) === 0 ? "new" : "edit"}
                        </small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input
                            label="Student Id"
                            type="text"
                            id="txtMajor"
                            frmField={formilk.getFieldProps("stuId")}
                            errMessage={formilk.touched.stuId && formilk.errors.stuId}
                            lastRow
                        />
                        <Input
                            label="First name"
                            type="text"
                            id="txtMajor"
                            frmField={formilk.getFieldProps("firstName")}
                            errMessage={formilk.touched.firstName && formilk.errors.firstName}

                            lastRow
                        />
                        <Input
                            label="Last name"
                            type="text"
                            id="txtMajor"
                            frmField={formilk.getFieldProps("lastName")}
                            errMessage={formilk.touched.lastName && formilk.errors.lastName}

                            lastRow
                        />
                        <div className="row mb-3" >
                            <label  className="col-sm-3 col-form-label required">
                                Gender
                            </label>

                            <div className="col-sm">
                                <label className="me-3">
                                    <input
                                        type="radio"
                                        value="1"
                                        name="gender"
                                        className="me-2"
                                        checked={formilk.values.gender == 1}
                                        onChange={formilk.handleChange }
                                    />
                                    <span>Male</span>
                                </label>
                                <label >
                                    <input
                                        type="radio"
                                        value="0"
                                        name="gender"
                                        className="me-2"
                                        checked={formilk.values.gender == 0}
                                        onChange={formilk.handleChange }
                                    />
                                    <span>Female</span>
                                </label>
                            </div>

                        </div>
                        <Input
                            label="Phone"
                            type="number"
                            id="txtMajor"
                            lastRow
                            frmField={formilk.getFieldProps("phone")}
                            errMessage={formilk.touched.phone && formilk.errors.phone}
                        />
                        <Input
                            label="Email"
                            type="text"
                            id="txtMajor"
                            lastRow
                            frmField={formilk.getFieldProps("email")}
                            errMessage={formilk.touched.email && formilk.errors.email}
                        />
                        <div className="row mb-3" >
                            <label  className="col-sm-3 col-form-label required">
                                Major
                            </label>

                            <div className="col-sm">
                                <select class="form-select w-50"   {...formilk.getFieldProps("majorId")} >
                                    {Number(formilk.values.id) === 0 ?  <option value="">Vui lòng chọn đầy đủ</option> : ''}
                                    {
                                        major.map((aMajor,key)=>(
                                            <option value={aMajor.id} key={key}>
                                                {aMajor.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>handleClose()} >
                        Close
                    </Button>
                    <Button variant="primary" disabled={!formilk.dirty || !formilk.isValid} onClick={formilk.handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Dialog */}
            {/*<Modal*/}
            {/*    show={confirmShow}*/}
            {/*    onHide={handleConfirmClose}*/}
            {/*    centered //nam giua*/}
            {/*>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Confirmation</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <p>Are you sure you want to delete selected row?</p>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleConfirmClose}>*/}
            {/*            No*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={confirmDelete}>*/}
            {/*            Yes*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </>
    );
};

export default Student1;
