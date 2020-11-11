const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/comments', auth, async (req, res) => {
    const comment = new Comment({
        ...req.body,
        linkBlog: req.blog._id
    })

    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/comments/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const comment = await Comment.findById(_id)

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/comments/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
     try {
        const comment = await Comment.findOne({ _id: req.params.id, linkBlog: req.blog._id})

        if (!comment) {
            return res.status(404).send()
        }

        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.send(comment)
     } catch (e) {
         res.status(400).send(e)
     }
})


router.delete('/blogs/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.id, linkBlog: req.blog._id })

        if (!comment) {
            res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router