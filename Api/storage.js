class Storage {

    static getSearchedUserFromStorage() {
        //! Tüm Kullanıcıları al
        let users;
        if (localStorage.getItem("searched") === null) {
            users = [];

        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }
    static addSearchedUserToStorage(username) {
        //! Kullanıcı ekle
        let users = this.getSearchedUserFromStorage();
        if (users.indexOf(username) === -1) {
            users.push(username);
        }
        localStorage.setItem("searched", JSON.stringify(users));

    }
    static clearAllSearchedUserFromStorage() {
        //! Tüm kullanıcıları silme

        localStorage.removeItem("searched");

    }
}