const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    linkBlog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    date:{
        type:Date,
        default:Date.now
    },
})


const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment