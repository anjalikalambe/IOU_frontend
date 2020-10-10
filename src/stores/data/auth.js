import { flow, makeAutoObservable } from "mobx";
import { persist } from 'mobx-persist'
import axios from 'axios'
export default class Auth {
  @persist
  loggedIn = false;

  @persist
  username = false;

  @persist
  token = "";

  loading = true;

  constructor() {
    makeAutoObservable(this, {
      validateToken: flow
    })
  }

  login({ username, token }, cb) {
    this.loggedIn = true;
    this.username = username;
    this.token = token;
    cb();
  }

  *validateToken() {
    let res = yield axios.get('http://localhost:5000/auth/verifyToken', {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmN2VkMGI1MDQ3YTQxZWZkYmY4YTBiOSIsInVzZXJuYW1lIjoiYSIsImlhdCI6MTYwMjI4ODc5MCwiZXhwIjoxNjAyODkzNTkwfQ.tf76B9QLJ70PHNT64_ARaoQVvxRC_JNHQqpLjyZSgOc"
      }
    })
    if (!res.data.success) {
      this.logout();
    }
  }

  logout(cb) {
    this.loggedIn = false;
    this.username = "";
    this.token = "";
    localStorage.clear();
    cb();
  }
}