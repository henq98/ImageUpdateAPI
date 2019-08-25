const routes = require('express').Router();
const multer = require('multer');

const multerConfig = require('./config/multer');
const Post = require('./models/Post');

/**
 * Single p/ receber um único arquivo por vez. Se mais, usar array
 * Nome do campo em que se recebe o arquivo
 */

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, filename: key } = req.file; // Desestruturação es6

    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    })
    return res.json(post);
});

module.exports = routes;