export const Message = (
  error: boolean,
  status: number,
  message: string,
  payload?: any
) => {
  return { error, status, message, payload };
};
