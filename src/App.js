import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminLayout from "./layout/admin/AdminLayout";
import MapPage from "./Components/Map/MapPage";
import MapAdmin from "./Components/MapAdmin/MapAdmin";
import HomePage from "./Components/HomePage";
import UserLayout from "./layout/User/UserLayout";
import Login from "./Components/Login/Login";
import AdminPageLayout from "./layout/admin/AdminPageLayout";
import { createBrowserHistory } from "history";

const RouteWrapper = ({ component: Component, layout: Layout, ...rest }) => {
  var token = localStorage.getItem("token");
  var history = createBrowserHistory();
  var isLogin = true;

  if (!token) {
    isLogin = false;
    if (history.location.pathname.includes("/admin")) {
      window.location.href = "/login";
      return <Route {...rest} render={(props) => <div></div>} />;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout isLogin={isLogin}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
function App() {
  return (
    <Router>
      <RouteWrapper path="/map" exact component={MapPage} layout={UserLayout} />

      <RouteWrapper path="/" exact component={HomePage} layout={UserLayout} />

      <RouteWrapper path="/login" exact component={Login} layout={UserLayout} />

      <RouteWrapper
        path="/admin/dashboard"
        exact
        component={HomePage}
        layout={AdminPageLayout}
      />
      <RouteWrapper
        path="/admin"
        exact
        component={HomePage}
        layout={AdminPageLayout}
      />
      <RouteWrapper
        path="/admin/map"
        exact
        component={MapAdmin}
        layout={AdminPageLayout}
      />
    </Router>
  );
}

export default App;
