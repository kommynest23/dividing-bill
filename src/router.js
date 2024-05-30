import { createRouter, createWebHistory } from 'vue-router';
import AddPersons from './components/AddPersons.vue';
import AddPositions from './components/AddPositions.vue';
import Results from './components/Results.vue';

const routes = [
  { path: '/', name: 'AddPersons',component: AddPersons },
  { path: '/addpositions',name: 'AddPositions',  component: AddPositions },
  { path: '/results',name: 'Results', component: Results }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;