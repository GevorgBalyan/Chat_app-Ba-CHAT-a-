const moment = require('moment')

const formatMessages=(username, message)=>{
  return{
    username:username,
    message:message,
    time:moment().format("h:mm a")
  }
}

module.exports = formatMessages