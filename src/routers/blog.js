const express = require('express')
const Blog = require('../models/blog')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/blogs', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    })

    try {
        await blog.save()
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/blogs/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const blog = await Blog.findById(_id)

        if (!blog) {
            return res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/blogs/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const blog = await Blog.findOne({ _id: req.params.id, owner: req.user._id})

        if (!blog) {
            return res.status(404).send()
        }

        updates.forEach((update) => blog[update] = req.body[update])
        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/blogs/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router