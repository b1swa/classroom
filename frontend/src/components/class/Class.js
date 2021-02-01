import React,{useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Class.css';
import  { Redirect } from 'react-router-dom'

let socket;

const Class = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('end');
    const [teacherList, setTeacherList] = useState([]);
    const [studentList, setStudentList] = useState([]);
    
    
    const ENDPOINT = "https://classro0m.herokuapp.com/";

    useEffect(()=>{
        const {name, room, role} = queryString.parse(location.search); 

        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };

        socket =io(ENDPOINT, connectionOptions);

        setName(name);
        setRoom(room);
        setRole(role);

        socket.emit('join', {name, room, role}, (error) => {
            alert(error);
            // <Redirect to="/asds" />

        });

    }, [ENDPOINT, location.search]);
    
    useEffect(()=>{
        socket.on('roomData',({ users })=>{
            console.log(users.teacherlist);
            setStudentList(users.studentlist);
            setTeacherList(users.teacherlist);
        })
    },[]);

    const startClass = () => {
        setStatus('start');
        socket.emit('startClass', {room});
    }

    const endClass = () => {
        setStatus('end');
        socket.emit('endClass', {room});
    }

    const Buttons = () => {
        if(role === "teacher"){
            return (
                <div className="header-button">
                    <button onClick={startClass}>Start Class</button>
                    <button onClick={endClass}>End Class</button>
                </div>
            )
        }else{
            return(
                <div className="header-button">
                    <button>Leave Class</button>
                </div>
            )
        }
    }

    return(
        <div>
            <div className="header">
                <h1>Classroom</h1>
                <Buttons/>
            </div>
            <div className="room">
                <div className="teachers-box">
                    <h3>Teachers List</h3>
                    {
                        teacherList.map((teacher) => <li key={teacher.id}>{teacher.name}</li>)
                    }
                </div>
                <div className="students-box">
                    <h3>Students List</h3>
                    {
                        studentList.map((student) => <li key={student.id}>{student.name}</li>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Class;