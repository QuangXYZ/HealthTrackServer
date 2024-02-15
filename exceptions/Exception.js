import {print,OutputType} from '../helpers/print.js';
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong username or password"
    static WRONG_CONNECTION_STRING = 'Wrong server name/connection string'
    static CANNOT_CONNECT_MONGODB = 'Can not connect mongodb'
    static USER_EXIST = "User already exists"
    static CANNOT_REGISTER_USER = "Can not register user"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password"
    constructor(message, validationError = {}){
        super(`${message}`); // call constructor of parent class 
        print(message,OutputType.ERROR)
        this.validationError = validationError; 
    }
}