import React, { useState } from "react"
import YoutubeEmbedVideo from "youtube-embed-video"
import RandomWords from "random-words"
import "./video.css"

const Video = () => {
  //on component render, load the API via script and then connect.
  //establish local state of the API connection using a variable. Can't use useState hook because
  //state can't be updated from within the callback function inside loadClient
  let API_CONNECTION = false

  let [loadStatus, setLoadStatus] = useState("noFlash")
  let x = 0
  if (videoId === "rrwd2_UkmNw") {
    console.log("initializing")
    checkGapiStatus()
  }

  function detectGapi() {
    x = x + 1
    console.log("connection attempt = ", x)
    const gapiLoad = window.gapi
    console.log("initial detection of gapiLoad = ", gapiLoad)
    return gapiLoad
  }
  //run async function that checks repeatedly for the existence of gapi before calling connectAPI
  async function checkGapiStatus() {
    let gapiLoad = await detectGapi()
    if (typeof gapiLoad === "object") {
      console.log("typeof gapiLoad", typeof gapiLoad)
      connectAPI()
    } else {
      if (x <= 10 && typeof gapiLoad !== "object") {
        console.log("recursive call")
        setTimeout(function () {
          checkGapiStatus()
        }, 2500)
      } else {
        console.log("im in x condition")
        setLoadStatus("showFlash")
        console.log("supreme error")
      }
    }
  }

  function connectAPI() {
    if (API_CONNECTION === false) {
      window.gapi.load("client", loadClient)
    }
    function loadClient() {
      console.log("found it")
      window.gapi.client.setApiKey(process.env.GATSBY_API_KEY)
      return window.gapi.client
        .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(
          function () {
            console.log("GAPI client loaded for API")
            API_CONNECTION = true
          },
          function (err) {
            console.error("Error loading GAPI client for API", err)
            API_CONNECTION = false
          }
        )
    }
  }

  //establish local state for the video id
  const [videoId, setVideoId] = useState("rrwd2_UkmNw")
  //create a function to update state
  function changeVideoId(newUrl) {
    setVideoId(newUrl)
  }
  function execute() {
    //this will only fire if there is a confirmed API connection
    if (API_CONNECTION) {
      let randomWords = RandomWords({
        exactly: 2,
        join: " ",
      })
      console.log("randomWords", randomWords)
      return window.gapi.client.youtube.search
        .list({
          part: ["snippet"],
          maxResults: 4,
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
              response.result.items[Math.floor(Math.random() * 3 + 0)].id
                .videoId
            )
            //videoId = response.result.items[0].id.videoId
          },
          function (err) {
            console.error("Execute error", err)
          }
        )
    }
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

      <p className={loadStatus}>
        Connection Error. Refresh your browser to try again.
      </p>

      <div
        style={{
          textAlign: `center`,
        }}
      >
        <button
          disabled={API_CONNECTION}
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
