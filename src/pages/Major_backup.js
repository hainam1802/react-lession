import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import majorService from "../services/majorService";
import { Button, Modal, Toast } from "react-bootstrap";
import Input from "../components/Input";
import { toast } from "react-toastify";

const defaultMajor = { id: 0, name: "" };

const Major = (props) => {
    const [majors, setMajors] = useState([]); //quan ly danh sach major
    const [major, setMajor] = useState(defaultMajor); // quan ly 1 doi tuong major
    // const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    const [confirmShow, setConfirmShow] = useState(false);

    const handleConfirmClose = () => setConfirmShow(false);
    const handleConfirmShow = () => setConfirmShow(true);

    const showEditModal = (e, id) => {
        if (e) e.preventDefault();
        if (id > 0) {
            majorService.get(id).then((res) => {
                setMajor(res.data);
                handleShow();
            });
        } else {
            setMajor(defaultMajor);
            handleShow();
        }
    };

    const handleChange = (e) => {
        const newData = { ...major };
        newData[e.target.name] = e.target.value;
        setMajor(newData);
    };

    const handleSave = () => {
        if (major.id === 0) {
            //neu major.id === 0 thi them moi
            majorService.add(major).then((res) => {
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
            majorService.update(major.id, major).then((res) => {
                if (res.errorCode === 0) {
                    loadData();
                    handleClose();
                    toast.success("Update successful!");
                } else {
                    toast.error(res.errorCode);
                }
            });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        majorService.list().then((res) => {
            setMajors(res.data);
        });
    };

    // chức năng xoá
    const handleDelete = (e, id) => {
        e.preventDefault();
        setMajor({id : id, name : ""})
        handleConfirmShow();
    };

    const confirmDelete = () => {
        majorService.delete(major.id).then((res) => {
            if (res.errorCode === 0) {
                loadData();
                toast.warn("A data has been deleted");
                handleConfirmClose();
            } else {
                toast.error(res.errorCode);
            }
        });
    };

    return (
        <>
            <div className="container mt-4">
                <div className="card border-primary bt-5">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h3 className="card-title">
                                    Major <small className="text-muted">list</small>
                                </h3>
                            </div>
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => showEditModal(null, 0)}
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
                                    <th style={{ width: "50px" }}></th>
                                    <th>Major Name</th>
                                    <th style={{ width: "80px" }}></th>
                                </tr>
                                </thead>

                                <tbody>
                                {majors.map((aMajor, idx) => (
                                    <tr key={aMajor.id}>
                                        <td>{idx + 1}</td>
                                        <td>{aMajor.name}</td>

                                        <td>
                                            <a
                                                href="/#"
                                                className="me-1"
                                                onClick={(e) => showEditModal(e, aMajor.id)}
                                            >
                                                <i className="bi-pencil-square text-primary" />
                                            </a>
                                            <a
                                                href="/#"
                                                onClick={(e) => handleDelete(e, aMajor.id)}
                                            >
                                                <i className="bi-trash text-danger" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
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
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Major{" "}
                        <small className="text-muted">
                            {Number(major.id) === 0 ? "new" : "edit"}
                        </small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Input
                            label="Major name"
                            type="text"
                            id="txtMajor"
                            name="name"
                            onChange={handleChange}
                            defaultValue={major.name}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Confirm Dialog */}
            <Modal
                show={confirmShow}
                onHide={handleConfirmClose}
                centered //nam giua
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete selected row?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Major;
