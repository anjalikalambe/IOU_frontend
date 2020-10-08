import { observable, action, computed } from "mobx";

export default class Auth {
  @observable
  loggedIn = false;

  @observable
  username = false;

  @observable
  token = "";

  @action
  login({ username, token }, cb) {
    this.loggedIn = true;
    this.username = username;
    this.token = token;
    this.updateLocalStorage({ loggedIn: this.loggedIn, username, token });
    cb();
  }

  updateLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  @action
  logout(cb) {
    this.loggedIn = false;
    this.username = "";
    this.token = "";
    localStorage.clear();
    cb();
  }
}
