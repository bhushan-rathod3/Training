const bookLibrary = {
    books : [],

    addBook : function(book) {
        this.books.push(book);
        console.log(`${book.title} was added to the library`);
    } ,

    getBooksByAuthor : function(author){
        return this.books.filter(book => book.author === author)
    } ,

    removeBook : function(title){
        const indexOfBook = this.books.findIndex(book => book.title === title)
        if(indexOfBook !== -1){
            console.log(`Removed book ${title}`);
            this.books.splice(indexOfBook , 1);
        }
        else{
            console.log("Book not Found");
        }
    } ,

    getAllBooks : function(){
        return this.books.map(book => book.title);
    }


}

bookLibrary.addBook({ title: "The Hobbit", author: "J.R.R. Tolkien", yearPublished: 1937 });
bookLibrary.addBook({ title: "Atomic Habits", author: "James Clear", yearPublished: 2018 });
bookLibrary.addBook({ title: "How to Win Friends and Influence People", author: "Dale Carnegie", yearPublished: 1936 });



console.log(bookLibrary.getBooksByAuthor("James Clear"));

bookLibrary.removeBook("The Hobbit");

console.log(bookLibrary.getAllBooks());