

function load(){
    makeList();
    numberOfPages = getNumberOfPages();
}
function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}
function nextPage() {
    currentPage += 1;
    loadList();
}
function previousPage() {
    currentPage -= 1;
    loadList();
}
function firstPage() {
    currentPage = 1;
    loadList();
}
function lastPage() {
    currentPage = numberOfPages;
    loadList();
}
function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();    // draws out our data
    check();         // determines the states of the pagination buttons
}
//wazne
function drawList() {
    document.getElementById("list").innerHTML = "";

    for (r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += pageList[r] + "";
    }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}
