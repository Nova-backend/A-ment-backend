
const { User, validate } = require("../models/clientModels");
const bcrypt = require("bcrypt");



const Joi = require("joi");

const signUp= async (req, res) => {
	try {
		const { error } = validate(req.body);
        
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ firstname: req.body.firstname });
       
		if (user)
			return res
				.status(409)
				.send({ message: "User with given name already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message:error.message });
        
	}
};
 
const login= async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}
const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().required().label("email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};



