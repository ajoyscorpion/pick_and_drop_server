
const user = require('../models/userSchema');

const jwt = require('jsonwebtoken')

const createToken = (email) => {
    return jwt.sign({signInEmail:email},process.env.SECRET)
}

function generateRideNumber() {
    const timestamp = Date.now().toString(); // Current timestamp as a string
    const random = Math.floor(Math.random() * 1000).toString(); // Random number between 0 and 999
    return parseInt(`${timestamp}-${random}`);
}


// sign up

exports.signup = async(req,res) => {
    const {name,email,phone,pswd} = req.body

    try{
        const preuser = await user.findOne({email})
        if(preuser){
            res.status(406).json("User already exists")
        }
        else{
            const newUser = {
                name,
                email,
                phone,
                pswd,
                rides:[],
                rehome:[]
            }

            // const token = createToken(newUser.email)

            await user.create(newUser)
            res.status(200).json(newUser)
        }
    }
    catch(error){
        res.status(400).json(error)
    }
}


// sign in
exports.signin = async(req,res)=>{
    const {email,pswd} = req.body
    try{
        const preuser = await user.findOne({email,pswd})
        console.log(preuser);
        if(preuser){
            const token = createToken(preuser.email)
            console.log(token);
            res.status(200).json({preuser,token})
        } 
        else{
            res.status(403).json("Invalid Email or Password")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}


// Add new Ride

exports.addRide = async(req,res) => {
    const {email} = req
    console.log(email);

    const {typeOfRide,typeOfPayment,source,destination,distance,amount,date,time} = req.body

    try{

        const existingUser = await user.findOne({email})
        console.log(existingUser);

        const rideNumber = generateRideNumber()

        console.log(rideNumber);

        const newRide = {
            typeOfRide,
            typeOfPayment,
            source,
            destination,
            distance,
            amount,
            date,
            time,
            rideNumber,
            rideStatus:"Ongoing"
        };

        console.log(newRide);
        existingUser.rides.push(newRide)
        await existingUser.save()
        res.status(200).json(newRide)
    }
    catch(error){
        res.status(400).json(error)
    }
}


// Add rehome

exports.addRehome = async(req,res) => {
    const {email} = req
    console.log({email});

    const {date,time,shiftDate,shiftTime,source,destination,distance} = req.body

    try{
        const existingUser = await user.findOne({email})
        console.log(existingUser);

        const rehomeNumber = generateRideNumber()

        const newRehome = {
            date,
            time,
            shiftDate,
            shiftTime,
            source,
            destination,
            rehomeStatus:"Ongoing",
            distance,
            rehomeNumber
        }

        console.log(newRehome);
        existingUser.rehome.push(newRehome)
        await existingUser.save()

        res.status(200).json("Rehome confirmed")
    }
    catch(error){
        res.status(400).json(error)
    }
}


// Get All Rides

// exports.allRides = async(req,res) => {
//     const {email} = req.body
//     console.log({email});

//     try{
//         const existingUser = await user.findOne({email})
//         console.log(existingUser);

//         const allRideItems = existingUser.rides
//         res.status(200).json(allRideItems)
//     }
//     catch(error){
//         res.status(400).json(error)
//     }
// }

// Get the User Information

exports.userDetails = async(req,res) => {
    const {email} = req
    console.log({email});

    try{
        const userInfo = await user.findOne({email})
        console.log(userInfo);
        res.status(200).json(userInfo)
    }
    catch(error){
        res.status(400).json(error)
    }
}

// Get rehome Details

// exports.allRehome = async(req,res) => {
//     const {email} = req
//     console.log({email});

//     try{
//         const existingUser = await user.findOne({email})
//         console.log(existingUser);

//         const rehomeDetails = existingUser.rehome
//         console.log(rehomeDetails);

//         res.status(200).json(rehomeDetails)
//     }
//     catch{error}{
//         res.status(400).json(error)
//     }
// }


// Update email

exports.emailUpdate = async(req,res) => {
    const {email} = req
    console.log({email}); 

    const {newEmail} = req.body
    console.log({newEmail});
    console.log("thu");

    try{
        await user.updateOne({email},{email:newEmail})
        res.status(200).json("Updated Email")
    }
    catch(error){
        res.status(400).json(error)
    }
}

// Update phone

exports.phoneUpdate = async(req,res) => {
    const {email} = req
    console.log({email}); 

    const {newPhone} = req.body
    console.log({newPhone});

    try{
        await user.updateOne({email},{phone:newPhone})
        res.status(200).json("Updated Phone")
    }
    catch(error){
        res.status(400).json(error)
    }
}

// Update name

exports.nameUpdate = async(req,res) => {
    const {email} = req
    console.log({email}); 

    const {newName} = req.body
    console.log({newName});

    if (typeof newPhone === "string") {
        newPhone = parseInt(newPhone, 10);
    }

    try{
        await user.updateOne({email},{name:newName})
        res.status(200).json("Updated Name")
    }
    catch(error){
        res.status(400).json(error)
    }
}


// Update rehome 

exports.rehomeUpdate = async(req,res) =>{

    const {email} = req
    console.log(email);

    const {shiftDate,shiftTime,rehomeNumber} = req.body
    console.log(shiftDate);
    console.log(shiftTime);

    try {

        const existingUser = await user.findOne({email})
        console.log(existingUser);

        const rehomeItem = existingUser.rehome.find((item) => item.rehomeNumber === rehomeNumber)
        console.log(rehomeItem);

        rehomeItem.shiftDate = shiftDate
        rehomeItem.shiftTime = shiftTime

        await existingUser.save()
        res.status(200).json("Updated rehome")
    } catch (error) {
        res.status(400).json(error)    
    }
}


// cancel ride

exports.cancelRide = async(req,res) => {
    const {email} = req
    console.log({email});
    
    const {rideNumber} = req.body
    console.log({rideNumber});

    try{
        const existingUser = await user.findOne({email})
        console.log(existingUser);
        console.log("1");
        
        // const rideObjectId = ObjectId(rideId);
        // console.log(rideObjectId);

        const rideToCancel = existingUser.rides.find((item) => item.rideNumber === rideNumber)
        console.log(rideToCancel);
        rideToCancel.rideStatus = "Cancelled"
        await existingUser.save()
        res.status(200).json("Ride cancelled Successfully")
    }
    catch(error){
        res.status(400).json(error)
    }
}


// cancel rehome

exports.cancelRide = async(req,res) => {
    const {email} = req
    console.log({email});
    
    const {rehomeNumber} = req.body
    console.log({rehomeNumber});

    try{
        const existingUser = await user.findOne({email})
        console.log(existingUser);
        console.log("1");
        
        // const rideObjectId = ObjectId(rideId);
        // console.log(rideObjectId);

        const rehomeToCancel = existingUser.rehome.find((item) => item.rehomeNumber === rehomeNumber)
        console.log(rehomeToCancel);
        rehomeToCancel.rehomeStatus = "Cancelled"
        await existingUser.save()
        res.status(200).json("Rehome cancelled Successfully")
    }
    catch(error){
        res.status(400).json(error)
    }
}