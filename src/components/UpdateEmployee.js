import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Form } from 'semantic-ui-react'
import axios from 'axios';
import './UpdateEmployee.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from 'moment';


function UpdateEmployee () {
    const [id, setID] = useState(null);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [CPF, setCPF] = useState('');
    const [startDate, setStartDate] = useState('');
    const [team, setTeam] = useState('');
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [missingData, setMissingData] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidCPF, setInvalidCPF] = useState(false);
    const genderOptions = [{value: 'Female', text: 'Female'}, {value: 'Male', text: 'Male'},
    {value: 'Others', text: 'Others'}, {value: 'Rather not say', text: 'Rather not say'}, ];
    const teamOptions = [{key: 1, value: 'Frontend', text: 'Frontend'}, 
    {key: 2, value:'Backend', text: 'Backend'}, {key:3, value:'Mobile', text: 'Mobile'}, 
    {key: 4, value:'Null', text:'Null'}]
    const apilink = 'https://6175d06003178d00173da9f4.mockapi.io/nutemployee/';

    useEffect(() => {
            localStorage.getItem('ID');
            setID(localStorage.getItem('ID'));
            setName(localStorage.getItem('Name'));
            setBirthDate(localStorage.getItem('Birth Date'));
            setGender(localStorage.getItem('Gender'));
            setEmail(localStorage.getItem('Email'));
            setCPF(localStorage.getItem('CPF'));
            setStartDate(localStorage.getItem('Start Date'));
            setTeam(localStorage.getItem('Team'));
    }, []);

    const updateData = () => {
        if (name == '' || birthDate == '' || gender=='' || email=='' || CPF==''||startDate==''||team==''){
            setMissingData(true);
            return;
        } 
        if (name.length <= 20 || name.length >= 50 || !isNaN(name)){
            setInvalidName(true);
            return;
        }
        if (email.length <= 10 || email.length >= 30 || !isNaN(email) || !email.includes('@') || !email.includes('.') ){
            setInvalidEmail(true);
            return;
        }
        if (CPF.length >= 12 || isNaN(CPF)){
            setInvalidCPF(true);
            return;
        }

        setMissingData(false);
        setInvalidName(false);
        setInvalidEmail(false);
        setInvalidCPF(false);

        setWasSubmitted(true);
        axios.put(apilink+id,{
            name,
            birthDate,
            gender,
            email,
            CPF,
            startDate,
            team
        })
    }
    return (
            <div>
                <h1>Update Employee</h1>
                <Form className="form">
                    <Form.Field>
                        <label>Name</label>
                        <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Birth Date</label>
                        <SemanticDatepicker onChange={(e, value) => setBirthDate(moment(value.value).format('L'))}  />
                    </Form.Field>
                    <Form.Field>
                        <label>Gender</label>
                            <Dropdown
                                placeholder={gender}
                                fluid
                                selection
                                options= {genderOptions}
                                onChange={(e, value) => setGender(value.value)}
                            />
                    </Form.Field>
                    <Form.Field>
                        <label>E-mail</label>
                        <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>CPF</label>
                        <input placeholder='CPF' value={CPF} onChange={(e) => setCPF(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Start Date</label>
                        <SemanticDatepicker onChange={(e, value) => setStartDate(moment(value.value).format('L'))}/>
                    </Form.Field>
                    <Form.Field>
                    <label>Team</label>
                    <Dropdown
                        placeholder={team}
                        fluid
                        selection
                        options= {teamOptions}
                        onChange={(e, value) => setTeam(value.value)}
                    />
                </Form.Field>
            </Form>
                <div className='update-buttons'>
                    <Button onClick={updateData} className='submit' type='submit'>Submit</Button>
                    {wasSubmitted && <a href='/'><Button>Return</Button></a>}
                    {wasSubmitted && <p className="confirmation-text">Your data was sucessfully submitted!</p>}
                    {missingData && <p className="warning-text">Please, complete the missing data before submitting.</p>}
                    {invalidName && <p className="warning-text">Please, enter a valid full name before submitting.</p>}
                    {invalidEmail && <p className="warning-text">Please, enter a valid E-mail.</p>}
                    {invalidCPF && <p className="warning-text">Please, enter a valid CPF (numbers only).</p>}
                </div>
            </div>
        )
}

export default UpdateEmployee;