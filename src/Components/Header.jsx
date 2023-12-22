import React from "react";
import logo from "../img/logo.png";
import { IoMenuSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";

const Header = (props) => {
    // console.log(props.value)
    const {fetchImages,search,setSearch} = props.value;
  return (
    <nav className="header">

        <div className="upper">
          <div className="navLeft">
          <IoMenuSharp />
          </div>
          <div className="navCenter">
            <img src={logo} alt="" />
          </div>
          <div className="navRight">
            <div>
              <span>
            <span>Pricing</span>
            <button className="navBtn">Sign In</button>
              </span>
            </div>
          </div>
        </div>

        <div className="lower">
        <form
          onSubmit={(e) => {
            fetchImages(e, "submit");
          }}
        >
         <div>
         <IoSearch />
          </div>   
          <input
            type="text"
            value={search}
            placeholder="Search Pictures ..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit">images <FaCaretDown /></button>
        </form>
        </div>
      </nav>

  );
};

export default Header;
