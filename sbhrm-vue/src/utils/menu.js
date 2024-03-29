import Home from '../views/Home.vue'

export const initMenu = (router, store, axios) => {
  axios.get('/menu/menuTree').then(resp => {
    if (resp) {
      let fmRoutes = formatRoutes(resp.children);
      fmRoutes.forEach(e => {
        router.addRoute(e);
      });
      store.commit('setRoutes', fmRoutes);
    }
  });
}

export const formatRoutes = (routes) => {
  const sep = require('path').sep;
  let fmRoutes = [];
  routes.forEach(route => {
    let {
      frontendRoute,
      component,
      name,
      meta,
      iconCls,
      children
    } = route;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: frontendRoute,
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children,
      component: component ?
        () => import(`@/views${frontendRoute.slice(0, frontendRoute.lastIndexOf(sep))}/${component}.vue`) :
        Home
    }
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}