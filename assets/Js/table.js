$(function () {
    const dateRangeInput = $('input[name="daterange"]');
    $('input[name="daterange"]').daterangepicker({
        opens: 'left',
        autoUpdateInput: false
    }, function (start, end, label) {
        minDate = start
        maxDate = end
        table.draw();
        dateRangeInput.val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
        dateRangeInput.trigger('change');
    });
    dateRangeInput.on('apply.daterangepicker', function (ev, picker) {
        minDate = picker.startDate;
        maxDate = picker.endDate;
    });

    dateRangeInput.on('cancel.daterangepicker', function () {
dateRangeInput.val('');
minDate = null;
maxDate = null;
dateRangeInput.trigger('change');
table.search('').draw(); // Clear the table filter
});
});


function parseDate(dateString) {
    if (typeof dateString !== 'string') {
        throw new Error("Invalid input. Expected a date string.");
    }

    var parts = dateString.split("-");
    if (parts.length !== 3) {
        throw new Error("Invalid date format. Expected DD-MM-YYYY.");
    }

    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Adjust for zero-based month (0-11)
    var year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}



let minDate = maxDate = null;

// Custom filtering function which will search data in column four between two values
DataTable.ext.search.push(function (settings, data, dataIndex) {
    let min = minDate;
    let max = maxDate;

    if (min !== null) {
        min = new Date(min).setHours(0, 0, 0, 0)
    }

    if (max !== null) {
        max = new Date(max).setHours(0, 0, 0, 0)
    }

    let date = data[3]
    date = parseDate(date)
    date = new Date(date);

    if (
        (min === null && max === null) ||
        (min === null && date <= max) ||
        (min <= date && max === null) ||
        (min <= date && date <= max)
    ) {
        return true;
    }
    return false;
});

// // Create date inputs
// minDate = new DateTime('#min', {
//     format: 'MMMM Do YYYY'
// });
// maxDate = new DateTime('#max', {
//     format: 'MMMM Do YYYY'
// });

// Create date inputs with the format 'DD-MM-YYYY'
// minDate = new DateTime('#min', {
//     format: 'DD-MM-YYYY'
// });
// maxDate = new DateTime('#max', {
//     format: 'DD-MM-YYYY'
// });

// DataTables initialisation
let table = new DataTable('#example', {
    language: {
        searchPlaceholder: "Search here.."
    }
});
//         // search by id or status
// const searchInput = document.getElementById('searchInput');
// const dataTable = document.getElementById('dataTable');
// const rows = dataTable.getElementsByTagName('tr');

// searchInput.addEventListener('input', function () {
//     const searchTerm = searchInput.value.toLowerCase();

//     for (let i = 1; i < rows.length; i++) {
//         const idCell = rows[i].getElementsByTagName('td')[1];
//         const idText = idCell.textContent || idCell.innerText;

//         if (idText.toLowerCase().includes(searchTerm)) {
//             rows[i].style.display = '';
//         } else {
//             rows[i].style.display = 'none';
//         }
//     }
// });
