import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './ReadEmployee.css';

function ReadEmployees () {

    const [APIData, setAPIData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const apilink = 'https://6175d06003178d00173da9f4.mockapi.io/nutemployee/';

    useEffect(() => {
        axios.get(apilink)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])
    
    //Passing data to update function
    const setData = (data) => {
        setUpdateData(data);   
        console.log(updateData);  
        let { id, name, birthDate, gender, email, CPF, startDate, team} = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Name', name);
        localStorage.setItem('Birth Date', birthDate);
        localStorage.setItem('Gender', gender);
        localStorage.setItem('Email', email);
        localStorage.setItem('CPF', CPF);
        localStorage.setItem('Start Date', startDate);
        localStorage.setItem('Team', team);
    }

    //Delete functions
    const getData = () => {
        axios.get(apilink)
            .then((getData) => {
                setAPIData(getData.data);
             })
    }

    const onDelete = (id) => {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this Employee?"
          )
          if (confirmBox === false) {
            return;
          }
        axios.delete(apilink+id).then(() => {
            getData();
        })
      }
    //End of Delete functions
    

    return(
        <Router>
        <div className='read'>
            <h1 className='main-title'>Employee's Database</h1>
            <Table singleLine className="table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Birth Date</Table.HeaderCell>
                        <Table.HeaderCell>Gender</Table.HeaderCell>
                        <Table.HeaderCell>E-mail address</Table.HeaderCell>
                        <Table.HeaderCell>CPF</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>Team</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                    <Table.Row>
                        <Table.Cell>{data.name}</Table.Cell>
                        <Table.Cell>{data.birthDate}</Table.Cell>
                        <Table.Cell>{data.gender}</Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
                        <Table.Cell>{data.CPF}</Table.Cell>
                        <Table.Cell>{data.startDate.slice(0,2) + data.startDate.slice(5,10)}</Table.Cell>
                        <Table.Cell>{data.team}</Table.Cell>
                        <a href="/update"><Table.Cell><Button onClick={() => setData(data)}>Update</Button> </Table.Cell></a>
                        <Table.Cell> <Button onClick={() => onDelete(data.id)}>Delete</Button> </Table.Cell>
                        </Table.Row>
                    )})}
                </Table.Body>
            </Table>
        </div>
        </Router>
    )
}

export default ReadEmployees;

