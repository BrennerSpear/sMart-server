const router = require('express').Router()
const path = require('path');
const passport = require('passport');
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH')
var userController = require('./controllers/user');
var upload = require('./s3/upload')
var s3Handler = require('./s3/s3Handler')

// ** routes for authentication, login, and registration **/
//@TODO TEST
router.get('/auth/google/success', userController.checkInfo);
//@TODO TEST
router.get('/auth/google/failure', (req, res) => {
  res.redirect('/login');
});
//@TODO TEST
router.get('/login', passport.authenticate('google', { scope : ['profile', 'email'] }));
//@TODO TEST
router.get('/auth/google/callback',
  passport.authenticate('google', {
      successRedirect : '/auth/google/success',
      failureRedirect : '/auth/google/failure'
}));
//@TODO TEST
router.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
//@TODO TEST
router.get('/users/auth', function(req, res) {
  res.send(req.session);
})

router.get('/api/v1/product', productController.getOne)
router.get('/api/v1/products', productController.getAll)
router.get('/api/v1/categories', categoryController.getAll) 
router.get('/api/v1/getuserproducts', productController.getUserProducts); 
router.get('/api/v1/getuserprofile', userController.getUserProfile); //@TODO change to /user
router.get('/api/v1/product/get_quote', productController.quote)

router.post('/api/v1/postitem', productController.post); //@TODO change to /product

//@TODO TEST:
router.post('/api/v1/postcontactinfo', userController.setContactInfo); //@TODO change to /user
router.post('/api/v1/buy', productController.buy, uberRUSHController.requestDelivery)
router.post('/uber_webhook', uberRUSHController.webhook)
router.post('/upload', upload, s3Handler)

/* ## NOT IN MVP ## */
// router.post('/api/v1/make_bid', /**/)
//?product_id=3 & user_id=4 & offer_price = 100.50
//delete an item

router.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

module.exports = router


