const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const lastUsers = document.getElementById("last-users");
const clearLastUsers = document.getElementById("clear-last-users");

const github = new Github();
const ui = new UI();



eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}


function getData(e) {


    let username = nameInput.value.trim();
    if (username === "") {
        alert("Lütfen geçerli bir kullanıcı adı girin")


    } else {
        github.getGithubData(username).then(response => {
            if (response.user.message === "Not Found") {
                //!  hata messajı
                ui.showError("Kullanıcı bulunamadı");
            } else {
                ui.addSearchedUserToUI(username);

                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showUserRepo(response.repo)
            }
        }).catch(err => ui.showError(err))
    }


    ui.clearInput();
    e.preventDefault();

}

function clearAllSearched() {
    //! tüm aramaları temizle
    if (confirm("Emin misiniz")) {
        Storage.clearAllSearchedUserFromStorage();
        ui.clearAllSearchedFromUI();

    }

}

function getAllSearched() {

    //! arananları storageden al ui ye ekle


    let users = Storage.getSearchedUserFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`;

    });
    lastUsers.innerHTML = result;

}