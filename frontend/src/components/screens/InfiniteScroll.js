import React, { useState, useEffect, Image } from "react";
import { Heading } from "../../components/Heading";
import { UnsplashImage } from "../../components/UnsplashImage";
import { Loader } from "../../components/Loader";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import SkeletonImage from "antd/lib/skeleton/Image";

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  max-width: 70rem;
  margin: 4rem auto;
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
`;

function InfiniteScroller() {
  const [images, setImage] = useState([]);
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);

  useEffect(() => {
    fetchMemes();
  }, []);

  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImage([...images, ...res.data]);
      });
  };

  const fetchMemes = () => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        setMemes(_memes);
      });
    });
  };

  return (
    <div>
      <Heading />
      <p>{memes.length}</p>

      <GlobalStyle />
      <InfiniteScroll
        dataLength={memes.length}
        next={fetchMemes}
        hasMore={true}
        loader={<Loader />}
      >
        <WrapperImages>
          {memes.map((meme) => (
            <div style={{ padding: 10 }}>
              <UnsplashImage url={meme.url} key={meme.id} />
              <p>{meme.name}</p>
            </div>
          ))}
        </WrapperImages>
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteScroller;
