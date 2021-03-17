<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu router unique-opened v-if="$store.state.routes">
          <el-submenu v-for="(item, index) in $store.state.routes" :index="'' + (index + 1)" :key="index">
            <template slot="title"><i :class="item.iconCls"></i>{{ item.name }}</template>
            <el-menu-item v-for="(child, index2) in item.children" :index="child.frontendRoute" :key="index2">
              {{ child.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header id="home-header">
          <div class="title">Quick HR</div>
          <el-dropdown trigger="click"  @command="handleCommand">
            <span id="user-corner" class="el-dropdown-link">
              {{$store.state.currentUser.name}}
              <i><img :src="$store.state.currentUser.avatar" alt=""></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">User Info</el-dropdown-item>
              <el-dropdown-item command="setting">Setting</el-dropdown-item>
              <el-dropdown-item command="logout" divided>Sign out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  mounted() {
    this.getMenuFromServer();
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('Are you sure?', 'Signing out', {
          confirmButtonText: 'Log out',
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
.homeRouterView {
  margin-top: 10px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  color: #409eff;
  padding-top: 50px;
}

#home-header {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

#home-header .title {
  font-size: 30px;
  color: #ffffff
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #ffffff;
}

</style>