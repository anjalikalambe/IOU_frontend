import DataStore from "./data/DataStore";
import UiStore from "./ui/UiStore";

export default class RootStore {
  dataStore;
  uiStore;

  constructor() {
    this.dataStore = new DataStore(this);
    this.uiStore = new UiStore(this);
  }
}