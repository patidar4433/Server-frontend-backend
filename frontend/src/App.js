import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Register from "./components/header/Register";
import Login from "./components/header/Login";
import Logout from "./components/header/Logout";
import Data from "./components/header/Data";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/header/ForgotPassword";
import UpdateData from "./components/header/UpdateData";
import ValidationForm from "./components/ValidationForm";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path="/getdata" element={<Data />} />
            <Route path="/updatedata" element={<UpdateData />} />
            <Route path="/formvalidation" element={<ValidationForm/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
