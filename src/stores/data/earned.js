import { flow, makeAutoObservable } from "mobx";
import { persist } from "mobx-persist";
import axios from "axios";

export default class Earned {
  @persist
  rows = [];

  loading = true;

  rootStore;

  constructor(rootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {
      fetchFavours: flow,
    });
  }

  *fetchFavours() {
    let token = this.rootStore.auth.token
    this.loading = true;
    try {
      const { data } = yield axios.get("/favours/earned/", {
        headers: { Authorization: token },
      });
      this.rows = data;
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }
}
