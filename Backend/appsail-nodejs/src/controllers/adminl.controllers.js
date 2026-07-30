export const adminLogin = (req, res) => {
   console.log("Email from env:", process.env.adminemail);
  console.log("Password from env:", process.env.adminpassword);

  const { email, password } = req.body;
  if (
    email === process.env.adminemail &&
    password === process.env.adminpassword
  ) {
    return res.status(200).json({
      success: true,
      message: 'Admin Login Successful'
    });
  }
  return res.status(401).json({
    success: false,
    message: 'Invalid Email or Password'
  });
};
 export default {
       adminLogin
  };