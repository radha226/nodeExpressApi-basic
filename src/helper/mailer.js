var nodemailer = require('nodemailer');
exports.details = async ( to , subject, text , html) => {
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: "radhasingh226@gmail.com",
                pass: 'uayzxodnyonmadus',
             },
        secure: true,
        });

	const mailData = {
        from: "radhasingh226@gmail.com",  // sender address
          to: to,   // list of receivers
          subject: subject,
          text: text,
          html: html
    };

    try {
        result = await transporter.sendMail(mailData);
        return true
    }catch (e) {
        return false;
    }
   
}
