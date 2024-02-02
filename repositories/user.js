const login = async ({email,password}) => { 
    console.log('Login in repository')
}
const register = async ({email,password, name, phoneNumber, address}) => { 
    console.log('register in repository')
}

export default {
    login,
    register
}