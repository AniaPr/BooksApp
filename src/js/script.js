const templates = {
  templateBook: Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  ),
};

const filters = [];

function render() {
  const booksList = dataSource.books;
  for (let bookId in booksList) {
    const book = booksList[bookId];

    const ratingBgc = determineRatingBgc(book.rating);
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

    const domElement = document.querySelector('.books-list');
    domElement.appendChild(generateDOM);
  }
}

function initActions() {
  const domElement = document.querySelector('.books-list');
  const favoriteBooks = [];

  domElement.addEventListener('click', function (event) {
    event.preventDefault();
  });

  domElement.addEventListener('dblclick', function (event) {
    const img = event.target.offsetParent;
    const bookId = img.getAttribute('data-id');

    if (favoriteBooks.indexOf(bookId) == -1) {
      img.classList.add('favorite');
      favoriteBooks.push(bookId);
    } else {
      img.classList.remove('favorite');
      const indexOfBook = favoriteBooks.indexOf(bookId);
      favoriteBooks.splice(indexOfBook, 1);
    }
    console.log('FavoriteBooks:', favoriteBooks);
  });

  const filtersForm = document.querySelector('.filters');

  filtersForm.addEventListener('click', function (event) {
    if (
      event.target.tagName == 'INPUT' &&
      event.target.type == 'checkbox' &&
      event.target.name == 'filter'
    ) {
      console.log('value:', event.target.value);

      if (event.target.checked == true) {
        filters.push(event.target.value);
      } else {
        const indexOfFilter = filters.indexOf(event.target.value);
        filters.splice(indexOfFilter, 1);
      }
    }
    filterBooks();
  });
}

function filterBooks() {
  for (let book of dataSource.books) {
    let shouldBeHidden = false;
    const filterElem = document.querySelector(
      `.book__image[data-id="${book.id}"]`
    );

    for (const filter of filters) {
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

function determineRatingBgc(rating) {
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

render();
initActions();
