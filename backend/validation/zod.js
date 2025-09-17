const z = require('zod');

const validateUser = z.object({
    nombre:z.string({
        invalid_type_error:'The name must be a string', 
        required_error:'The name is required'}),
    password: z.string({
        invalid_type_error:'The password must be a string', 
        required_error:'The password is required'}).min(5).max(30),
    email: z.email("Invalid Email")
})

function verifyUser(input){
    return validateUser.safeParse(input);
}

function verifyPartialUser(input){
    return validateUser.partial().safeParse(input)
}
module.exports = { verifyUser, verifyPartialUser }