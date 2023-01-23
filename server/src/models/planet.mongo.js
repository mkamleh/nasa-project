const mongoose = require("mongoose")

const plantSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Planet",plantSchema)