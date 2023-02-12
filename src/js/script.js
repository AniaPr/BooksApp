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
    domElement.appendChild(generateDOM);
  }
}

function initActions() {
  const domElement = document.querySelector('.books-list');
  console.log(domElement);
  const favoriteBooks = [];

  domElement.addEventListener('dblclick', function (event) {
    event.preventDefault();

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
}

render();
initActions();
