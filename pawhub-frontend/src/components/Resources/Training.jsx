import { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../api_keys';


export default function TrainingVideos() {
  const [videos, setVideos] = useState([]);
  const [videoTitles, setVIdeoTitles] = useState([]);

  //console.log("api key: ", API_KEY)

  // useEffect makes API request and retrieve video IDs when the component is mounted
  // the component then renders the 'Video' component for each video ID, passing the video ID as a prop
  useEffect(() => {
    const fetchData = () => {
      const obj = API_KEY;
      const YOUTUBE_API_KEY = obj.key;
      //console.log("KEY: ", KEY)

      // search.list allows you to search for videos that match a specified query term
      // 'part' paramenter specifies the query term you want to search, typically for videos set it to 'id'
      // 'q' parameter specifies the query term you want to search for
      // 'key' parameter specifies API_KEY
      // 'type' parameter specifies the type of resource you want to search for
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search` +
          `?part=id` +
          `&q=dog+training` +
          `&type=video` +
          `&key=${YOUTUBE_API_KEY}`
        )
        .then(response => {
          setVideos(response.data.items);
          const videoTitles = response.data.items.map(item => item.snippet.title);
          setVIdeoTitles(videoTitles);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, []);


  return (
    // use Youtube iframe player API to embed the videos
    <div>
      {videos.map((video, index) => (
        <iframe
          key={video.id.videoId}
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture"
          allowFullScreen
          title={videoTitles[index]}
        />
      ))}
    </div>
  );
};