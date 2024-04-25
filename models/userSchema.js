const mongoose = require('mongoose');
const validator = require('validator');

// Define ride schema
const rideSchema = mongoose.Schema({
    typeOfRide: {
        type: String,
        required: true
    },
    typeOfPayment: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    rideNumber: {
        type: Number,
        required: true
    },
    rideStatus: {
        type: String,
        required: true
    }
});

// Define rehome schema
const rehomeSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    shiftDate: {
        type: String,
        required: true
    },
    shiftTime: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    rehomeStatus: {
        type: String,
        required: true
    },
    rehomeNumber: {
        type: Number,
        required: true
    }
});

// Define user schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validator(value) {
                return validator.isEmail(value);
            },
            message: 'Invalid Email'
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    pswd: {
        type: String,
        required: true,
        unique: true
    },
    rides: [rideSchema],
    rehome: [rehomeSchema]
});

// Create and export the user model
const user = mongoose.model('user', userSchema);
module.exports = user;
