import { observable, action, computed } from 'mobx'

export default class Auth { 
  @observable
  loggedIn = false;
  
  @observable
  name = false;

  @action 
  login(payload) {
    this.name = payload.name;
    // payload.password; //Password
    this.loggedIn = true;

    let data = {
      loggedIn: this.loggedIn,
      name: this.name
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  @action
  logout() {
    this.loggedIn = false;
    this.name = ''
    localStorage.clear();
  }
}