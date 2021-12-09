import  jwt  from "jsonwebtoken";
const validateToken = (token) => {
  if (token) {
    const ver = jwt.verify(token,process.env.JWT_SECRET, (err, data) => {
      return data;
    });
    return ver;
  } else {
    return null;
  }
};
const generateToken = (payload)=>{
    return jwt.sign(payload,'secret',{
        expiresIn: '24h'
    });
};

export {generateToken, validateToken};