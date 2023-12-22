import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./Components/Header";
import hero from "./img/hero.jpg";
import logo from "./img/logo.png";
import { IoMenuSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";



function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  async function fetchImages(e, flag) {
    if (e) {
      e.preventDefault();
      setPage((page) => 1);
    }
    const BASE_URL = "https://api.unsplash.com";
    const API_KEY = `${process.env.REACT_APP_UNSLASH_ACEESS_KEY}`;
    const END_POINT = "/search/photos";
    try {
      setLoading(true);

      const { data } = await axios.get(BASE_URL + END_POINT, {
        params: {
          client_id: API_KEY,
          page,
          per_page: 6,
          query: search || "random",
        },
      });
      if (flag === "submit") {
        setImages([...data.results]);
      } else {
        setImages((images) => [...images, ...data.results]);
      }
      setPage((page) => page + 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="main">
      <Header value={{fetchImages,search,setSearch}} />
      <div className="hero">
        <img src={hero} alt="" />
      </div>

      <div className="gallery">
        <InfiniteScroll
          dataLength={images.length}
          next={() => {
            fetchImages(false, "next");
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {images?.map((e, i) => (
            <div key={i} className="img-box">
              <img src={e?.urls?.small} alt="" />
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
