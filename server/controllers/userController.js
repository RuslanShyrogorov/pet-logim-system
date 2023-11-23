import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import UserModel from "../models/user.js";

// const { SECRET_JWT } = process.env

export const userRegistration = async ( req, res ) => {
  const { email, password } = req.body
  try {
    const storedUser = await UserModel.findOne( { email } )
    if (storedUser) {
      res.status( 409 ).json( {
        message: "Email in use"
      } )
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash( password, salt )

    const newUser = new UserModel( {
      email,
      passwordHash: hashedPassword,
    } )

    const createdUser = await newUser.save()

    const payload = { _id: createdUser._id }
    const token = jwt.sign( payload, "SecretKeyForApp", { expiresIn: '30d' } )

    const { passwordHash, ...data } = newUser._doc

    res.status( 201 ).json( {
      token,
      ...data
    } )

  } catch (error) {
    console.log( error )
    res.status( 500 ).json( {
      message: "Register failed"
    } )
  }

}

export const userLogin = async ( req, res ) => {
  const { email, password } = req.body
  try {
    const storedUser = await UserModel.findOne( { email } )
    if (!storedUser) {
      return res.status( 404 ).json( {
        message: "User not found"
      } )
    }

    const isPasswordValid = bcrypt.compare( password, storedUser._doc.passwordHash )
    if (!isPasswordValid) {
      return res.status( 404 ).json( {
        message: 'Wrong email or password'
      } )
    }

    const payload = { _id: storedUser._id }
    const token = jwt.sign( payload, "SecretKeyForApp", { expiresIn: '30d' } )

    const { passwordHash, ...data } = storedUser._doc

    res.status( 200 ).json( {
      token,
      ...data
    } )

  } catch (error) {
    console.log( error )
    res.status( 500 ).json( {
      message: "Login failed"
    } )
  }

}

export const getUser = async ( req, res ) => {
  const { userId } = req
  try {
    const user = await UserModel.findById( userId )
    if (!user) {
      return res.status( 404 ).json( {
        message: "User not found"
      } )
    }

    const { passwordHash, ...data } = user._doc

    res.status( 200 ).json( {
      ...data
    } )

  } catch (error) {
    console.log( error )
    res.status( 500 ).json( {
      message: "Data fetching failed"
    } )
  }

}