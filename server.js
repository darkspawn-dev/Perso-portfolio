const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();

app.use(express.json());
app.use(express.static(initialPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
});

app.post("/mail", (req, res) => {
  const { firstname, lastname, email, msg } = req.body;

  const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: process.env.EMAIL,
      password: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "enter sender email here",
    to: "enter receiver email here",
    subject: "Portfolio",
    text: `First name: ${firstname}, \nLast name:${lastname}, \nEmail: ${email}, \nMessage: ${msg}`,
    }
    
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err);
            res.json('oops! it seems like some error occured. Please try again')
        } else {
            res.json('thanks for e-mailing me. i wiil reply to you 2 working days');
        }
    })
});

app.listen("3000", () => {
  console.log("listening.....");
});
