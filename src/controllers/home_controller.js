//model
const User = require("../models/user_model");

// validation
const validator = require("validator");

//node mailer
const nodeMailer = require("nodemailer");

const path = require("path");
const fs = require("fs");

// juice
const juice = require("juice");
const { Console } = require("console");

//ejs
const ejs = require("ejs");

// Home page
module.exports.homePage = async (req, res) => {
  try {
    if (!req.session.isFirstVisit) {
      req.session.isFirstVisit = true;
      res.render("index", { isFirstVisit: true });
    } else if (req.session.isFirstVisit) {
      res.render("index", { isFirstVisit: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// Home page post
module.exports.homePagePost = async (req, res) => {
  try {
    let { nameUser, numberUser, emailUser, messageUser } = req.body;

    //function validation
    function Validation(
      nameUser,
      numberUser,
      emailUser,
      messageUser,
      validator
    ) {
      let dataUser = {};

      //validate firstname
      if (nameUser) {
        if (nameUser[0] !== nameUser[0].toUpperCase()) {
          return {
            success: false,
            message: "Nom, Première lettre en majuscule.",
          };
        }

        const specialCharsRegex = /[!@#$%^&*()_+\=[\]{};':"\\|,<>/?]/;
        if (specialCharsRegex.test(nameUser)) {
          return {
            success: false,
            message: "Nom, Les caractères spéciaux ne sont pas autorisés.",
          };
        }

        dataUser.nameUser = nameUser;
      } else {
        return {
          success: false,
          message: "Nom, cette case ne doit pas être vide.",
        };
      }

      //validate lastname
      if (numberUser) {
        if (isNaN(numberUser)) {
          return {
            success: false,
            message: "Numéro, seuls les nombres sont autorisés.",
          };
        }

        if (numberUser.trim().length < 10) {
          return {
            success: false,
            message: "Numéro, Au moins 10 lettres ou chiffres.",
          };
        }

        dataUser.numberUser = numberUser;
      } else {
        return {
          success: false,
          message: "Numéro, cette case ne doit pas être vide.",
        };
      }

      // validate email
      if (emailUser) {
        if (!validator.isEmail(emailUser)) {
          return {
            success: false,
            message: "Adresse mail, L’adresse mail n’est pas valide.",
          };
        }

        dataUser.emailUser = emailUser;
      } else {
        return {
          success: false,
          message: "Adresse mail, cette case ne doit pas être vide.",
        };
      }

      // validate messageUser
      if (messageUser) {
        dataUser.messageUser = messageUser;
      } else {
        return {
          success: false,
          message: "Message, cette case ne doivent pas être vides.",
        };
      }

      return { success: true, dataUser };
    }

    // validation result
    const validationResult = Validation(
      nameUser,
      numberUser,
      emailUser,
      messageUser,
      validator
    );

    if (!validationResult.success) {
      req.flash("error_msg", validationResult.message);
      return res.redirect("/");
    }

    //function send email
    let dataUser = validationResult.dataUser;

    async function newMessage(nodeMailer, juice, dataUser, fs, ejs, path) {
      const transporter = await nodeMailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.PASSWORD,
        },
      });

      // template path of new message
      const templatePathNewMessage = path.join("views", "mail_contact.ejs");

      // Compile and read template of new message
      const templateNewMessage = fs.readFileSync(
        templatePathNewMessage,
        "utf8"
      );

      const htmlContentNewMessage = ejs.render(templateNewMessage, {
        dataUser,
      });

      const mailOptions = [
        {
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER,
          subject: "Nouveau Message",
          html: juice(htmlContentNewMessage),
        },
      ];

      try {
        const sendMailPromises = mailOptions.map(
          async (option) => await transporter.sendMail(option)
        );
        await Promise.all(sendMailPromises);
        return Promise.resolve("Message Sent Successfully!");
      } catch (error) {
        return Promise.reject(error);
      }
    }

    // send email
    newMessage(nodeMailer, juice, dataUser, fs, ejs, path);

    // save user
    let newUser = new User(validationResult.dataUser);

    await newUser.save();

    return res.render("respond", { dataUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
