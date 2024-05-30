<template>
  <v-container class="bg-surface-variant">
    <h2>Добавить новый продукт:</h2>
    <v-row>
      <v-col cols="12" sm="5">
        <v-text-field v-model="newProduct.name" label="Наименование"></v-text-field>
      </v-col>
      <v-col cols="12" sm="5">
        <v-text-field v-model="newProduct.price" label="Цена" type="number"></v-text-field>
      </v-col>
      <v-col>
        <!-- Кнопка недоступна, пока не введены название продукта и цена -->
        <v-btn @click="addProduct" :disabled="newProduct.name.trim() === '' || newProduct.price <= 0">Добавить</v-btn>
      </v-col>
    </v-row>

    <!-- Итерация по продуктам для отображения их имени, цены и выбора людей -->
    <v-row v-for="(product, productIndex) in products" :key="productIndex">
      <v-col cols="5">  
        <v-card>
          <v-card-text>{{ product.name }}</v-card-text>
        </v-card> 
      </v-col>
      <v-col cols="5">  
        <v-card>
          <v-card-text>{{ product.price }} руб.</v-card-text>
        </v-card> 
      </v-col>
      <v-col cols="2">
        <v-btn color="red" class="rounded-circle" @click="deleteProduct(productIndex)">-</v-btn>
      </v-col>
      <v-col cols="4"><strong>Выберите людей, кто ел этот продукт:</strong></v-col>
      <v-col cols="2" v-for="(person, personIndex) in store.people" :key="personIndex">
        <input type="checkbox" :value="person" :checked="isPersonSelected(productIndex, person)" @change="togglePersonSelection(productIndex, person)">
        <v-card>
          <v-card-text>{{ person.name }}</v-card-text>
        </v-card> 
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-btn to="/">Вернуться к добавлению людей</v-btn>
      </v-col>
      <v-col cols="6" class="text-right">
        <router-link :to="products.length > 0  && allProductsHaveSelections ? '/results' : '#'">
          <!-- Кнопка недоступна, пока не добавлен хотя бы один продукт
          и у всех продуктов выбран хотя бы 1 человек, который ел это продукт -->
          <v-btn :disabled="products.length === 0 || !allProductsHaveSelections">Посмотреть затраты</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useGlobalStore } from '../store';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useGlobalStore();
    const newProduct = ref({ name: '', price: 0 });
    const products = ref(store.products);

    // Проверка, что все продукты имеют хотя бы 1 человека, который его ел
    const allProductsHaveSelections = computed(() => {
      for (const product of products.value) {
        if (product.selectedPeople.length === 0) {
          return false;
        }
      }
      return true;
    });

    // Функция, проверяющая, выбран ли конкретный человек для определенного продукта
    const isPersonSelected = (productIndex, person) => {
      return products.value[productIndex].selectedPeople.includes(person);
    };

    // Функция, выбирающая ел или не ел конкретный человек определенный продукт
    const togglePersonSelection = (productIndex, person) => {
      const product = products.value[productIndex];

      if (product.selectedPeople.includes(person)) {
        product.selectedPeople = product.selectedPeople.filter(p => p !== person);
      } else {
        product.selectedPeople.push(person);
      }

      store.updateBills();
    };

    // Добавление нового продукта
    const addProduct = () => {
      if (newProduct.value.name.trim() !== '' && newProduct.value.price > 0) {
        store.addProduct({ ...newProduct.value, selectedPeople: [] });
        newProduct.value = { name: '', price: 0 };
      }
    };

    // Удаление продукта
    const deleteProduct = (index) => {
      store.deleteProduct(index);
    };

    return { store, products, newProduct, isPersonSelected, togglePersonSelection, addProduct, deleteProduct, allProductsHaveSelections };
  }
};
</script>
