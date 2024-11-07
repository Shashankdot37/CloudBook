const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;
const fetchuser = require('../middleware/fetchuser')


//Route 1: Creating a User
//Send request on API with the following values. Includes express-validator
router.post('/createUser',[
    body('name','Name should have atleast 6 characters').isLength({min:6}),
    body('email','Email is required').isEmail(),
    body('password','Password must be atleast 8 character long').isLength({min:8})
],async (req,res)=>
{

    //Creating a user. No login required
    //All the errors during sending request is returned on "errors"
    const errors = validationResult(req);
    let success=false;

    //If the error is obtained, the value inside the paranthesis becomes true and error is sent.
    if(!errors.isEmpty())
    {
        return res.status(400).json({success,errors:errors.array()});
    }

    try{

        //It checks whether the email ID exists. 
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser)
        {
            return res.status(400).json({success,errors: "Email already taken."});
        }

        //UserSchema exported from User.js as "User" is provided with instance according to the value provided as request and this value is returned as "user"
        // const user=User(req.body);
        // await user.save(); //Saves the value in database

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email
        })
        const data = {
            user:{
                id:user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data,jwt_secret)
        res.status(201).json({success,message:"User created successfully", user,authtoken});  
        console.log({success,authtoken})
    }
    catch(error)
    {
        success=false;
        console.log(success, error);
        res.status(500).send("Server Error.")
    }

    
})



//Route 2: Login a User

router.post('/login',[
    body('email','Please enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async (req,res)=>
{
    const errors = validationResult(req);
    let success = false;
    if(!errors.isEmpty())
    {
        res.status(400).json({errors:errors.array()});
    }

    const{email,password} = req.body;

    try
    {
        const checkUser = await User.findOne({email});
        if(!checkUser)
        {
            success=false;
            return res.status(400).json({success,errors: "Please enter valid credentials."});
        }

        const passwordCompare = await bcrypt.compare(password, checkUser.password);
        if(!passwordCompare)
        {
            success=false;
            return res.status(400).json({success, errors: "Please enter valid credentials."});
        }
        const data = {
            user:{
                id:checkUser.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data,jwt_secret);
        res.json({success, authtoken});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Server Error.")
    }
})

//Route 3: Fetch user details

router.post('/fetchuser',fetchuser, async(req,res)=>
{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error.")
    }

})



module.exports = router