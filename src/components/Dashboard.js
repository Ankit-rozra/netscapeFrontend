import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import axios from 'axios';
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [edit, setEdit] = useState(null);
  const [users, setUsers] = useState(null);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [salary, setSalary] = useState('');
  const [joining, setJoining] = useState('');
  const [relieving, setRelieving] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState('Inactive');
  const [successMessage, setSuccessMessage] = useState('');
  const [successName, setSuccessName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorEditMessage, setErrorEditMessage] = useState('');

  useEffect(() => {
    GetInfo();
  }, [successName, successMessage, errorMessage]);
  const GetInfo = async () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/get`);
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };
  const AddUser = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setSuccessName('');
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/user/create`, {
          name: name,
          dob: dob,
          salary: salary,
          joining: joining,
          relieving: relieving,
          contact: contact,
          status: status,
        });
        setName('');
        setDob('');
        setRelieving('');
        setJoining('');
        setSalary('');
        setContact('');
        setSuccessMessage(response.data.message);
        setSuccessName(response.data.user.name);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
        // setUser('')
        setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  };
  const EditUser = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setSuccessName('');
    const fetchData = async () => {
      try {
        const response = await axios.put(
          `http://localhost:5000/user/edit/${edit._id}`,
          {
            name: edit.name,
            dob: edit.dob,
            salary: edit.salary,
            joining: edit.joining,
            relieving: edit.relieving,
            contact: edit.contact,
            status: edit.status,
          }
        );
        setVisible2(false);
        GetInfo();
        // setSuccessMessage(response.data.message);
        // setSuccessName(response.data.user.name);
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
        setErrorEditMessage(error.response.data.message);
        // setUser('')
        // setErrorMessage(error.response.data.message);
      }
    };
    fetchData();
  };
  const Delete = async (user) => {
    const fetchData = async () => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/user/deleteUser/${user}`
        );
        GetInfo();
      } catch (error) {
        console.error('Error fetching data:', error.response.data);
      }
    };
    fetchData();
  };
  const handleOptionChange = (event) => {
    setStatus(event.target.id);
  };

  const handleOptionChangeEdit = (event) => {
    setEdit({ ...edit, status: event.target.id });
  };
  console.log(status);
  return (
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex mt-4 align-items-center">
        <h3 className="mx-4 text-success">Employee Management</h3>
        <Button
          style={{ backgroundColor: 'green', border: '0px' }}
          onClick={() => setVisible(!visible)}
          className="d-flex align-items-center gap-1"
        >
          <FiPlusCircle />
          Add New Employee
        </Button>
      </div>
      <div className="my-4 mx-4">
        <CRow>
          <CCol>
            <CCard className="mb-4">
              <CCardHeader>
                <h3 className="mx-4 text-success">Employee List</h3>
              </CCardHeader>
              <CCardBody className="text-center">
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Name</CTableHeaderCell>
                      <CTableHeaderCell>Date of Birth</CTableHeaderCell>
                      <CTableHeaderCell>Salary</CTableHeaderCell>
                      <CTableHeaderCell>Joining</CTableHeaderCell>
                      <CTableHeaderCell>Relieving</CTableHeaderCell>
                      <CTableHeaderCell>Contact</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Edit</CTableHeaderCell>
                      <CTableHeaderCell>Delete</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {users !== null &&
                      users !== undefined &&
                      users.map((user, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>
                            <div>{user.name || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.dob || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.salary || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.joining || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.relieving || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.contact || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.status || '-'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="primary"
                              className="text-center"
                              style={{ padding: '2px 10px' }}
                              onClick={() => {
                                setVisible2(true);
                                setEdit(user);
                              }}
                            >
                              Edit
                            </CButton>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              className="text-center"
                              style={{ padding: '2px 10px' }}
                              onClick={() => Delete(user._id)}
                            >
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            Add Employee Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Name :</span>
            <CFormInput
              type="text"
              style={{ width: '80%' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Date of Birth :</span>
            <CFormInput
              type="date"
              placeholder="Date of Birth"
              style={{ width: '80%' }}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Salary :</span>
            <CFormInput
              type="text"
              style={{ width: '80%' }}
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Joining Date :</span>
            <CFormInput
              type="date"
              style={{ width: '80%' }}
              value={joining}
              onChange={(e) => setJoining(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Relieving Date :</span>
            <CFormInput
              type="date"
              style={{ width: '80%' }}
              value={relieving}
              onChange={(e) => setRelieving(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Contact :</span>
            <CFormInput
              type="text"
              style={{ width: '80%' }}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center">
            <span style={{ width: '30%' }}>Status :</span>

            <CButtonGroup
              role="group"
              aria-label="Basic checkbox toggle button group"
            >
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="Active"
                autoComplete="off"
                label="Active"
                onChange={handleOptionChange}
                checked={status === 'Active'}
              />
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="Inactive"
                autoComplete="off"
                label="Inactive"
                onChange={handleOptionChange}
                checked={status === 'Inactive'}
              />
            </CButtonGroup>
          </div>
          <h5
            className="d-flex justify-content-center"
            style={{ color: 'red' }}
          >
            {errorMessage}
          </h5>
          <h5
            className="d-flex justify-content-center"
            style={{ color: 'green' }}
          >
            {successName} &nbsp;
            {successMessage}
          </h5>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              AddUser();
            }}
          >
            Add
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        visible={visible2}
        onClose={() => setVisible2(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible2(false)}>
          <CModalTitle id="LiveDemoExampleLabel">
            Edit Employee Details
          </CModalTitle>
        </CModalHeader>
        {edit !== null && (
          <CModalBody className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Name :</span>
              <CFormInput
                type="text"
                style={{ width: '80%' }}
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Date of Birth :</span>
              <CFormInput
                type="date"
                placeholder="Date of Birth"
                style={{ width: '80%' }}
                value={edit.dob}
                onChange={(e) => setEdit({ ...edit, dob: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Salary :</span>
              <CFormInput
                type="text"
                style={{ width: '80%' }}
                value={edit.salary}
                onChange={(e) => setEdit({ ...edit, salary: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Joining Date :</span>
              <CFormInput
                type="date"
                style={{ width: '80%' }}
                value={edit.joining}
                onChange={(e) => setEdit({ ...edit, joining: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Relieving Date :</span>
              <CFormInput
                type="date"
                style={{ width: '80%' }}
                value={edit.relieving}
                onChange={(e) =>
                  setEdit({ ...edit, relieving: e.target.value })
                }
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Contact :</span>
              <CFormInput
                type="text"
                style={{ width: '80%' }}
                value={edit.contact}
                onChange={(e) => setEdit({ ...edit, contact: e.target.value })}
              />
            </div>
            <div className="d-flex align-items-center">
              <span style={{ width: '30%' }}>Status :</span>
              <CButtonGroup
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="btnradio"
                  id="Active"
                  autoComplete="off"
                  label="Active"
                  onChange={handleOptionChangeEdit}
                  checked={edit.status === 'Active'}
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'primary', variant: 'outline' }}
                  name="btnradio"
                  id="Inactive"
                  autoComplete="off"
                  label="Inactive"
                  onChange={handleOptionChangeEdit}
                  checked={edit.status === 'Inactive'}
                />
              </CButtonGroup>
            </div>

            <h5
              className="d-flex justify-content-center"
              style={{ color: 'red' }}
            >
              {errorEditMessage}
            </h5>
          </CModalBody>
        )}

        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible2(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              EditUser();
            }}
          >
            Edit
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default Dashboard;
