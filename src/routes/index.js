const express = require("express");
const router = express.Router();
require('dotenv').config();
const { fetch } = require("node-fetch");



// Instagram API
const Instagram = require("node-instagram").default;
const { clientId, clientSecret } = require("../keys").instagram;

const instagram = new Instagram({
  clientId: clientId,
  clientSecret: clientSecret
});
const redirectUri = "https://pagina-prueba1.herokuapp.com/handleauth";

// First redirect user to instagram oauth
router.get("/auth/instagram", (req, res) => {
  res.redirect(`https://api.instagram.com/oauth/authorize?client_id=434732221251949&redirect_uri=https://pagina-prueba1.herokuapp.com/handleauth&scope=user_profile&response_type=code`
  );
});

// Handle auth code and get access_token for user
router.get("/handleauth", async (req, res) => {
  console.log('hi')
  try {
    // The code from the request, here req.query.code for express
    console.log('1');
    const code = req.query.code;
    console.log('2');
    const data = await instagram.authorizeUser(code, redirectUri);
    console.log('3');
    instagram.config.accessToken = data.access_token;
    console.log('4');
    instagram.config.userId = data.user_id;
    console.log('5');
    process.env.authToken = data.access_token;
    console.log(process.env.authToken);
    res.redirect("/profile");
  } catch (err) {
    res.json(err);
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", async (req, res) => {
  console.log('profile');
  console.log(process.env.authToken);
  var url = `https://graph.facebook.com/v11.0/17841449474447015?fields=biography%2Cfollowers_count%2Cfollows_count%2Cid%2Cmedia_count%2Cname%2Cusername%2Cmedia&access_token=${process.env.authToken}`;
  console.log('url ', url);

  try {
    fetch(url, {
      method: 'GET', // or 'PUT'
    }).then(res => {
      console.log('res ', res);
      res.json();
      console.log('res.json() ', res.json());
    })
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    res.render("profile", { user: profileData.data, posts: media.data });
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.redirect("/auth/instagram");
});

router.get("/logout", (req, res) => {
  delete req.session.access_token;
  delete req.session.user_id;
  res.redirect("/");
});

module.exports = router;