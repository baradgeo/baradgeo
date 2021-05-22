const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

router.get('/index', (req, res) => {
  res.send({
    page_title: 'Home | Baradgeo',
    meta_title: 'Baradgeo Web app and GIS solution provider in Bhopal',
    meta_description: 'Web app and GIS solution provider in Bhopal',
    meta_keywords:
      'Survey, GIS solution, Lidar, Lidar data processing, GIS, Web GIS developer, Full Stack Web development, Raja Barad, Desktop App development, Website design, Matlab Script, Computer Vision, Deep Learning, CNN, ANN, Genetic Algorithm, Object detection, Image processing, Javascript, python, PHP, laravel, node, express, mongodb, django, geodjango, geopandas, pandas, keras, tensorflow, pytorch, react, data science, data analyst, data engineer, Machine learning, Artificial Inteligence.',
  });
});

router.get('/about', (req, res) => {
  res.send({
    page_title: 'About | Baradgeo',
    meta_title: 'Baradgeo Web app and GIS solution provider in Bhopal',
    meta_description: 'Web app and GIS solution provider in Bhopal',
    meta_keywords:
      'Survey, GIS solution, Lidar, Lidar data processing, GIS, Web GIS developer, Full Stack Web development, Raja Barad, Desktop App development, Website design, Matlab Script, Computer Vision, Deep Learning, CNN, ANN, Genetic Algorithm, Object detection, Image processing, Javascript, python, PHP, laravel, node, express, mongodb, django, geodjango, geopandas, pandas, keras, tensorflow, pytorch, react, data science, data analyst, data engineer, Machine learning, Artificial Inteligence.',
  });
});

router.get('/contact', (req, res) => {
  res.send({
    page_title: 'Contact | Baradgeo',
    meta_title: 'Contact Baradgeo Web app and GIS solution provider in Bhopal',
    meta_description: 'Website Sofware and GIS service provider in Bhopal',
    meta_keywords:
      'Survey, GIS solution, Lidar, Lidar data processing, GIS, Web GIS developer, Full Stack Web development, Raja Barad, Desktop App development, Website design, Javascript, python, PHP, laravel, node, express, mongodb, django, geodjango, geopandas, react, data science, data analyst, data engineer, Machine learning, Artificial Inteligence.',
  });
});

router.get('/services', (req, res) => {
  res.send({
    page_title: 'Services | Baradgeo',
    meta_title: 'Baradgeo Web app and GIS solution provider in Bhopal',
    meta_description: 'Web app and GIS solution provider in Bhopal',
    meta_keywords:
      'Survey, DGPS Survey,open source GIS, Arc GIS, Qgis, SAGA GIS, GRASS GIS, Arc Map,  GIS solution, Lidar, Lidar data processing, GIS, Web GIS developer, Full Stack Web development, Raja Barad, Desktop App development, Website design, Matlab Script, Computer Vision, Deep Learning, CNN, ANN, Genetic Algorithm, Object detection, Image processing, Javascript, python, PHP, laravel, node, express, mongodb, django, geodjango, geopandas, pandas, keras, tensorflow, pytorch, react, data science, data analyst, data engineer, Machine learning, Artificial Inteligence.',
  });
});

router.get('/', (req, res) => {
  res.send({
    page_title: 'Home | Baradgeo',
    meta_title: 'Baradgeo Web app and GIS solution provider in Bhopal',
    meta_description: 'Web app and GIS solution provider in Bhopal',
    meta_keywords:
      'Survey, GIS solution, Lidar, Lidar data processing, GIS, Web GIS developer, Full Stack Web development, Raja Barad, Desktop App development, Website design, Matlab Script, Computer Vision, Deep Learning, CNN, ANN, Genetic Algorithm, Object detection, Image processing, Javascript, python, PHP, laravel, node, express, mongodb, django, geodjango, geopandas, pandas, keras, tensorflow, pytorch, react, data science, data analyst, data engineer, Machine learning, Artificial Inteligence.',
  });
});

router.post(
  '/contact-form',
  [
    check('name')
      .not()
      .isEmpty()
      .escape()
      .trim()
      .isLength({ max: 50 })
      .custom((val) => {
        if (val.match(/^[A-Za-z ]+$/)) return true;
        return false;
      })
      .withMessage(
        'Name should contain alphabets only with spaces and must not exceed 50 characters.'
      ),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('org')
      .not()
      .isEmpty()
      .escape()
      .trim()
      .isLength({ min: 5, max: 150 })
      .withMessage('Organization must have more than 5 characters  and less than 150 character'),
    check('subject')
      .not()
      .isEmpty()
      .escape()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Subject must have more than 5 characters and less than 200 character'),
    check('message')
      .not()
      .isEmpty()
      .escape()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Message must have more than 10 characters'),
  ],
  (req, res) => {
    const contact_errors = validationResult(req);

    if (!contact_errors.isEmpty()) {
      return res.status(422).jsonp(contact_errors.array());
    } else {
      const output = `
      <p>You Have a new contact request:</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Org: ${req.body.org}</li>
      </ul>
      <h3>Subject</h3>
      <p>${req.body.subject}</p>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

      let transporter = nodemailer.createTransport({
        /*   service: 'gmail',
      auth: {
          user: 'baradgeo', // generated ethereal user
          pass: 'TimePass097' // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }  */
        port: 465,
        host: 'email-smtp.us-east-1.amazonaws.com',
        secure: true,
        auth: {
          user: 'AKIAQVPUPYIEETFONLGE',
          pass: 'BEkKXkn+tJ4oZOuF2SW9QPw+sRlM4WqRpOkqynJE3PPk',
        },
        debug: true,
        tls: {
          rejectUnauthorized: false,
        },
      });
      let mailOptions = {
        from: '"Barad Geo Soft Solution" <admin@baradgeo.com>', // sender address
        to: 'baradgeo@gmail.com', // list of receivers
        subject: req.body.name + ' has contacted in baradego contact form', // Subject line
        html: output, // html body
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            text:
              'Thank you ' +
              req.body.name +
              '. Your contactform  has been submitted successfully. Someone will get back to you soon.',
          });
        }
      });
    }
  }
);

module.exports = router;
