
var SiteNameInput = document.getElementById("bookmarkName");
var SiteUrlInput = document.getElementById("bookmarkURL");
var table = document.getElementById('tableContent');
var boxInfo = document.querySelector('.box-info');
var bookmarks = [];
const nameRegex = /^[a-zA-Z\s]{3,}$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
var updatedindex;

if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    display();
}


SiteNameInput.addEventListener('input', () => validateLive(SiteNameInput, nameRegex));
SiteUrlInput.addEventListener('input', () => validateLive(SiteUrlInput, urlRegex));


function validateLive(inputField, regex) {
    if (regex.test(inputField.value)) {
        inputField.classList.add('is-valid');
        inputField.classList.remove('is-invalid');
    } else {
        inputField.classList.add('is-invalid');
        inputField.classList.remove('is-valid');
    }
}


function validate(name, url) {
    const isNameValid = nameRegex.test(name);
    const isUrlValid = urlRegex.test(url);


    validateLive(SiteNameInput, nameRegex);
    validateLive(SiteUrlInput, urlRegex);

    return isNameValid && isUrlValid;
}


function submit() {
    var siteName = SiteNameInput.value.trim();
    var siteUrl = SiteUrlInput.value.trim();


    if (!siteUrl.startsWith("http://") && !siteUrl.startsWith("https://")) {
        siteUrl = "http://" + siteUrl;
    }

    if (validate(siteName, siteUrl)) {
        var bookmark = {
            SiteName: siteName,
            SiteUrl: siteUrl
        };

        bookmarks.push(bookmark);
        LocalStorage();
        display();
        clearForm();
    } else {
        displayError();
    }
}


function displayError() {
    boxInfo.classList.remove('d-none');
    document.getElementById('closeBtn').onclick = function () {
        boxInfo.classList.add('d-none');
    };
}


function display() {
    table.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${bookmarks[i].SiteName}</td>
            <td><a href="${bookmarks[i].SiteUrl}" target="_blank" class="btn btn-success">Visit</a></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
            <td><button onclick="updatebookmarker(`+ i + `)" class="btn btn-warning" id="update">update</button></td>`;
        table.appendChild(row);
    }
}


function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    LocalStorage();
    display();
}


function clearForm() {
    SiteNameInput.value = "";
    SiteUrlInput.value = "";
    SiteNameInput.classList.remove('is-valid', 'is-invalid');
    SiteUrlInput.classList.remove('is-valid', 'is-invalid');
}

function addEdit() {
    bookmarks[updatedindex].SiteName = SiteNameInput.value
    bookmarks[updatedindex].SiteUrl = SiteUrlInput.value
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    document.querySelector("#addedit").style.display = "none";
    document.querySelector("#submitBtn").style.display = "inline-block";

    display();
    clearForm();
}
function updatebookmarker(i) {
    updatedindex = i;
    SiteNameInput.value = bookmarks[i].SiteName
    SiteUrlInput.value = bookmarks[i].SiteUrl
    document.querySelector("#addedit").style.display = "inline-block"
    document.querySelector("#submitBtn").style.display = "none"
}

function LocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
