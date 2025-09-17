const z = require('zod');

const validateUser = z.object({
    nombre:z.string({
        invalid_type_error:'The name must be a string', 
        required_error:'The name is required'}),
    password: z.string({
        invalid_type_error:'The password must be a string', 
        required_error:'The password is required'}).min(5).max(30),
})

function verifyPartialUser(input){
    return validateUser.safeParse(input)
}
module.exports = {  verifyPartialUser }