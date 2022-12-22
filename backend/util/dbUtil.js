const convertLogs = (resultLogs) => {
  return resultLogs.map(
    ({ logIndex, id, returnValues, logs, event, signature, raw }) => {
      return { logIndex, id, returnValues, logs, event, signature, raw };
    }
  );
};

module.exports = { convertLogs };
