const users = [];

const addUser = ({id, name, room, role}) => {
    
    name = name.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name && user.role === role);

    if(existingUser) {
        return { error: 'Username is taken'}
    }

    const user = { id, name, room, role};

    users.push(user);

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user)=> user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => {

    return {
        teacherlist : users.filter((user) => user.room === room && user.role === "teacher"),
        studentlist : users.filter((user) => user.room === room && user.role === "student"),
    }
}

module.exports = {addUser, getUsersInRoom, removeUser}