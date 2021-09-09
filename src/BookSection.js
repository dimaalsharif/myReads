import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
class BookSection extends Component {
  static propTypes = {
  books:PropTypes.array.isRequired,
  shelf:PropTypes.array.isRequired,
  updateShelf:PropTypes.func.isRequired,
}

render() {
  const {books,shelf,updateShelf} = this.props
  return(
    <div>
    {shelf.map((bookShelf)=>(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.filter(c=>c.shelf === bookShelf).map((book)=>(
                    <BooksGrid
                    book={book}
                    updateShelf={updateShelf}
                    key={book.id}
                      />
                    ))}
             </ol>
           <div className="open-search">
            <Link to='/search'>Add Contact</Link>
           </div>
        </div>
      </div>
      ))}
    </div>
      )}}

export default BookSection
