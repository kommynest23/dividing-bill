import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    people: [],
    products: []
  }),
  actions: {
    addPerson(person) {
      this.people.push(person);
    },
    deletePerson(index) {
        const deletedPerson = this.people[index];
        this.people.splice(index, 1);
  
        this.products.forEach(product => {
          const selectedPeople = product.selectedPeople.filter(person => person !== deletedPerson);
          product.selectedPeople = selectedPeople;
        });
        
        this.updateBills();
    },
    addProduct(product) {
      this.products.push(product);
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      this.updateBills();
    },
    updateBills() {
      this.people.forEach(person => {
        person.bill = 0;
      });

      this.products.forEach(product => {
        product.selectedPeople.forEach(person => {
          const amountPerPerson = product.price / product.selectedPeople.length;
          const personIndex = this.people.findIndex(p => p === person);
          this.people[personIndex].bill += amountPerPerson;
        });
      });
    }
  }
});