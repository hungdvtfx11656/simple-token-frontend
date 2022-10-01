const getRpcErrorMessage = (error) => {
  if (error.data) {
    return error.data.message;
  }
  return error.message;
};

export default getRpcErrorMessage;
