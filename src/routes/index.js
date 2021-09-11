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
    console.log('1');
    const data = await instagram.authorizeUser(code, redirectUri);
    console.log('2');
    console.log(data);
    req.session.access_token = data.access_token; // data.access_token contain the user access_token
    console.log('3');    
    req.session.user_id = data.user_id;
    console.log('req.session.access_token ', req.session.access_token);
    console.log('req.session.user_id ', req.session.user_id);

    instagram.config.accessToken = req.session.access_token;
    console.log('4');    


    console.log('instagram');
    console.log(instagram);
    console.log('instagram');

    res.send(data);
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