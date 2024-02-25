export declare type ApiError = {
  message: string;
  response: {
    data: string;
  };
};

export const getError = (error: ApiError) => {
  return error.message && error.response.data
    ? error.response.data
    : error.message;
};
