import { useEffect, useState } from "react";
import Card from "./components/Card";
// import CreatePlaylist from "./components/CreatePlaylist";
import { initializePlaylist } from "./initialize";
import { Route, Routes } from "react-router-dom";
import LikedMusic from "./components/LikedMusic";
import Navbar from "./components/Navbar";
import "./styles.css";
import Footer from "./Footer.js";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const fetchMusicData = async () => {
    setIsLoading(true);
    setSearchClicked(true);
    try 
      {
        const response = await fetch
        (
          `https://api.spotify.com/v1/search?q=${keyword}&type=track`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch music data");
        }

        const jsonData = await response.json();
        setTracks(jsonData.tracks.items);
      }   catch (error) {
        setMessage(error.message);
      }   finally {
      setIsLoading(false);
    }
    
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();

    // current client credentials will be deleted in few days
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=SPOTIFY_CLIENT_ID&client_secret=SPOTIFY_CLIENT_SECRET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, []);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />

      <Routes>
        <Route path="/likedMusic" element={<LikedMusic />} />
        <Route path="/" element={<div></div>} />
      </Routes>
    <div>
      <div className="container">
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
              >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
          <div className="row">
            {tracks.map((element) => {
              return <Card key={element.id} element={element} />;
            })}
          </div>
        </div>
      </div >
    <div className="logo">
      <div className={`${searchClicked || isLoading ? "d-none" : ""}`}>         
              <img src="musicbg.png"  />  
              </div>       
      </div>
      <div class="m-auto max-w-screen-xl text-center flex flex-col items-center">
            <Footer></Footer>
      </div>
    </>
  );
}

export default App;
