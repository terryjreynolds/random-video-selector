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


