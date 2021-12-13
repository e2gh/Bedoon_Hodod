const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
router.get('/', async (req, res) => {
  let books
  let authors
  try {
  books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  authors = await Author.find().limit(10).exec()
} catch {
  books = [];
  authors = [];
  }
  res.render('index', {
    title: 'بدون حدود', 
    books: books,
    authors:authors  })
})

module.exports = router
