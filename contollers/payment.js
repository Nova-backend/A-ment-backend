const express = require('express');
const Publishable_Key = require('../server')
const app = express()
const stripe = require('stripe');

 
module.exports.payment = () =>{
    return async(req,res) => {
        stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then((customer) =>{
            return stripe.charges.create({
                amount: 2500,
                description : 'Pay your client',
                currency : 'frw',
                customer:customer.id
            })
        })
        .then((charge)=> {
            res.send("Success");
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
    }
}