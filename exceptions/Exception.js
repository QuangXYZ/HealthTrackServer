import {print,OutputType} from '../helpers/print.js';
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong username or password"
    static WRONG_CONNECTION_STRING = 'Wrong server name/connection string'
    static WRONG_CONNECTION_STRING = 'Wrong server name/connection string'
    static CANNOT_CONNECT_MONGODB = 'Can not connect mongodb'
    constructor(message){
        super(message); // call constructor of parent class 
        print(message,OutputType.ERROR)
    }
}