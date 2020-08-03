import React, { useState } from "react"
import YoutubeEmbedVideo from "youtube-embed-video"
import RandomWords from "random-words"

const Video = () => {
  //establish local state for the video id
  const [videoId, setVideoId] = useState("rrwd2_UkmNw")
  //create a function to update state
  function changeVideoId(newUrl) {
    setVideoId(newUrl)
  }
  function execute() {
    let randomWords = RandomWords({ exactly: 2, join: " " })
    console.log("randomWords", randomWords)
    return window.gapi.client.youtube.search
      .list({
        part: ["snippet"],
        maxResults: 10,
        q: randomWords,
        safeSearch: "none",
        type: ["video"],
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response.result.items[0].id.videoId)
          console.log("full Response", response)
          changeVideoId(
            response.result.items[Math.floor(Math.random() * 9 + 0)].id.videoId
          )
          //videoId = response.result.items[0].id.videoId
        },
        function (err) {
          console.error("Execute error", err)
        }
      )
  }
  return (
    <div>
      <div
        style={{
          textAlign: `center`,
        }}
      >
        <YoutubeEmbedVideo
          style={{
            border: `solid black`,
          }}
          videoId={videoId}
          suggestions={false}
        />
      </div>
      <div
        style={{
          textAlign: `center`,
        }}
      >
        <button
          id="videoButton"
          style={{
            backgroundColor: `black`,
            borderRadius: `8px`,
            color: `white`,
          }}
          onClick={execute}
        >
          Find Random Video
        </button>
      </div>
    </div>
  )
}

export default Video
