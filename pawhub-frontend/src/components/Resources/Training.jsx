import { useState, useEffect } from 'react';
import axios from 'axios';
import API_KEY from '../api_keys';
import './Training.css';


export default function TrainingVideos() {
  const [videos, setVideos] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);

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
          `&maxResults=6` +
          `&key=${YOUTUBE_API_KEY}`
        )
        .then(response => {
          setVideos(response.data.items);
          const videoTitles = response.data.items.map(item => item.snippet.title);
          setVideoTitles(videoTitles);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, []);


  return (
      <div className="video-container">
        {videos.map((video, index) => (
          <div className="video" key={video.id.videoId}>
            <h3>{videoTitles[index]}</h3>
          <iframe
            key={video.id.videoId}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture"
            allowFullScreen
            title={videoTitles[index]}
           />
          </div>
       ))}
     </div>
  );
};