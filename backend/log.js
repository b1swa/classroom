const logs = [];

const addLog = ( room_id, event, time) => {
    const log = { room_id, event, time};
    logs.push(log);
    console.log(logs);
}

const findLog = (room_id) => logs.filter((log) => log.room_id === room_id);

module.exports = {addLog, findLog}