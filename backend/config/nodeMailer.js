const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "vbijouterie@mail.ru",
      pass: "ceJWGaT3xysRuZpiPXbQ",
    }
  },
    {
    from:"vbijouterie@mail.ru",
    }
  );

  
  
  const mailer = message => {
    transporter.sendMail(message, (err, info)=> {
        if(err) {
            return console.log(err)
        }
        console.log(`Email has been sent ${info.response}`)
    })
  }


 

//vbijouterie api
//ceJWGaT3xysRuZpiPXbQ



  module.exports = mailer


  