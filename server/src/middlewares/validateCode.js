import { ApiError } from "../utils/ApiError.js";

export function validateCode(req, res, next) {
  const { code } = req.body;
  
  if (!code || code === "") return next();

  if(code.length < 6 || code.length > 8){
    throw new ApiError(400, "Invalid code length. Code must be between 6 and 8 characters long.",);
  }
  
  const regex = /^[A-Za-z0-9]{6,8}$/;
  if (!regex.test(code)) {
    throw new ApiError(400, "Invalid code format. Code can only contain letters and numbers (no special characters or spaces).");
  }

  next();
}
