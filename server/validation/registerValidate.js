import { body } from 'express-validator'

export const registerValidator = [
  body( "email", "Email is wrong format" ).isString().isEmail(),
  body( "password", "Password is wrong format" )
    .isString()
    .isLength( { min: 5, max: 15 } ),
]