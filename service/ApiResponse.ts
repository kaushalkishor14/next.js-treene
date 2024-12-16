interface ApiResponse {
  status: number;
  msg: string;
  data?: any;
}

interface ResponseProps {
  res: any;
  status: number;
  msg: string;
  data?: any;
}


class ResponseApi{
   successResponse = (res: any, msg: string = "operation successful")=> {
    const dataData = {
      status: 1,
      msg,
    };
    return res.status(200).json(dataData);
  };
  
  successResponseWithData = ({res, data, msg = "operation successful"}:ResponseProps)=> {
    const resDataData = {
      status: 1,
      msg,
      data,
    };
    return res.status(200).json(resDataData);
  };
  
   errorResponse = ({res, msg = "internal server error"}:ResponseProps) => {
    const dataData = {
      status: 0,
      msg,
    };
    return res.status(500).json(dataData);
  };
  
   notFoundResponse = ({res, msg = "resource not found"}:ResponseProps) => {
    const dataData = {
      status: 0,
      msg,
    };
    return res.status(404).json(dataData);
  };
  
   validationError = ({res, msg = "invalid data"}:ResponseProps) => {
    const resDataData = {
      status: 0,
      msg,
    };
    return res.status(400).json(resDataData);
  };
  
   validationErrorWithData = ({res, data, msg = "invalid data"}:ResponseProps) => {
    const resDataData = {
      status: 0,
      msg,
      data,
    };
    return res.status(400).json(resDataData);
  };
  
   unauthorizedResponse = ({res, msg = "unauthorized request"}:ResponseProps) => {
    const dataData = {
      status: 0,
      msg,
    };
    return res.status(401).json(dataData);
  };
  
   formatZodErrors = (errors:any) => {
    // check is array or not
    if (!Array.isArray(errors)) {
      return [
        {
          field: errors?.path?.join(".") || "unknown",
          message: errors.message,
          received: errors.received,
          expected: errors.expected,
          code: errors.code,
        },
      ];
    }
  
    return errors.map((error: any) => ({
      field: error?.path?.join(".") || "unknown",
      message: error.message,
      received: error.received,
      expected: error.expected,
      code: error.code,
    }));
  };
  
}

class CustomError extends Error {
  statusCode: any;
  constructor(message:any, statusCode:any) {
    super(message); // Call the parent `Error` class constructor with the message
    this.statusCode = statusCode; // Add the status code property
  }
}


export {ResponseApi, CustomError}
