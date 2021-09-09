import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchPage extends Component{

  static propTypes = {
  updateShelf:PropTypes.func.isRequired,
  categorisedBooks:PropTypes.array.isRequired,
}


state = {
  booksResult:[],
    bookName: '',
}

searchFunc = (query) => {
    if(query !== ''){
      BooksAPI.search(query,20).then((books) => {
              if(books.error !== 'empty query'){
                  this.setState({booksResult:[]})
                    books.map((book)=>{
                      typeof book.imageLinks === 'undefined'? this.insertBook(book,'undefined') :
                      this.insertBook(book,book.imageLinks.smallThumbnail)
                })
                  this.mergeBooks()
              }
              else {this.setState({booksResult:[]})}
            })

  }
    else {this.setState({booksResult:[]})}
    this.setState({ bookName: query})
}

mergeBooks = () => {
   const categorisedBooks = this.props.categorisedBooks.filter(({ id: id1 }) => this.state.booksResult.some(({ id: id2 }) => id2 === id1));
   const uncategorisedBooks = this.state.booksResult.filter(({ id: id1 }) => !this.props.categorisedBooks.some(({ id: id2 }) => id2 === id1));
   const booksCombined = categorisedBooks.concat(uncategorisedBooks);
   this.setState({booksResult:booksCombined})
}

insertBook = (book,image) => {
  this.setState({ booksResult:this.state.booksResult
    .concat({id:book.id,title:book.title,
      subtitle:book.subtitle,Author:book.authors,imageLink:image,shelf:book.shelf})})
}




render(){
  const { updateShelf } = this.props
  const { bookName,booksResult } = this.state
  return(

    <div className='bookshelf-books'>
      <div className='search-books-bar'>
      <Link className='close-search' to='/'> Close </Link>
          <div className='search-books-input-wrapper'>
            <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts'
            value={bookName}
            onChange={(event) => this.searchFunc(event.target.value)}
            />
          </div>
      </div>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {booksResult.map((book) => (
          <BooksGrid
          book={book}
          updateShelf={updateShelf}
          />
        ))}

      </ol>
    </div>
   </div>
  )}}
export default SearchPage
