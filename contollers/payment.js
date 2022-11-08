const express = require('express')
const app = express()
const stripe = require('stripe');
const uidGenerator = require('uid-generator');
const generateUid = new uidGenerator()
 
module.exports.stripePayment = () =>{
    return async(req,res) => {
        const idKey = await generateUid.generate();
        stripe.customers.create({
            source: req.body.stripeToken,
            email: stripeToken?.email,
            amount:req.body.amount
        })
        .then((customer) =>{
            return stripe.charges.create({
                amount:amount,
                description : 'Pay your client',
                currency : 'frw',
                customer:customer.id,
                receipt_email:stripeToken?.email
            },
            {idKey}
            )
        })
        .then((charge)=> {
            res.status(200).json(charge);
            // res.send("Success");
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
    }
}