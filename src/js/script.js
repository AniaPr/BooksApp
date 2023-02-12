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

render();
