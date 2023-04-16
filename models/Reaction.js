const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionScheam = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => newTypes.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);
