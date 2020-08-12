export enum ApiErrorCode {
  TIMEOUT = -1,  //server is busy
  SUCCESS = 200, //success
  INVALID_USER_ID = 10001,  
  INVALID_POST_ID = 10002,  

  INVALID_PARAM = 10001, 
  INVALID_CREDENTIAL = 40001, 
  TOKEN_MISSING = 41001, // access_token is missing	
  INVALID_TOKEN = 41002, // invalid access_token
  
  API_UNAUTHORIZED = 50001, 
  API_LIMIT = 50002, 
}