import mongoose from "mongoose";

const { Schema, model } = mongoose;

// {
//     "name": "Yulia Shevchenko",
//  "phoneNumber": "+380000000001",
//  "email": "oleh1@example.com",
// "isFavourite": false,
//   "contactType": "personal",
//     "createdAt": "2024-05-08T16:12:14.954151",
//    "updatedAt": "2024-05-08T16:12:14.954158"
// },

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    isFavourite: {
        type: Boolean,
        default: true,
    },
    contactType: {
        type: String,
        required: true,
        enum: ['home', 'personal', 'work'],
        default: 'personal',
    },
    createdAt: String,
    updatedAt: String,
},
    { timestamps: true, versionKey: false },
);

//this is middleware
contactSchema.post("save", (err, data, next) => {
    err.status = 400;
    next();
});


export const Book = model('contacts', contactSchema);

