var clientRequestModels = require("../models/RequestClientModels");

// create and save new user
const createAppointment = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new user
  const appoint = new clientRequestModels({
    company: req.body.company,
    serviceNeeded: req.body.serviceNeeded,
    specificStaff: req.body.specificStaff,
      
  });

  // save user in the database
  appoint
    .save(appoint)
    .then((data) => {
      // res.send(data)
      res.status(200).send({ message: "appointment created successfully" });
      // res.redirect('/add-user');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all users/ retrive and return a single user
const findAppoint = async (req, res) => {
  try {
    const appointData = await clientRequestModels.find();
    res.status(201).json(appointData);
    console.log(appointData);
  } catch (error) {
    
    res.status(422).json(error);
  }
};
const getAppoint = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await clientRequestModels.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
};

// Update a new idetified user by user id
const updatedAppoint = async (req, res) => {
  try {
    await clientRequestModels.findByIdAndUpdate(id, req.body, {
      new: true,
    });


  }catch(error){
    console.log(error);
  }}
// Delete a user with specified user id in the request
const deleteAppoint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletAppoint = await clientRequestModels.findByIdAndDelete({
      _id: id,
    });
    console.log(deletAppoint);
    res.status(201).json(deletAppoint);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};
module.exports = {
  deleteAppoint,
  findAppoint,
  createAppointment,
  updatedAppoint,
  getAppoint,
  // module.exports = getUser;
};
