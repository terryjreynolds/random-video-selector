/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
//import loadClient from "./src/helpers/loadClient.js"

const addScript = url => {
  const script = document.createElement("script")
  script.src = url
  document.body.appendChild(script)
}
export const onClientEntry = () => {
  addScript("https://apis.google.com/js/api.js")
}

function loadClient() {
  console.log("found it")
  window.gapi.client.setApiKey(process.env.YOUTUBE_API_KEY)
  return window.gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API")
      },
      function (err) {
        console.error("Error loading GAPI client for API", err)
      }
    )
}
export const onInitialClientRender = () => {
  window.gapi.load("client", loadClient)
}
