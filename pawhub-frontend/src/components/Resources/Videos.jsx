import { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../api_keys";
import "./Videos.css";
import Spinner from "react-bootstrap/Spinner";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoTitles, setVideoTitles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("dog training");
  const [loaded, setLoaded] = useState(false);

  // useEffect makes API request and retrieve video IDs when the component is mounted
  // the component then renders the 'Video' component for each video ID, passing the video ID as a prop
  useEffect(() => {
    const fetchData = () => {
      const YOUTUBE_API_KEY = API_KEY.youtubeAPIKey;

      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search` +
            `?part=id` +
            `&q=${selectedCategory}` +
            `&type=video` +
            `&maxResults=6` +
            `&key=${YOUTUBE_API_KEY}`
        )
        .then((response) => {
          setVideos(response.data.items);
          setVideoTitles(videoTitles);
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, [selectedCategory]);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h1 className="page-header">Videos</h1>
      <div className="video-page">
        {!loaded && (
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        {loaded && (
          <>
            <div className="video-select">
              <label className="label">Select a topic</label>
              <select
                id="video-category"
                className="video-select-input"
                value={selectedCategory}
                onChange={handleChange}
              >
                {/* <Select
            id="video-category"
            className="video-select-input"
            value={selectedCategory}
            onChange={handleChange}
            > */}
                <option value="dog training">Training</option>
                <option value="dog dental health">Dental Health</option>
              </select>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
}
