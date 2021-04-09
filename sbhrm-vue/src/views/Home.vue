<template>
  <div class="home">
    <el-container>
      <el-aside class="hidden-sm-and-down" width="200px">
        <el-menu router unique-opened v-if="$store.state.routes"  style="height: 100%">
          <el-submenu v-for="(item, index) in $store.state.routes" :index="'' + (index + 1)" :key="index">
            <template slot="title"><i :class="item.iconCls"></i>{{ item.name }}</template>
            <el-menu-item v-for="(child, index2) in item.children" :index="child.path" :key="index2">
              {{ child.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header id="home-header">
          <router-link class="title" to="/" tag="el-link">Quick HR</router-link>
          <span>
            <i class="hidden-md-and-up fas fa-bars fa-2x"
               style="background: rgba(0,0,0,0); color: #5e6e82; cursor:pointer"
               @click="showMenu = true"></i>

            <el-dropdown class="hidden-sm-and-down" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                  {{$store.state.currentUser.name}}
                  <i><img class="user-avatar" :src="$store.state.currentUser.avatar" alt=""></i>
                </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userinfo">User Info</el-dropdown-item>
                <el-dropdown-item command="setting">Setting</el-dropdown-item>
                <el-dropdown-item command="logout" divided>Sign out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </el-header>

        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/'">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/'">
            Welcome to Quick HR!
          </div>
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>

    <el-drawer title="Menu" :visible.sync="showMenu" :with-header="false" size="40%">
      <el-menu router v-if="$store.state.routes" style="margin-top: 10px">
        <el-submenu class="user-profile-menu" index="0">
          <template slot="title">
            <img class="user-avatar" :src="$store.state.currentUser.avatar" alt="">
            {{$store.state.currentUser.name}}
          </template>
          <el-menu-item index="userinfo">User Info</el-menu-item>
          <el-menu-item index="setting">Setting</el-menu-item>
          <el-menu-item index="logout">Sign out</el-menu-item>
        </el-submenu>

        <el-submenu v-for="(item, index) in $store.state.routes" :index="'' + (index + 1)" :key="index">
          <template slot="title">{{ item.name }}</template>
          <el-menu-item v-for="(child, index2) in item.children" :index="child.frontendRoute" :key="index2">
            {{ child.name }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script>
import {initMenu} from '@/utils/menu';

export default {
  name: 'Home',
  data: () => ({
    showMenu: false
  }),
  mounted() {
    initMenu(this.$router, this.$store, this.axios);
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('Are you sure?', 'Signing out', {
          confirmButtonText: 'Sign out',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.axios.get("/logout");
          this.$store.commit('clearCurrentUser')
          this.$router.replace("/login");
        });
      } else if (command === 'userinfo') {
        this.$router.push('/userinfo');
      }
    },
    getMenuFromServer() {
      this.axios.get('/menu/menuTree').then(resp => {
        if (resp) {
          this.$store.commit('setRoutes', resp.children);
        }
      });
    }
  }
}
</script>

<style>
div.home, .el-container {
  height: 100%;
}

.homeRouterView {
  margin-top: 10px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  color: #2C7BE5;
  padding-top: 50px;
}

#home-header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
  box-shadow: 0 0 2rem 0 rgba(41, 48, 66, 10%);
}

#home-header .title {
  font-size: 30px;
  color: #409eff;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #293042;
}

.el-submenu .fas, .el-submenu .far {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
  color: #409eff;
}

#home-header .user-avatar {
  width: 40px;
  height: 40px;
  margin-left: 8px;
}

.el-submenu .user-avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}

.user-profile-menu {
  border-bottom: 1px solid #eaeaea;
}
</style>