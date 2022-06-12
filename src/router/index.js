import {createRouter, createWebHistory} from 'vue-router'
import CodeSaveView from '../views/CodeSaveView.vue'
import MainView from '../views/MainView.vue'
import HomeView from '../views/content/HomeView.vue'
import CodesView from '../views/content/CodesView.vue'
import SearchView from '../views/content/SearchView.vue'
import LoginView from '../views/user/LoginView.vue'
import SettingView from '../views/setting/SettingView.vue'

const routes = [
    {
        path: '/', name: 'Main', component: MainView,
        redirect: '/home',
        children: [
            {path: '/home', name: 'HomeView', component: HomeView},
            {path: '/codes', name: 'CodesView', component: CodesView},
            {path: '/search', name: 'SearchView', component: SearchView},
            {path: '/setting', name: 'SettingView', component: SettingView}
        ]
    },
    {path: '/codeSave', name: 'CodeSaveView', component: CodeSaveView},
    {path: '/login', name: 'LoginView', component: LoginView},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
