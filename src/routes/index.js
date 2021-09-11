const express = require("express");
const router = express.Router();

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
    const code = req.query.code;
    const data = await instagram.authorizeUser(code, redirectUri);
    console.log('1'); 
    instagram.config.accessToken = data.access_token;
    console.log('2');
    res.send(instagram);
  } catch (err) {
    res.json(err);
  }
});

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", async (req, res) => {
  try {
    const profileData = await instagram.get("users/self");
    const media = await instagram.get('users/self/media/recent');
    console.log(profileData);
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