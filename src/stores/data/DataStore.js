import Auth from "./auth/auth";

export default class DataStore {
  auth;

  constructor(rootStore) {
    this.auth = new Auth(rootStore);
  }
}