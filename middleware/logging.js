const logMessage = (type, message) => {
  if (type === "ERROR") {
    console.error(message);
  } else {
    console.log(type + ": " + message);
  }
};

module.exports = logMessage;
