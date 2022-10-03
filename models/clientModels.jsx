const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	fullNames: { type: String, required: true },
	username: { type: String, required: true },
	Email: { type: String, required: true },
	password: { type: String, required: true },
	profileUrl:{type:String},
	appointments:{type:Object},
	tasks:{type:Object},
	notifications:{type:Object}

});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstname: Joi.string().required().label("FirstName"),
		lastname: Joi.string().required().label("LastName"),
		address: Joi.string().required().required().label("Address"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports = { User, validate };