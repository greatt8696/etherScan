const response = (
  res,
  statusCode,
  isSuccess,
  data = false,
  iserror = false
) => {
  return res.status(statusCode).send({
    success: isSuccess ? true : false,
    data: data ? data : [],
    error: iserror ? `${iserror}` : "",
  });
};

module.exports = { response };
