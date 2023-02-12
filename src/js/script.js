const templates = {
  templateBook: Handlebars.compile(
    document.querySelector('#template-book').innerHTML
  ),
};

function render() {
  const booksList = dataSource.books;
  for (let book in booksList) {
    const bookData = booksList[book];

    const generateHTML = templates.templateBook(bookData);

    const generateDOM = utils.createDOMFromHTML(generateHTML);

    const domElement = document.querySelector('.books-list');
    //console.log(domElement);
    domElement.appendChild(generateDOM);
  }
}

function initActions() {
  const bookImages = document.querySelectorAll('.book__image');
  const favoriteBooks = [];

  for (let bookImage of bookImages) {
    bookImage.addEventListener('dblclick', function (event) {
      event.preventDefault;

      const bookId = bookImage.getAttribute('data-id');
      if (favoriteBooks.indexOf(bookId) == -1) {
        bookImage.classList.add('favorite');

        favoriteBooks.push(bookId);
        //console.log(favoriteBooks);
      } else {
        bookImage.classList.remove('favorite');

        const indexOfBook = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(indexOfBook, 1);
      }
      console.log('FavoriteBooks:', favoriteBooks);
    });
  }
}

render();
initActions();
