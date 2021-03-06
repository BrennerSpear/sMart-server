const Product = require('../models/product')
const axios = require('axios')

const axiosUber = axios.create({
  baseURL: 'https://sandbox-api.uber.com/v1/sandbox/deliveries/',
  headers: {
    'Content-Type' : 'application/json',
    Authorization: ('Bearer ' + process.env.UBER_RUSH_ACCESS_TOKEN)
  }
})

var changeUberStatus = function(delivery_id, status) {
  // console.log('changeUberStatus')
  // console.log(delivery_id)
  return axiosUber.put(delivery_id, {
    status: status
  })
  .then(response => {
    console.log(response)
    return response
  })
}

var getDeliveryInfo = function(delivery_id) {
  return axiosUber.get(delivery_id)
  .then(response => {
    return response
  })
}

const wait = function(t) {
  var time = t || 1000
  return new Promise(function(resolve, reject) {
    setTimeout(() => {resolve()}, time)
  }) 
}


module.exports.simulateDelivery = function(req, res) {
  var deliveryId
  const productId = req.query.productId
  const waitTime = req.query.waitTime || 1000

  Product.getWithAllRelated(productId)
  .then(product => {
    deliveryId = product.relations.transaction.attributes.uber_delivery_id
    return changeUberStatus(deliveryId, 'en_route_to_pickup')
  })
  .then(() => {
    return wait(waitTime)
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'at_pickup')
  })
  .then(() => {
    return wait(waitTime)
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'en_route_to_dropoff')
  })
  .then(() => {
    return wait(waitTime)
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'at_dropoff')
  })
  .then(() => {
    return wait(waitTime)
  })
  .then(() => {
    return changeUberStatus(deliveryId, 'completed')
  })
  .then(() => {
    res.json({message: 'It should have worked. let us see...'})
  })
}

module.exports.deliveryInfo = function(req, res) {
  const productId = req.query.productId

  Product.getWithAllRelated(productId)
  .then(product => {
    const deliveryId = product.relations.transaction.attributes.uber_delivery_id
    return getDeliveryInfo(deliveryId)
  })
  .then(response => {
    res.send(response)
  })
}
