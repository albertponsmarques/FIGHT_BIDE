import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Image from "./components/ImageDownloader";

export default function News() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  //const [title, setTitle] = useState(null);
  //const [description, setDescription] = useState(null);
  //const [img, setImg] = useState(null);
  //const [date, setDate] = useState(null);
  //const [likes, setlikes] = useState(null);
  //const [creator, setCreator] = useState(null)

  useEffect(() => {
    getNews();
  }, []);

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
        <ul>
          {news.map((neu) => (
            <li className="newsItem" key={neu.title}>
              <Image url={neu.img} size={400} />
              <h5 className="newsTitle">{neu.title}</h5>
              <h5 className="newsDescription">{neu.description}</h5>
              <h5 className="newsDate">{neu.created_at}</h5>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
