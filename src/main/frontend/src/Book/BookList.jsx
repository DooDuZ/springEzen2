import React from "react";
import Book from "./chapter3/Book";
import Library from "./chapter3/Library";
import Clock from "./chapter4/Clock";
import CommentList from "./chapter5/CommentList";
import NotificationList from "./chapter6/NotificationList";
import Accommodate from "./chapter7/Accommodate";
import ConfirmButton from "./chapter8/ConfirmButton";
import LandingPage from "./chapter9/LandingPage";
import {BrowserRouter, Link, Route, Router} from "react-router-dom";
import Home from "../component/Home";
import Signup from "../component/member/Signup";

export default function BookList(){
    return(
        <div>
            <ul>
                <li> <Link to="/chapter3/Library"> chapter3 </Link>  </li>
                <li> <Link to="/chapter4/Clock"> chapter4 </Link>  </li>
                <li> <Link to="/chapter5/CommentList"> chapter5 </Link>  </li>
                <li> <Link to="/chapter6/NotificationList"> chapter6</Link>  </li>
                <li> <Link to="/chapter7/Accommodate"> chapter7 </Link>  </li>
                <li> <Link to="/chapter8/ConfirmButton"> chapter8 </Link>  </li>
                <li> <Link to="/chapter9/LandingPage"> chapter9 </Link>  </li>
                <li> <Link to="/chapter10/EX1_Form"> chapter10 </Link>  </li>
                <li> <Link to="/chapter11/SignUp"> chapter11 </Link>  </li>
                <li> <Link to="/chapter12/Calculator"> chapter12 </Link>  </li>
            </ul>
        </div>
    );
}