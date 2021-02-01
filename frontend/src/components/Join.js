import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('3dCoding');
    const [role, setRole] = useState('teacher');

    return(
        <div>
            <h1>JOIN</h1>
            <div><input placeholder="Name" type="text" onChange={(event)=>setName(event.target.value)}/></div>
            <select name="role" id="room" onChange={(event)=>setRole(event.target.value)}>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
            </select>
            <select name="room" id="room" onChange={(event)=>setRoom(event.target.value)}>
                <option value="3dCoding">3D Coding</option>
                <option value="augmentedReality">Augmented Reality</option>
                <option value="machineLearning">Machine Learning</option>
                <option value="webDevelopment">Web Development</option>
            </select>
            {/* <div><input placeholder="Room" type="text" onChange={(event)=>setRoom(event.target.value)}/></div> */}
            <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/class?name=${name}&room=${room}&role=${role}`}>
                <button type="submit">JOIN</button>
            </Link>
        </div>
    );
}

export default Join;