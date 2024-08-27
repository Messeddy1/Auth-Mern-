import { Fragment } from "react";
import Header from "./Component/Header";
import {Outlet} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <Fragment>
      <Header />
    <Outlet/>
    <ToastContainer />  {/* To display notifications */}
    </Fragment>
  );
}
