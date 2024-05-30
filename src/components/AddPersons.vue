<template>
  <v-container class="bg-surface-variant">
    <h2>Добавить нового человека:</h2>
    <v-row>
      <v-col cols="10">
        <v-text-field v-model="newPerson" label="Имя"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="addPerson">Добавить</v-btn>
      </v-col>
    </v-row>

    <!-- Итерация по списку людей для отображения их имён и кнопки удаления -->
    <v-row v-for="(person, index) in people" :key="index">
      <v-col cols="10">  
        <v-card>
          <v-card-text class="input-data">{{ person.name }}</v-card-text>
        </v-card> 
      </v-col>
      <v-col>
        <v-btn color="red" class="rounded-circle" @click="deletePerson(index)">-</v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-col class="text-right"> 
      <!-- Переход к следующему шагу только если есть минимум 2 человека -->
      <router-link :to="people.length >= 2 ? '/addpositions' : '#'">
        <v-btn :disabled="people.length < 2">перейти к добавлению товаров</v-btn>
      </router-link>
    </v-col>  
  </v-container>
</template>

<script>
import { useGlobalStore } from '../store';
import { ref } from 'vue';

export default {
  setup() {
    const store = useGlobalStore();
    const newPerson = ref('');

    // Функция для добавления нового человека
    const addPerson = () => {
      if (newPerson.value.trim() !== '') {
        store.addPerson({ name: newPerson.value, bill: 0 });
        newPerson.value = '';
      }
    };

    // Функция для удаления человека из списка
    const deletePerson = (index) => {
      store.deletePerson(index);
    };

    return { people: store.people, newPerson, addPerson, deletePerson };
  }
};
</script>


