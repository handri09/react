import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import propTypes from 'prop-types';

class Search extends Component {
	// Use state to save query and render after state update
	state = {
		query: ''		
	}

	// handle the change and invoke searching method
	handleChange = (event) => {
		event.preventDefault();

		const { value } = event.target;

		this.setState({
			query: value
		})

		if (value.length > 0){
			this.searching();
		} else {
			this.resetSearch();
		}
	}

	// searching method by sending query value to searching parent's method
	searching = () => {
		this.props.searching(this.state.query.trimRight().trimLeft());
	}

	// Invoke updateBook parent's method and send (book and shelf) value
  	updateBook = (book, shelf) => {
    	this.props.updateBook(book, shelf);
  	}

  	// reset the result of search method, to avoid showing value with no input and other
  	resetSearch = () => {
  		this.props.resetSearch();
  	}

	render () {
		// Destructure the props value into each props
		const  { searchRes } = this.props;

		return (
			<div className="search-books">
				{/* Search Bar*/}
        		<div className="search-books-bar">
          	
          		{/* Close Button link to MyRead page */}
          		<Link to="/"><button className="close-search" onClick={this.resetSearch}>Close</button></Link>
          
          		{/* Input */}
          		<div className="search-books-input-wrapper">
            		<input 
              			type="text" 
              			value={this.state.query} 
              			placeholder="Search by title or author" 
              			onChange={this.handleChange}
              			/>
          		</div>
        		</div>

        		{/* Search Result*/}
        		<div className="search-books-results">
          		<ol className="books-grid">
            		{searchRes.map((book, index)=>{
                    return (<Book key={book.id} book={book} onUpdate={this.updateBook}/>)
                  })}
          		</ol>
				</div>
			</div>
		);
	}
}

// Define proptypes to avoid getting bad value 
Search.propTypes = {
	searchRes: propTypes.array.isRequired, 
	searching: propTypes.func.isRequired,
	resetSearch: propTypes.func.isRequired,
}

export default Search;