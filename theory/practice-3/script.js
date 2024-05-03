async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
   }

   function displayTable(data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
   
    // Заголовки таблицы
    const headers = Object.keys(data[0]);
    const tr = document.createElement('tr');
    headers.forEach(header => {
       const th = document.createElement('th');
       th.textContent = header;
       th.dataset.column = header;
       tr.appendChild(th);
    });
    thead.appendChild(tr);
   
    // Тело таблицы
    data.forEach(item => {
       const tr = document.createElement('tr');
       headers.forEach(header => {
         const td = document.createElement('td');
         td.textContent = item[header];
         tr.appendChild(td);
       });
       tbody.appendChild(tr);
    });
   
    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);

    // Добавляем обработчик событий на thead
    thead.addEventListener('click', function(event) {
        if (event.target.tagName === 'TH') {
            const column = event.target.dataset.column;
            sortTable(table, headers.indexOf(column));
        }
    });
}

function sortTable(table, columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const headers = Array.from(table.querySelectorAll('thead th'));
    const currentDirection = headers[columnIndex].getAttribute('data-sort-direction') || 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    headers.forEach(header => header.setAttribute('data-sort-direction', ''));
    headers[columnIndex].setAttribute('data-sort-direction', newDirection);

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.toLowerCase();
        const cellB = rowB.cells[columnIndex].textContent.toLowerCase();

        // Проверяем, являются ли значения числами
        const isNumberA = !isNaN(cellA);
        const isNumberB = !isNaN(cellB);

        if (isNumberA && isNumberB) {
            // Если оба значения являются числами, сравниваем их как числа
            return newDirection === 'asc' ? Number(cellA) - Number(cellB) : Number(cellB) - Number(cellA);
        } else {
            // Если хотя бы одно из значений не является числом, сравниваем их как строки
            if (cellA < cellB) {
                return newDirection === 'asc' ? -1 : 1;
            }
            if (cellA > cellB) {
                return newDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }
    });

    const tbody = table.querySelector('tbody');
    rows.forEach(row => tbody.appendChild(row));
}

   function filterTable(query) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.forEach(row => {
       const text = row.textContent.toLowerCase();
       row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
   }
   
   document.querySelector('#loadData').addEventListener('click', () => {
    fetchData().then(data => displayTable(data));
});


   document.querySelector('#search').addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
       filterTable(e.target.value);
    } else {
       filterTable('');
    }
   });