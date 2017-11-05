var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "codereviewer@jslovers.com",
        pass: "codereviewer@12"
    }
});

const mailsend = (mail) => {
    var mail = {
        from: `codereviwer <codereviwer@jslovers.com>`,
        to: "jaswant@jslovers.com",
        subject: "Send Email Using Node.js",
        text: mail,
        html: mail
    }

    smtpTransport.sendMail(mail, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });
}

module.exports = mailsend;