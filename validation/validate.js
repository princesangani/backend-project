const Joi = require('joi');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

const updatevalidate = (req,res,next) => {
  const updateuserschema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(), 
  password: Joi.string().min(4).max(8).optional(),
});
    const { error } = updateuserschema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
        status: false, 
        message: 'bad request',  
        error: error. details[0].message
     });
  }
  next(); 
}

const signupvalidate = (req, res, next) => {
  const signupschema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
});
  const { error } = signupschema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      status: false,
      message: 'bad request',
      error: error.details[0].message,
    });
  } 
  next();
};

const loginvalidate = (req, res, next) => {
  const loginschema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
});
  const { error } = loginschema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: 'bad request',
      error: error.details[0].message,
    });
  }
  next();
};

module.exports = {updatevalidate,signupvalidate,loginvalidate};