import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import hero from "./img/hero.jpg"

function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState(null);

    async function fetchImages(e,flag){
      if(e){
        e.preventDefault();
        setPage(page=>1);
      }
        const BASE_URL = 'https://api.unsplash.com';
        const API_KEY = `${process.env.REACT_APP_UNSLASH_ACEESS_KEY}`;
        const END_POINT = '/search/photos';
        try{
            setLoading(true);

            const {data} = await axios.get(
                BASE_URL + END_POINT , {
                    params: {
                        client_id: API_KEY,
                        page,
                        per_page: 6,
                        query:search||"random"
                    }
                }
            )
            if(flag === "submit"){
              setImages([...data.results]);

            }
            else{
              setImages(images => [...images, ...data.results]);
            }
            setPage(page => page+1);
          }
        catch(e){
            setError(e.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchImages();
    }, [])

    return (
      <div className='main'>
        <h1>Image Bazar</h1>
      <div className='header'>
      <form onSubmit={(e)=>{fetchImages(e,"submit")} }>
        <input type="text" value={search} placeholder='Search Pictures ...' onChange={(e)=>{setSearch(e.target.value)}}/>
        <button type='submit' >Search</button>
      </form>
      </div>

      <div className='hero'>
        <img src={hero} alt="" />
      </div>

        <div className='gallery'>
            <InfiniteScroll
                dataLength={images.length}
                next={()=>{fetchImages(false,"next")}}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {
                    images?.map((e, i) => (
                        <div key={i} className="img-box">
                            <img src={e?.urls?.small} alt="" />
                        </div>
                    ))
                }
            </InfiniteScroll>
        </div>
        </div>
    )
}

export default App