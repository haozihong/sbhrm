<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '2']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user"></i>User Info</template>
            <el-menu-item index="1-1">
              <router-link to="/hr/basic">Basic Info</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>HR Management</template>
            <el-menu-item index="2-1">
              <router-link to="/hr/list">All HR</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>Navi III</template>
            <el-menu-item-group>
              <template slot="title">Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="4">
            <router-link to="/about"><i class="el-icon-info"></i>About</router-link>
          </el-menu-item>
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
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('Are you sure?', 'Logging out', {
          confirmButtonText: 'Log out',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.axios.get("/logout");
          this.$store.commit('clearCurrentUser')
          this.$router.replace("/login");
        });
      }
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