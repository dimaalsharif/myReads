import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookSection from './BookSection'
import SearchPage from './SearchPage'
class App extends Component {

  state = {
    booksArray:[],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      books.map((book)=>{
        typeof book.imageLinks === 'undefined'? this.updateState(book,book.shelf,'undefined'):
        this.updateState(book,book.shelf,book.imageLinks.smallThumbnail)
      })})
  }


updateShelf = (newshelf,id) => {
  let exists = true
  BooksAPI.get(id).then(object=>{
    console.log( object.shelf)
    if(object.shelf === 'none'){
      exists = false
    }
      this.addBook(object,exists,newshelf,id)
      BooksAPI.update(object,newshelf)
  })
  }


  updateState = (book,newshelf,image) => {
    this.setState({ booksArray:this.state.booksArray
      .concat({id:book.id,title:book.title,subtitle:book.subtitle,Author:book.authors,imageLink:image,shelf:newshelf})})}



  addBook = (book,exists,newshelf,id) => {
    if(exists) {
      this.setState(prevState => ({
          booksArray: this.state.booksArray.map(
            book =>
            book.id === id? { ...book, shelf:newshelf}: book)}))
          }
    else {
        typeof book.imageLinks === 'undefined'? this.updateState(book,newshelf, 'undefined'):
        this.updateState(book,newshelf,book.imageLinks.smallThumbnail)
      }
}



render(){
  const shelves = ["currentlyReading","wantToRead","read"]
  const { booksArray } = this.state
  return(
    <div>
    <Route exact path='/' render={() => (
      <BookSection
      books={booksArray}
      shelf={shelves}
      updateShelf={this.updateShelf}/>
      )}/>
    <Route path='/search' render={({ history }) => (
      <SearchPage
        categorisedBooks = {booksArray}
        updateShelf={(newshelf,id) => {
          this.updateShelf(newshelf,id)
        }}/>
    )} />
    </div>
  )
}
}

export default App
