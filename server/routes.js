const router = require('express').Router()
const path = require('path');
const passport = require('passport');
var categoryController = require('./controllers/category')
var productController = require('./controllers/product')
var uberRUSHController = require('./controllers/uberRUSH')
var coinbaseController = require('./controllers/coinbase')
var userController = require('./controllers/user');
var simulateDelivery = require('./controllers/simulateDelivery')
var upload = require('./s3/upload')
var s3Handler = require('./s3/s3Handler')
var vision = require('./controllers/vision')

// ** routes for authentication, login, and registration **/
//@TODO TEST

// ** routes for authentication, login, and registration ** 

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
router.get('/api/v1/product/getProductHistory', productController.getProductHistory)
// router.get('/api/v1/exchangeCurrency', coinbaseController)

router.post('/api/v1/postitem', productController.post); //@TODO change to /product
router.post('/api/v1/attempt_purchase', productController.attemptPurchase)

//@TODO TEST:
router.post('/api/v1/postcontactinfo', userController.setContactInfo); //@TODO change to /user
router.post('/uber_webhook', uberRUSHController.webhook)
router.post('/coinbase_webhook', coinbaseController.webhook)
router.post('/upload', upload, s3Handler)

router.get('/api/v1/vision', vision.getImageTitleAndCategory)
router.get('/api/v1/payment', productController.isPaid)

// For testing
router.get('/simulate_delivery', simulateDelivery.simulateDelivery)
router.get('/delivery_info', simulateDelivery.deliveryInfo)
/* ## NOT IN MVP ## */
// router.post('/api/v1/make_bid', /**/)
//?product_id=3 & user_id=4 & offer_price = 100.50
//delete an item

//to check random things during dev
router.post('/api/v1/dev', (req, res) => {console.log(req.body); res.end('done')})
router.get('*', (req, res, next) => {
  // if(req.path.split('/')[1] === 'static') return next();
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

module.exports = router


