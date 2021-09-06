const express = require('express');
const router = express.Router();

// api instagram
const Instagram = require('node-instagram').default; // módulo
const { clientId, clientSecret } = require('../keys').instagram;

const instagram = new Instagram({ // instancia del módulo
    clientId: clientId,
    clientSecret: clientSecret
})

const redirectUri = 'http://localhost:3000/handleauth';
router.get('/auth/instagram', (req, res) => {
    console.log('hiii');
    res.redirect(
        instagram.getAuthorizationUrl(redirectUri, {
            scope: ['basic', 'likes'], // en scope está lo que quiero obtener de instagram
            state: 'your state'
        })
    );
});

router.get('/', (req, res) => {
    res.render('index');
});



router.get('/handleauth', async (req, res) => {
    const code = req.query.code;
    const data = await instagram.getAuthorizeUser(code, redirectUri);
    console.log(data);
});

router.get("/login", (req, res) => {
    res.redirect("/auth/instagram");
});

router.get('/logout'), () => {

};

router.get('/profile'), () => {

};

module.exports = router;