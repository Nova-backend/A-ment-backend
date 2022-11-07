


const stripe = require('stripe');


module.exports.payment = () =>{
    return async(req,res) => {
        stripe.customers.create({
            email:req.body.stripeEmail,
            source:req.body.stripeToken,
            name:'Gourav Hammad',
            address: {
                line1: 'TC 9/4 Old MES colony',
                postal_code : '452331',
                city: 'Indore',
                state: 'Madhya Pradesh',
                country: 'India',
            }
        })
        .then((customer) =>{
            return stripe.charges.create({
                amount: 2500,
                description : 'Web development Product',
                currency : 'INR',
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