import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./css/news.css";
import Image from "./components/ImageDownloader";
import HeartCheckbox from 'react-heart-checkbox';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import "./css/video-react.css";

export default function News() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  let [wichFile, setWichfile] = useState(false);
  let [laik, setLaik] = useState(false);
  //const [title, setTitle] = useState(null);
  //const [description, setDescription] = useState(null);
  //const [img, setImg] = useState(null);
  //const [date, setDate] = useState(null);
  //const [likes, setlikes] = useState(null);
  //const [creator, setCreator] = useState(null)

  useEffect(() => {
    getNews();
    isImgOrVideo(news.img);
  }, []);
  
  function onClickLike(){
    setLaik(!laik);
  }

  async function isImgOrVideo(fname) {
    if (
      fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1) ===
      "mp4"
    ) {
      setWichfile(true);
    }
  }

  async function getNews() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("news")
        .select("title, description, img, created_at, likes, creator");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setNews(data);
        //setTitle(data.title);
        //setDescription(data.description);
        //setImg(data.img);
        //setDate(data.date);
        //setlikes(data.likes);
        //setCreator(data.creator);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="newsBackGround">
      <div className="newsFront">
        <h5 className="newsTitle">NEWS</h5>
        <ul>
          {news.map((neu) => (
            <li key={neu.title}>
              <div className="newsItem">
                {!wichFile && <Image url={neu.img} size={400} />}
                {wichFile && (
                  <Player>
                    <source src={neu.img_link} />
                    <ControlBar>
                      <ReplayControl seconds={10} order={1.1} />
                      <ForwardControl seconds={10} order={1.2} />
                      <CurrentTimeDisplay order={4.1} />
                      <TimeDivider order={4.2} />
                      <PlaybackRateMenuButton
                        rates={[5, 2, 1, 0.5, 0.1]}
                        order={7.1}
                      />
                      <VolumeMenuButton enabled />
                    </ControlBar>
                  </Player>
                )}
                <h5 className="author">By {neu.creator}</h5>
                <h5 className="newTitle">{neu.title}</h5>
                <h5 className="newsDescription">{neu.description}</h5>
                <div className="likesDiv">
                  <HeartCheckbox checked={laik} onClick={onClickLike} />
                  <h5 className="likes">{neu.likes}</h5>
                </div>
                <h5 className="newsDate">{neu.created_at.slice(0, 10)}</h5>
              </div>
            </li>
          ))}
        </ul>
        <div className="mb-5"></div>
      </div>
    </div>
  );
}
