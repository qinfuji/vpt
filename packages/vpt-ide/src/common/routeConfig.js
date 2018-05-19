import App from '../features/home/App';
import homeRoute from '../features/home/route';
import { PageNotFound } from '../features/common';
// import commonRoute from '../features/common/route';
// import rekitCmdsRoute from '../features/rekit-cmds/route';
// import diagramRoute from '../features/diagram/route';
// import rekitToolsRoute from '../features/rekit-tools/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes for new features, remove features, etc.
const childRoutes = [
  homeRoute
  // commonRoute,
  // rekitCmdsRoute,
  // diagramRoute,
  // rekitToolsRoute,
];

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      ...childRoutes,
      { path: '*', name: 'Page not found', component: PageNotFound }
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0))
  }
];

function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = route.path;
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);

export default routes;
