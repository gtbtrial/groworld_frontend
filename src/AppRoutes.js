import { Route, Routes} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import SearchMember from "./components/SearchMember";
import ViewMembers from "./components/ViewMembers";
import ManageCategory from "./components/ManageCategory";
import ManageSubCategory from "./components/ManageSubCategory";
import ManageProduct from "./components/ManageProduct";
import UpdateSubCategory from "./components/UpdateSubCategory";
import UpdateProduct from "./components/UpdateProduct";
import AdminHome from "./components/AdminHome";
import CreateAdmin from "./components/CreateAdmin";
import Categories from "./components/Categories";
import SubCategories from "./components/SubCategories";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ChangePassword from "./components/ChangePassword";
import ShowCart from "./components/ShowCart";
import Checkout from "./components/Checkout";
import OrderSummary from "./components/OrderSummary";
import ViewOrders from "./components/ViewOrders";
import OrderItems from "./components/OrderItems";
import UpdateStatus from "./components/UpdateStatus";
import ViewUserOrders from "./components/ViewUserOrders";
import SearchProducts from "./components/SearchProducts";
import ContactUs from "./components/ContactUs";
import ActivateAccount from "./components/ActivateAccount";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import WeatherInfo from "./components/WeatherInfo";
import Cookies from "./components/MyCookies";
import AddProductPics from "./components/AddProductPics";
import ShowProdImages from "./components/ShowProdImages";
var AppRoutes=()=>
{
    return(
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/searchmember" element={<SearchMember/>}/>
        <Route path="/viewmembers" element={<ViewMembers/>}/>
        <Route path="/managecategory" element={<ManageCategory/>}/>
        <Route path="/managesubcategory" element={<ManageSubCategory/>}/>
        <Route path="/manageproduct" element={<ManageProduct/>}/>
        <Route path="/updatesubcategory" element={<UpdateSubCategory/>}/>
        <Route path="/updateproduct" element={<UpdateProduct/>}/>
        <Route path="/adminpanel" element={<AdminHome/>}/>
        <Route path="/createadmin" element={<CreateAdmin/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/subcategories" element={<SubCategories/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/productdetails" element={<ProductDetails/>}/>
        <Route path="/changepassword" element={<ChangePassword/>}/>
        <Route path="/showcart" element={<ShowCart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/ordersummary" element={<OrderSummary/>}/>
        <Route path="/vieworders" element={<ViewOrders/>}/>
        <Route path="/orderitems" element={<OrderItems/>}/>
        <Route path="/updatestatus" element={<UpdateStatus/>}/>
        <Route path="/orderhistory" element={<ViewUserOrders/>}/>
        <Route path="/search" element={<SearchProducts/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/activateaccount" element={<ActivateAccount/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        <Route path="/weather" element={<WeatherInfo/>}/>
        <Route path="/cookies" element={<Cookies/>}/>
        <Route path="/ppics" element={<AddProductPics/>}/>
        <Route path="/showppics" element={<ShowProdImages/>}/>
    </Routes>)
}
export default AppRoutes;