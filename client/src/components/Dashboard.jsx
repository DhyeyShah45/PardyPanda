import { useUserContext } from "../context/userContext";
import ProductList from "../pages/ProductList";
import UserList from "../pages/UserList";
import Profile from "./Profile";

const Dashboard = () => {
  const { role } = useUserContext();

  let cssClass = "";
  if (role === 1) {
    cssClass = "container_super";
  } else if (role === 2) {
    cssClass = "container_ea";
  } else {
    cssClass = "container_roa";
  }

  return (
    <div className={cssClass}>
      <div>
        <h1>Products</h1>
        <ProductList />
      </div>
      {role === 1 && (
        <div>
          <h1>Admins</h1>
          <UserList />
        </div>
      )}
      {(role === 1 || role === 2) && (
        <div>
          <h1>My Profile</h1>
          <Profile />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
