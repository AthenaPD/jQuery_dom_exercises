let sortAsc = [true, true];

// Add event listener for adding movies
$("#input-form").on("submit", function (evt) {
    evt.preventDefault();
    const newRow = $("<tr>").appendTo($("table"));
    const mTitle = $("#movie-title").val();
    const mRating = $("#movie-rating").val();
    $(newRow).append($(`<td>${mTitle}</td>`)).append($(`<td>${mRating}</td>`)).append(
        $("<td><button>X</button></td>"));
    evt.target.reset();
});

// Add event listener to remove a movie
$("table").on("click", "tr td button", function () {
    $(this).parent().parent().remove();
});

// Sort movies
$("th button").on("click", function() {
    const table = $(this).parents("table");
    const btnIdx = $(this).parent().index()
    let rows = table.find("tr:gt(0)").toArray().sort(comparer(btnIdx));
    sortAsc[btnIdx] = sortAsc[btnIdx] ? false : true;
    if (sortAsc[btnIdx]) {rows.reverse()};
    for (let row of rows) {table.append(row)};
});

function comparer(index) {
    return function(a, b) {
        const first = $(a).children().eq(index).text();
        const second = $(b).children().eq(index).text();
        return +first && +second ? first-second : first.localeCompare(second);
    }
}