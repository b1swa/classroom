const classes = {};

const startClass = (room) => {

    classes[room] = "start";
    return classes;
}

const endClass = (room) => {

    classes[room] = "end";
    return classes;
}

const getClass = (room) => classes.room ? classes.room : "end"; 

module.exports = {startClass, endClass, getClass}