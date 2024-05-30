import { defineStore } from 'pinia';

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    people: [],
    products: []
  }),
  actions: {
    addPerson(person) {
      this.people.push(person);
    },
    addProduct(product) {
      this.products.push(product);
    },
  }
});