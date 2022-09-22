const {Book,Author} = require('../model/model');

const bookController = {

    //ADD BOOK
    addBook: async (req,res)=>{
        
        try {
            const newBook = new Book(req.body);
            const saveBook =  await newBook.save();  
            if(req.body.author){
                const author = Author.findById(req.body.author);
                await author.updateOne({$push:{books: saveBook._id}});
            }  
            res.status(200).json(saveBook);
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    },
    //GET ALL BOOK
    getAllBook : async(req,res)=> {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    //GET A BOOK
    getABook: async (req,res)=>{
        try {
            const book = await Book.findById(req.params.id).populate('author');
            res.status(200).json(book);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    //UPDATE A BOOK 
    updateBook : async(req,res)=>{
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({$set:req.body});
            res.status(200).json('update succesfully!');
        } catch (error) {
            console.log(error);
            res.status(5000).json(error);
        }
    },

    //DELETE BOOK
    deleteBook: async(req,res)=>{
        try {
            await Author.updateMany(
                {books: req.params.id},
                {$pull: {books: req.params.id}});
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json('deleted succesfull');
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};

module.exports = bookController;