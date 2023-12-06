import React from "react";

import { Link } from "react-router-dom";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-black py-4 ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/loungify-music">
          <img src="loungifylogo3.png" style={{ height: 45, width: 100, paddingLeft:20 }}/></a>
          
        <div>
          <button 
            className="btn btn-sm btn-secondary d-flex justify-content-center "
            type="button"
            aria-expanded="false"           
          >
            <Link className=" text-danger " to="/likedMusic">
                  Liked Music
              </Link>
          </button>
        </div>

        <div
          className="collapse navbar-collapse d-flex ms-4 px-5 horiz"
          id="navbarSupportedContent"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={handleKeyPress}
            className="form-control me-2 w-75 paddingRight"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={fetchMusicData} className="btn btn-outline-success px-3 mx-10">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
