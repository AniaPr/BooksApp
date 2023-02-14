const templates = {
  templateBook: Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  ),
};

const filters = [];

function render() {
  const booksList = dataSource.books;
  for (let book in booksList) {
    const bookData = booksList[book];

    const generateHTML = templates.templateBook(bookData);

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
    console.log('Checkbox was clicked!');
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

      console.log(filters);
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
      console.log(filterElem, book.details[filter]);
    }

    if (shouldBeHidden) {
      filterElem.classList.add('hidden');
    } else {
      filterElem.classList.remove('hidden');
    }
  }
}

render();
initActions();
