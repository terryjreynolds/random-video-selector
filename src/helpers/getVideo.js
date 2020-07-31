function authenticate() {
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" })
    .then(
      function () {
        console.log("Sign-in successful")
      },
      function (err) {
        console.error("Error signing in", err)
      }
    )
}
