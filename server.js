const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const { validationResult, check } = require('express-validator');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(bodyParser.json());

// Express validation rules based on the key-value validation provided
const validationRules = [
  check('FirstName').isString().matches(/^[A-Za-z]+$/).withMessage('First name must contain only letters'),
  check('LastName').isString().matches(/^[A-Za-z]+$/).withMessage('Last name must contain only letters'),
  check('Phonenumber').isString().matches(/^\+\d{12,14}$/).withMessage('Invalid phone number format must start with + and length should be between 12-14'),
  check('Emailaddress').isEmail().withMessage("Please Enter Valid email"),
];

// API endpoint to handle user input
app.post('/api/user', validationRules, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract data from request body
  const { FirstName, LastName, Phonenumber, Emailaddress } = req.body;

  try {
    // Save data to the database
    const newUser = await prisma.user.create({
      data: {
        FirstName,
        LastName,
        Phonenumber,
        Emailaddress,
      },
    });
    console.log(newUser)

    // Generate PDF document
    const pdfPath = await generatePDF(newUser);

    res.status(200).json({ message: 'User created successfully', pdfPath });
  } catch (error) {
    console.error('Error occurred while creating user:', error);
    res.status(500).json({ error: 'Internal server error or already registered' });
  }
});

// Function to generate PDF document
async function generatePDF(user) {
  const pdfPath = `./documents/${user.ID}_document.pdf`;

  // Create a new PDF document
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  // Add content to the PDF document
  doc.fontSize(12).text(`First Name: ${user.FirstName}`);
  doc.fontSize(12).text(`Last Name: ${user.LastName}`);
  doc.fontSize(12).text(`Phone Number: ${user.Phonenumber}`);
  doc.fontSize(12).text(`Email Address: ${user.Emailaddress}`);

  // Finalize the PDF document
  doc.end();

  return pdfPath;
}

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
