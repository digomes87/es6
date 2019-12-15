// Book Class: Represents a Book
class Lista {
  constructor(idade, sexo, corOlhos, corCabelo) {
    this.idade = idade;
    this.sexo = sexo;
    this.corOlhos = corOlhos;
    this.corCabelo = corCabelo;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayLista() {
    const listas = Store.getListas();

    listas.forEach((lista) => UI.addToList(lista));
  }

  static addToList(lista) {
    const list = document.querySelector('#Listar');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.idade}</td>
      <td>${book.sexo}</td>
      <td>${book.corOlhos}</td>
      <td>${book.corCabelo}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteLista(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form-id');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#idade').value = '';
    document.querySelector('#sexo').value =  '';
    document.querySelector('#corOlhos').value = '';
    document.querySelector('#corCabelo').value = '';
  }
}

//get valueRadio
function evalGroup() {
  var s = document.form-id.sexo;
  for (var i = 0; i < s.length; i++) {
    if (s[i].checked)
      break;
  }
  if (i == group.length)
    return alert("feminino");
  alert("Radio Button " + (i + 1) + " is checked.");
}

// Store Class: Handles Storage
class Store {
  static getListas() {
    let listas;
    if (localStorage.getItem('listas') === null) {
      listas = [];
    } else {
      listas = JSON.parse(localStorage.getItem('listas'));
    }

    return listas;
  }

  static addList(lista) {
    const listas = Store.getListas();
    listas.push(lista);
    localStorage.setItem('listas', JSON.stringify(listas));
  }

  // static removeBook(isbn) {
  //   const books = Store.getBooks();

  //   books.forEach((book, index) => {
  //     if(book.id === id) {
  //       books.splice(index, 1);
  //     }
  //   });

  //   localStorage.setItem('books', JSON.stringify(books));
  // }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#form-id').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const idade = document.querySelector('#idade').value;
  // const sexo = document.getElementById('#sexo').value;
  const sexo = document.querySelector('input[name=sexo]:checked').value;
  const corOlhos = document.querySelector('#corOlhos').value;
  const corCabelo = document.querySelector('#corCabelo').value;

  // Validate
  if (idade === '' || sexo === '' || corOlhos === '' || corCabelo === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const lista = new Lista(idade, sexo, corOlhos, corCabelo);

    // Add Book to UI
    UI.addToList(lista);

    // Add book to store
    Store.addList(lista);

    // Show success message
    UI.showAlert('Item adicionado', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#Listar').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Item Removido', 'success');
});