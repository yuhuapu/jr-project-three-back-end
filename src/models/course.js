const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: {
        type: String,
        uppercase: true,
        alias: 'code' // virtual `code` property
      },
    courseName: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    tutorId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor'
    }],
    studentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    __v: {type: Number, select: false},
    createdAt: { type: Date, select: false }
},
{
    timestamps: true, // show timestamp
    toJSON: {
      virtuals: true // required to show 'code' property
    },
    id: false // hide `id` virtual property
  }
);

const model = mongoose.model('Course', schema);

module.exports = model;