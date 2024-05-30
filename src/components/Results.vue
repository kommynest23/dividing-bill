<template>
  <v-container class="bg-surface-variant">
    <h2>Счета за продукты:</h2>

    <v-row>
      <v-col cols="6"><strong>Человек</strong></v-col>
      <v-col cols="6"><strong>Потратил</strong></v-col>
    </v-row>

    <!-- Итерация по людям для отображения их имени и суммы счета за продукты -->
    <v-row v-for="(person, index) in store.people" :key="index">
      <v-col cols="6">  
        <v-card>
          <v-card-text>{{ person.name }}</v-card-text>
        </v-card> 
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>{{ person.bill }} руб.</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Кнопка для возврата к добавлению товаров -->
    <v-row>
      <v-col>
        <v-btn to="/addpositions">Вернуться к товарам</v-btn>
      </v-col>
    </v-row>

    <!-- Кнопка для возврата к добавлению людей -->
    <v-row>
      <v-col>
        <v-btn to="/">Вернуться к добавлению людей</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useGlobalStore } from '../store';

export default {
  setup() {
    const store = useGlobalStore();

    return { store };
  }
};
</script>