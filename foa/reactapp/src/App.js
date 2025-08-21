import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Forget from "./components/Forget";

// User Components
import UserHome from "./components/User/UserHome";
import Menu from "./components/User/Menu";
import MyOrders from "./components/User/MyOrders";
import Reviews from "./components/User/Reviews";
import Payments from "./components/User/Payments";
// User Components
import RestaurantMenu from "./components/User/RestaurantMenu";



// App Admin Components
import AdminHome from "./components/AppAdmin/AdminHome";           
import ManageRestaurants from "./components/AppAdmin/ManageRestaurants"; 
import Feedbacks from "./components/AppAdmin/Feedback";           
import AddRestaurant from "./components/AppAdmin/AddRestaurant";  

// Hotel Admin Components
import HotelAdminHome from "./components/HotelAdmin/HAdminHome";         
import HotelAdminOrders from "./components/HotelAdmin/HotelAdminOrders";  
import HotelAdminInventory from "./components/HotelAdmin/HotelAdminInventory"; 
import AddFood from "./components/HotelAdmin/AddFood";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
// Paths where Navbar should be hidden
const HideNavbarPaths = ["/", "/register", "/forgot-password"];

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbar = HideNavbarPaths.includes(location.pathname);

  return (
    <CartProvider>
      {/* Show Navbar only on certain pages */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ============== PUBLIC ROUTES ============== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forget />} />

        {/* ============== USER ROUTES ============== */}
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/userhome/menu/:restaurantId" element={<Menu />} />
        <Route path="/userhome/orders" element={<MyOrders />} />
        <Route path="/userhome/reviews" element={<Reviews />} />
        <Route path="/userhome/payments" element={<Payments />} />
        <Route path="/userhome/restaurant/:restaurantId/menu" element={<RestaurantMenu />} />

        {/* ============== APP ADMIN ROUTES ============== */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminhome/manage-restaurants" element={<ManageRestaurants />} />
        <Route path="/adminhome/feedbacks" element={<Feedbacks />} />
        <Route path="/adminhome/add-restaurant" element={<AddRestaurant />} />

        {/* ============== HOTEL ADMIN ROUTES ============== */}
        <Route path="/hoteladmin" element={<HotelAdminHome />} />
        <Route path="/hoteladmin/orders" element={<HotelAdminOrders />} />
        <Route path="/hoteladmin/inventory" element={<HotelAdminInventory />} />
        <Route path="/hoteladmin/add-food" element={<AddFood />} />
      </Routes>
    </CartProvider>
  );
};

const App = () => (
  <Router>
    <ToastContainer 
    position="top-right" 
    autoClose={5000} 
    hideProgressBar={false} 
    newestOnTop={false} 
    closeOnClick 
    pauseOnFocusLoss
    pauseOnHover 
    draggable 
    style={{zIndex : 9999}}/>
    <AppWrapper />
  </Router>
);

export default App;
