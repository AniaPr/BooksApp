{
  ('use strict');

  const select = {
    containerOf: {
      books: '.books-list',
      form: '.filters',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
      thisBook.determineRatingBgc();
    }

    initData() {
      const thisBook = this;

      thisBook.data = dataSource.books;
    }

    render() {
      const thisBook = this;

      for (let bookId in thisBook.data) {
        const book = thisBook.data[bookId];

        const ratingBgc = thisBook.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        const generateHTML = templates.templateBook({
          name: book.name,
          price: book.price,
          id: book.id,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });

        const generateDOM = utils.createDOMFromHTML(generateHTML);
        thisBook.booksList.appendChild(generateDOM);
      }
    }

    getElements() {
      const thisBook = this;

      thisBook.booksList = document.querySelector(select.containerOf.books);
      thisBook.filtersForm = document.querySelector(select.containerOf.form);
      thisBook.favoriteBooks = [];
      thisBook.filters = [];
    }

    filterBooks() {
      const thisBook = this;

      for (let book of dataSource.books) {
        let shouldBeHidden = false;

        const filterElem = document.querySelector(
          `.book__image[data-id="${book.id}"]`
        );

        for (const filter of thisBook.filters) {
          if (book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        if (shouldBeHidden) {
          filterElem.classList.add('hidden');
        } else {
          filterElem.classList.remove('hidden');
        }
      }
    }

    initActions() {
      const thisBook = this;

      thisBook.booksList.addEventListener('click', function (event) {
        event.preventDefault();
      });

      thisBook.booksList.addEventListener('dblclick', function (event) {
        const img = event.target.offsetParent;
        const bookId = img.getAttribute('data-id');

        if (thisBook.favoriteBooks.indexOf(bookId) == -1) {
          img.classList.add('favorite');
          thisBook.favoriteBooks.push(bookId);
        } else {
          img.classList.remove('favorite');
          const indexOfBook = thisBook.favoriteBooks.indexOf(bookId);
          thisBook.favoriteBooks.splice(indexOfBook, 1);
        }
        console.log('Favorite Books:', thisBook.favoriteBooks);
      });

      thisBook.filtersForm.addEventListener('click', function (event) {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
        ) {
          console.log('value:', event.target.value);

          if (event.target.checked == true) {
            thisBook.filters.push(event.target.value);
          } else {
            const indexOfFilter = thisBook.filters.indexOf(event.target.value);
            thisBook.filters.splice(indexOfFilter, 1);
          }
        }
        thisBook.filterBooks();
      });
    }

    determineRatingBgc(rating) {
      let background = '';

      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }

      return background;
    }
  }

  new BooksList();
}
