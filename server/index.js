import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import { userRegistration, userLogin, getUser } from './controllers/userController.js'
import { registerValidator } from "./validation/registerValidate.js";
import handleValidationError from "./midlewares/handleValidationError.js";
import isAuthenticated from "./midlewares/isAuthenticated.js";

dotenv.config()
const { PORT = 8080, MONGO_DB_URL } = process.env

mongoose
  .connect( MONGO_DB_URL )
  .then( () => console.log( 'Connected to MongoDB' ) )
  .catch( ( error ) => console.log( error ) )

const app = express()

app.use( express.json() )
app.use( cors() )

app.post( '/register', registerValidator, handleValidationError, userRegistration )
app.post( '/login', registerValidator, handleValidationError, userLogin )
app.get( '/user', isAuthenticated, getUser )

// const PORT = PORT || 8080

app.listen( PORT, ( err ) => {
  if (err) {
    return console.log( err )
  }

  console.log( `Server is running on port:${PORT}` )
} )