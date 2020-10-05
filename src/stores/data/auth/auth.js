import { observable, action, computed } from 'mobx'

export default class Auth { 
  @observable
  loggedIn = false;
  
  @observable
  name = false;
  
  @observable
  token = '';

  @action 
  login(payload) {
    this.name = payload.user.username;
    // payload.password; //Password
    this.loggedIn = true;

    this.updateLocalStorage({
      loggedIn: this.loggedIn,
      name: this.name
    })
  }
  
  @action 
  register(payload) {
    this.name = payload.user.username;
    // payload.password; //Password
    this.loggedIn = true;
    this.token = payload.token;

    this.updateLocalStorage({
      loggedIn: this.loggedIn,
      name: this.name
    })
  }

  updateLocalStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  @action
  logout() {
    this.loggedIn = false;
    this.name = ''
    localStorage.clear();
  }
}