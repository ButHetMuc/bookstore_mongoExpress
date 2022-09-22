const router = require('express').Router();
const bookController = require('../controllers/bookController');


//ADD BOOK
router.post('/',bookController.addBook);

//GET ALL BOOK
router.get('/',bookController.getAllBook);

// GET A BOOK 
router.get('/:id',bookController.getABook);

// UPDATE A BOOK
router.put('/:id',bookController.updateBook);

//DELETE A BOOK 
router.delete('/:id',bookController.deleteBook);

module.exports = router;