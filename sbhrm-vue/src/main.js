import Vue from 'vue'
import App from './App.vue'

import {
  // Pagination,
  Dialog,
  // Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  // MenuItemGroup,
  Input,
  // InputNumber,
  // Radio,
  // RadioGroup,
  // RadioButton,
  Checkbox,
  // CheckboxButton,
  // CheckboxGroup,
  // Switch,
  // Select,
  // Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  // DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  Tag,
  // Tree,
  // Alert,
  // Slider,
  Icon,
  Row,
  Col,
  // Upload,
  // Progress,
  // Spinner,
  // Badge,
  Card,
  // Rate,
  // Steps,
  // Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  // Timeline,
  // TimelineItem,
  Link,
  // Divider,
  // Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  Avatar,
  Drawer,
  Loading,
  MessageBox,
  Message,
  // Notification
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

// Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
Vue.use(Input);
// Vue.use(InputNumber);
// Vue.use(Radio);
// Vue.use(RadioGroup);
// Vue.use(RadioButton);
Vue.use(Checkbox);
// Vue.use(CheckboxButton);
// Vue.use(CheckboxGroup);
// Vue.use(Switch);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(OptionGroup);
Vue.use(Button);
// Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
// Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
// Vue.use(Popover);
// Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
Vue.use(Tag);
// Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
// Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
Vue.use(Card);
// Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
Vue.use(Link);
// Vue.use(Divider);
// Vue.use(Image);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);
Vue.use(Avatar);
Vue.use(Drawer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: {
      name: '',
      avatar: ''
    },
    routes: []
  },
  mutations: {
    setCurrentUser(state, user){
      state.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearCurrentUser(state){
      state.currentUser = { name: '', avatar: '' };
      localStorage.removeItem('user');
    },
    setRoutes(state, routes) {
      state.routes = routes;
    }
  }
})


import router from './router'

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    if (localStorage.getItem('user')) {
      next();
    } else {
      next('/login?redirect=' + to.path);
    }
  }
})


import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// handle all errors here
axios.interceptors.response.use(success => {
  if (success.status && success.status === 200 && success.data.status === 500) {
    Message.error({message: success.data.msg})
  } else if (success.data.msg) {
    Message.success({message: success.data.msg})
  }
  return success.data;
}, error => {
  if (error.response.status === 401 || error.response.status === 403) {
    Message.error({message: error.response.data.msg ? error.response.data.msg : 'Please log in.'})
    store.commit('clearCurrentUser')
    router.replace('/login');
  } else {
    if (error.response.data.msg) {
      Message.error({message: error.response.data.msg})
    } else {
      Message.error({ message: `${error.response.status}: ${error.response.statusText}` })
    }
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  mounted() {
    if (localStorage.getItem('user')) {
      try {
        store.commit('setCurrentUser', JSON.parse(localStorage.getItem('user')));
      } catch(e) {
        store.commit('clearCurrentUser');
      }
    }
  },
  render: h => h(App)
}).$mount('#app')
