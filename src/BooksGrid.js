import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BooksGrid extends Component{

  static propTypes = {
  book:PropTypes.array.isRequired,
  updateShelf:PropTypes.func.isRequired,
  }
  render(){
    const { updateShelf,book } = this.props
    return(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className='book-cover' style={{
                        backgroundImage: `url(${book.imageLink})`,width: 128, height: 188
                        }}/>
                        <div className="book-shelf-changer">
                            <select value= {book.shelf||'None'}
                            onChange={(event)=>updateShelf(event.target.value,book.id)}>
                               <option value="move" disabled>Move to...</option>
                               <option value="currentlyReading">Currently Reading</option>
                               <option value="wantToRead">Want to Read</option>
                               <option value="read">Read</option>
                               <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.Author||" "}</div>
                  </div>
              </li>



    )
  }
}
export default BooksGrid
