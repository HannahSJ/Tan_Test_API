const mongoose = require('mongoose');
const {Schema} = mongoose; // const Schema = mongoose.Schema;

var watcher = new Schema({
    user_name: { type: String, required: true },
    mail: { type: String, required: true }, //mail: {type: String, required: true, unique: 1}
    password: { type: String, required: true }
});

var blind = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    location: [{ 
        date: { 
            type: Date, 
            default: () => {
                var dateTime = new Date()
                dateTime.setHours(dateTime.getHours()+7)
                return dateTime
            }},
        lat: { type: Number },
        long: { type: Number },
    }],
    watcher: [{watcher: { type: String, required: true }}]
});

const watcherSchema = mongoose.model('watcher', watcher)
const blindSchema = mongoose.model('blind', blind)

module.exports = {Watcher: watcherSchema, Blind: blindSchema}