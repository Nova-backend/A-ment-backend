const express = require("express");
const {registerDefinition} = require("swaggiffy");
const paymentRouter = express.Router();
const { stripePayment } = require("../contollers/cardPayment.js");
const {momoPayment} = require("../contollers/momoPayment")

paymentRouter.post("/cardPayment", stripePayment());
paymentRouter.post("/momopayment", momoPayment());

registerDefinition(paymentRouter, {tags:'Payment', mappedSchema:'Payment',basePath:'/payment'})
module.exports.paymentRouter = paymentRouter;
