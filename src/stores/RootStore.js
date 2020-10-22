import { create } from 'mobx-persist'

// import DataStore from "./data/DataStore";
import AuthStore from './data/auth'
import UiStore from "./ui/UiStore";
import Owed from './data/owed'
import Earned from './data/earned'

const hydrate = create({
  storage: localStorage
})

export default class RootStore {
  auth = new AuthStore();
  owed = new Owed(this);
  earned = new Earned(this);
  uiStore = new UiStore();

  constructor() {
    hydrate('data', this.auth)
  }
}