/* 
    funkcjonalności:
    - dodawanie przychodów (wartosc i tytul)
    - dodawanie wydatków (wartosc tytul)
    - odejmowanie wydatków od przychodów = balans
    - tytuł i kwota ma dodawać się do tabelki
    - na górze kwoty mają być zsumowane
    - można skasować przychód/wydatek
    - można edytować (pojawiają się w formularzu kwota i tytuł, add w przycisku zmienia się na edit)
    - pojawiaja się krótkie komunikaty o dodaniu/edytowaniu/kasowaniu
    - walidacja: nie może być puste, max ~30 znaków
    - ma pojawić się komunikat o wypełnieniu wszystkich pól, albo że jest za długie?
    - localstorage? 
*/

const incomes = [{ Payment: '1000' }, { Payment2: '200' }];

const expenses = [{ 'New shoes': '300' }, { 'Grocery shopping': '100' }];

class AmountsLists {
  constructor(title, value) {
    this.title = title;
    this.value = value;
  }
}

class App {
  displayTableRows(array, tableBody) {
    array.forEach(elem => {
      const newRow = tableBody.insertRow(-1);
      newRow.innerHTML = `<td>${array.indexOf(elem) + 1}</td>
			<td>${Object.keys(elem)}</td>
			<td>${Object.values(elem)} $</td>
			<td class="text-center">
				<i class="fas fa-edit text-info"></i>
			</td>
			<td class="text-center">
				<i class="fas fa-trash-alt text-danger"></i>
			</td>`;
    });
  }

  deleteElem(array, table) {
    table.addEventListener('click', function(e) {
      if (e.target.classList.contains('fa-trash-alt')) {
        const id = e.target.parentNode.parentNode.firstChild.textContent;
        array.forEach((elem, index) => {
          if (id - 1 === index) {
            array.splice(index, 1);
          }
        });
        e.target.parentNode.parentNode.remove();
      }
    });
  }

  addElem(form, array, tableBody) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = form.querySelector('.title').value;
      const amount = form.querySelector('.amount').value;
      console.log(title.length, amount.length);
      if (
        !(title && amount) == '' &&
        !(title.length > 30) &&
        !(amount.length > 30) &&
        !(parseInt(amount) < 0)
      ) {
        const obj = { [title]: amount };
        array.push(obj);
        while (tableBody.firstChild) {
          tableBody.removeChild(tableBody.firstChild);
        }
        app.displayTableRows(array, tableBody);
        clearFields();
      } else {
        const appContent = document.querySelector('main');
        displayAlert(
          appContent,
          'The inputs cannot be empty, longer than 30 characters and amount input must be greater than 0!'
        );
      }
    });
    function clearFields() {
      form.querySelector('.title').value = '';
      form.querySelector('.amount').value = '';
    }
    function displayAlert(place, text) {
      const div = document.createElement('div');
      div.innerHTML = `<div class="alert alert-danger" role="alert">
			${text}
			<span class="close">&times;</span>
		</div>`;
      place.appendChild(div);
      const closeIcon = div.querySelector('.close');
      closeIcon.addEventListener('click', () => div.remove());
      setTimeout(() => {
        div.remove();
      }, 3000);
    }
  }
}

let app = new App();
app.displayTableRows(incomes, document.querySelector('.incomes-list tbody'));
app.displayTableRows(expenses, document.querySelector('.expenses-list tbody'));
app.deleteElem(incomes, document.querySelector('.incomes-list'));
app.deleteElem(expenses, document.querySelector('.expenses-list'));
app.addElem(
  document.querySelector('#incomesForm'),
  incomes,
  document.querySelector('.incomes-list tbody')
);
app.addElem(
  document.querySelector('#expensesForm'),
  expenses,
  document.querySelector('.expenses-list tbody')
);
