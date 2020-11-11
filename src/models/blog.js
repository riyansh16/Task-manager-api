const mongoose = require('mongoose')
const Comment = require('./comment')


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date:{
        type:Date,
        default:Date.now
    },
})
blogSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'linkBlog'
})


const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog