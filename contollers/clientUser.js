const { User, validate } = require("../models/clientModels");
const bcrypt = require("bcrypt");

const { Clientgoogle } = require("../models/googleClientModel.js");

const signUp = async (req, res) => {
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
    res.status(500).send({ message: error.message });
  }
};

const signin = async (req, res) => {
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
};

module.exports = {
  signUp,
  signin,
};
module.exports = {
  signUp,
  signin,
};
module.exports.forgotPassword = () => {
  return async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    res.status(200).json({
      message: "user not found",
    });
    let userInfo = await password.findOne({ email: user.email });
    if (userInfo) {
      password.findOneAndUpdate({ email: userInfo.email });
    } else {
      userInfo = new password({
        email: user.email,
        OTP: OTP,
        userId: user._id,
      });
      await userInfo.save();
    }
  };
};
module.exports.logout = () => {
  return async (req, res) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { token: "" },
      (error, doc) => {
        if (error) {
          res.status(403).json({ success: false, error });
        } else {
          return res.status(200).send({ success: true });
        }
      }
    );
  };
};
function getGoogleAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/auth";
  const options = {
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
    client_id: process.env.CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  return `${rootUrl}?${QueryString.stringify(options)}`;
}

module.exports.oAuth = () => {
  return async (req, res) => {
    res.redirect(getGoogleAuthUrl());
  };
};
module.exports.getGoogleUser = () => {
  return async (req, res) => {
    const code = req.query.code;
    let tokens;
    try {
      const response = await getTokens({ code });
      tokens = response;
    } catch (e) {
      console.log(e);
      return res.json({ message: "Failed to make the request" });
    }

    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_tokeUsern}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const clientgoogle = new Clientgoogle({
          email: googleUser.email,
          given_name: googleUser.given_name,
          id: googleUser.id,

          contact: req.body.contact,

          employees: {
            fullname: req.body.fullname,
            position: req.body.position,
            workingDays: User.workingDays,
            workingHours: req.body.workingHours,
          },
          servicesOffered: {
            digitalisedService: req.body.digitalisedService,
            unDigitalisedService: req.body.unDigitalisedService,
          },
          bio: req.body.bio,
        });
        await Clientgoogle.save();
        console.log(Clientgoogle);
      });
    });
  };
};

function getTokens({ code }) {
  console.log(code);
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: "http://localhost:4000/auth/google",
    grant_type: "authorization_code",
  };
  return axios
    .post(url, values, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}
module.exports.signupGoogle = () => {
  return async (req, res) => {};
};
