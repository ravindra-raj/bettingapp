const express = require("express");
const app = express();
const multer = require("multer");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer'); 
const mysql = require("mysql2");
// const mysql = require('mysql2/promise');
const cors = require("cors");
const path = require("path");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// const Pool = mysql.createPool({
//     host: "103.145.50.161",
//     user: "development_Sisindra",
//     password: "Hospi@123",
//     database: "development_hospi-basic",
// });

const db = mysql.createPool({
  
  host:"localhost",
  user:"root",
  password:"7032734397Raj@",
  database: "bettingapp"
});

app.use(express.json());
app.use(cookieParser());
const jwtSecretKey = 'yatayatismdnvlsvnvlefmv';


app.use(bodyParser.urlencoded({ extended: true }));
 const dotenv = require("dotenv").config();

 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(
            null,
            `${file.originalname}`
        );
    },
});

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
 // Fetch user details by userId
app.get('/api/userdetails/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error fetching user details:', err);
          res.status(500).send('Error fetching user details');
      } else if (results.length === 1) {
          res.json(results[0]); // Send user details
      } else {
          res.status(404).send('User details not found');
      }
  });
});

// Fetch deposits for the user by userId
app.get('/api/deposit1/:userId', (req, res) => {
  const userId = req.params.userId;

  // Basic validation to check if the userId exists
  if (!userId) {
    return res.status(400).send("Bad Request: Missing user ID");
  }

  const sqlGet = "SELECT * FROM deposits WHERE user_id = ?";

  db.query(sqlGet, [userId], (error, result) => {
    if (error) {
      console.error('Error fetching deposit details:', error); // Log error for debugging
      res.status(500).send("Server Error"); // Send a server error response
    } else {
      if (result.length > 0) {
        res.json(result); // Send deposit details if found
      } else {
        res.status(404).send("No deposits found for this user"); // Send 404 if no records found
      }
    }
  });
});



const upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
});
//     const doc = new PDFDocument();
//     const outputStream = fs.createWriteStream(pdfFilePath);
//     doc.pipe(outputStream);
  
//     // Add patient details table to PDF
//     const table = {
//       headers: ['Field', 'Value'],
//       rows: [
//         ['Patient ID', formData.patient_id],
//         ['Name', formData.name],
//         ['Mobile Number', formData.contact],
//         ['Email', formData.email],
//         ['Address', formData.address],
//         ['Doctor', formData.doctor_name],
//         ['Booking Date', formData.booking_date],
//         ['Booking Time', formData.slot_time],
//         ['Weight', formData.weight],
//         ['Height', formData.height],
//         ['Temperature', formData.temperature],
//         ['Blood Pressure', formData.blood_pressure],
//         ['Consultation Fee', formData.consultation_fee],
//         ['Payment Mode', formData.paymentMode],
//         ['Payment Status', formData.status],
//       ]
//     };
  
//     const tableTop = 100; // Set the top position of the table
//     const colWidth = 200; // Set the width of each column
//     const rowHeight = 20; // Set the height of each row
  
//     try {
//       // Draw table headers
//       doc.font('Helvetica-Bold').fontSize(12);
//       table.headers.forEach((header, i) => {
//         doc.text(header, 50 + i * colWidth, tableTop);
//       });
  
//       // Draw table rows
//       doc.font('Helvetica').fontSize(10);
//       table.rows.forEach((row, rowIndex) => {
//         row.forEach((cell, cellIndex) => {
//           const value = cell !== undefined ? cell.toString() : ''; // Check for undefined value
//           doc.text(value, 50 + cellIndex * colWidth, tableTop + (rowIndex + 1) * rowHeight);
//         });
//       });
  
//       // Finalize the PDF document
//       doc.end();
  
//       // Ensure that the directory exists before writing the PDF file
//       const dirPath = path.dirname(pdfFilePath);
//       if (!fs.existsSync(dirPath)) {
//         fs.mkdirSync(dirPath, { recursive: true });
//       }
      
//       console.log('PDF generated successfully:', pdfFilePath);
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
// };

// app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
//   // Endpoint to handle PDF generation and download
//   app.post('/api/download-pdf', (req, res) => {
//     const formData = req.body;
  
//     try {
//       // Generate a unique file name for the PDF
//     //   const pdfFilePath = path.join(__dirname, 'downloads', `${formData.name,Date.now()}.pdf`);
//       const pdfFilePath = path.join(__dirname, 'downloads', `${formData.name}_${formData.patient_id}_${Date.now()}.pdf`);

//       // Generate the PDF file based on the form data
//       generatePDF(formData, pdfFilePath);
  
//       // Send the generated PDF file as a response
//       res.download(pdfFilePath, (err) => {
//         if (err) {
//           console.error('Error downloading PDF:', err);
//           res.status(500).send('Internal Server Error');
//         } else {
//           console.log('PDF downloaded successfully');
//         }
//       });
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
 
 

// const pdfsDirectory = path.join(__dirname, 'downloads'); // Path to the directory containing PDFs
// app.use('/pdfs', express.static(pdfsDirectory));


// app.get('/pdfs', (req, res) => {
//     fs.readdir(pdfsDirectory, (err, files) => {
//         if (err) {
//             console.error('Error reading directory:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         const pdfsData = files
//             .filter(file => file.endsWith('.pdf'))
//             .map((file, index) => ({ id: index + 1, url: `/pdfs/${file}` }));

//         res.json(pdfsData);
//     });
// });

// // app.get('/pdf-details', (req, res) => {
// //     const { url } = req.query;
// //     const pdfFileName = url.split('/').pop(); // Extract PDF file name from URL

// //     // Assuming JSON file with the same name as PDF file but with .json extension
// //     const jsonFilePath = path.join(pdfsDirectory, `${pdfFileName}.json`);

// //     // Check if JSON file exists
// //     if (fs.existsSync(jsonFilePath)) {
// //         // Read JSON file and send its contents as response
// //         fs.readFile(jsonFilePath, 'utf8', (err, data) => {
// //             if (err) {
// //                 console.error('Error reading JSON file:', err);
// //                 return res.status(500).send('Internal Server Error');
// //             }
// //             const pdfDetails = JSON.parse(data);
// //             res.json(pdfDetails);
// //         });
// //     } else {
// //         res.status(404).send('PDF details not found');
// //     }
// // });

const pdfParse = require('pdf-parse');

const pdfsDirectory = path.join(__dirname, 'downloads'); // Path to the directory containing PDFs
app.use('/pdfs', express.static(pdfsDirectory));


const generatePDF = (formData, pdfFilePath, res) => {
    const doc = new PDFDocument();
    const outputStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(outputStream);
  
    // Add patient details table to PDF
    const table = {
      headers: ['Field', 'Value'],
      rows: [
        ['Patient ID', formData.patient_id],
        ['Name', formData.name],
        ['Mobile Number', formData.contact],
        ['Email', formData.email],
        ['Address', formData.address],
        ['Doctor', formData.doctor_name],
        ['Booking Date', formData.booking_date],
        ['Slot Time', formData.slot_time],
        ['Weight', formData.weight],
        ['Height', formData.height],
        ['Temperature', formData.temperature],
        ['Blood Pressure', formData.blood_pressure],
        ['Consultation Fee', formData.consultation_fee],
        ['Payment Mode', formData.paymentMode],
        ['Payment Status', formData.status],
        ['Date', new Date().toLocaleDateString()], // Add current date
        ['Time', new Date().toLocaleTimeString()] // Add current time
      ]
    };
  
    const tableTop = 100; // Set the top position of the table
    const colWidth = 200; // Set the width of each column
    const rowHeight = 20; // Set the height of each row
  
    // Draw table headers
    doc.font('Helvetica-Bold').fontSize(12);
    table.headers.forEach((header, i) => {
      doc.text(header, 50 + i * colWidth, tableTop);
    });
  
    // Draw table rows
    doc.font('Helvetica').fontSize(10);
    table.rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const value = cell !== undefined ? cell.toString() : ''; // Check for undefined value
        doc.text(value, 50 + cellIndex * colWidth, tableTop + (rowIndex + 1) * rowHeight);
      });
    });
  
    // Finalize the PDF document
    doc.end();
  
    outputStream.on('finish', () => {
      // Once the stream is finished writing, send the generated PDF file as a response
      res.download(pdfFilePath, (err) => {
        if (err) {
          console.error('Error downloading PDF:', err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('PDF downloaded successfully');
        }
      });
    });
  
    outputStream.on('error', (error) => {
      console.error('Error generating PDF:', error);
      res.status(500).send('Internal Server Error');
    });
  };
  app.post('/api/download-pdf', (req, res) => {
    const formData = req.body;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-'); // Replace slashes with dashes for file name
    
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/:/g, '-'); // Replace colons with dashes for file name
    
    try {
      const pdfFilePath = path.join(__dirname, 'downloads', `${formData.name}_${formData.patient_id}_${currentDate}_${currentTime}.pdf`);
      generatePDF(formData, pdfFilePath, res);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Internal Server Error');
    }
  });




  
  app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
        return;
      }
  
      res.json(results);
    });
  });

  app.get('/api/userdetails/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = 'SELECT * FROM users WHERE id = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        res.status(500).send('Error fetching user details');
        return;
      }
  
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).send('User details not found');
      }
    });
  });

  app.get('/api/adminuserdetails/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = 'SELECT * FROM users WHERE id = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        res.status(500).send('Error fetching user details');
        return;
      }
  
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).send('User details not found');
      }
    });
  });

  app.get('/api/superadminuserdetails/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = 'SELECT * FROM users WHERE id = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching super admin user details:', err);
        res.status(500).send('Error fetching super admin user details');
        return;
      }
  
      if (results.length === 1) {
        res.json(results[0]);
      } else {
        res.status(404).send('Super admin user details not found');
      }
    });
  });



















app.get('/pdfs', (req, res) => {
    fs.readdir(pdfsDirectory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Internal Server Error');
        }

        const pdfsData = files
            .filter(file => file.endsWith('.pdf'))
            .map((file, index) => ({ id: index + 1, url: `/pdfs/${file}` }));

        res.json(pdfsData);
    });
});

app.get('/pdf-details', async (req, res) => {
    const { url } = req.query;
    const pdfFileName = url.split('/').pop();
    const pdfFilePath = path.join(pdfsDirectory, pdfFileName);

    // Check if PDF file exists
    if (!fs.existsSync(pdfFilePath)) {
        return res.status(404).send('PDF file not found');
    }

    try {
        const pdfBuffer = fs.readFileSync(pdfFilePath);
        const data = await pdfParse(pdfBuffer);
        const lines = data.text.split('\n');
        const pdfDetails = {};
        const expectedFields = [
            'Patient ID',
            'Name',
            'Mobile Number',
            'Email',
            'Address',
            'Doctor',
            'Booking Date',
            'Slot Time',
            'Weight',
            'Height',
            'Temperature',
            'Blood Pressure',
            'Consultation Fee',
            'Payment Mode',
            'Payment Status',
            'Date',
            'Time'
        ];

        lines.forEach(line => {
            expectedFields.forEach(field => {
                if (line.includes(field)) {
                    const value = line.replace(field, '').trim();
                    // Remove unnecessary characters from field and value
                    const cleanedField = field.replace(/[{}[\]()'"`]/g, '').trim();
                    const cleanedValue = value.replace(/[{}[\]()'"`]/g, '').trim();
                    pdfDetails[cleanedField] = cleanedValue;
                }
            });
        });

        res.json(pdfDetails);
    } catch (error) {
        console.error('Error reading PDF file:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sisindrareddy143@gmail.com',
    pass: 'zmrgjkvomgybyaal'
  },
  debug: true
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: 'sisindrareddy1996@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();

  const insertQuery = `INSERT INTO otps (email, otp) VALUES (?, ?)`;
  db.query(insertQuery, [email, otp], (err, results) => {
    if (err) throw err;
    sendOTPEmail(email, otp);
    res.send('OTP sent successfully');
  });
});

app.post('/verify-otp', (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const selectQuery = `SELECT otp FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1`;
  db.query(selectQuery, [email], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      res.send({ message: 'No OTP found for this email' });
    } else {
      const storedOTP = results[0].otp;
      if (otp === storedOTP) {
        res.send({ message: 'OTP verified successfully' });
      } else {
        res.send({ message: 'Invalid OTP' });
      }
    }
  });
});

app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM Regusers';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
        return;
      }
  
      res.json(results);
    });
  });

  // app.post('/users', async (req, res) => {
  //   const { username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role } = req.body;
  
  //   try {
  //     await db.query(`INSERT INTO Regusers (username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
  //       [username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role]);
  
  //     res.status(201).json({ message: 'User registered successfully!' });
  //   } catch (error) {
  //     console.log("Error caught in backend: ", error); // Log to check if the error is being caught
  //     if (error.code === 'ER_DUP_ENTRY') {
  //       if (error.sqlMessage.includes('email')) {
  //         res.status(400).json({ message: 'Email already exists', field: 'email' });
  //       } else if (error.sqlMessage.includes('username')) {
  //         res.status(400).json({ message: 'Username already taken', field: 'username' });
  //       }
  //     } else {
  //       res.status(500).json({ message: 'An error occurred during registration' });
  //     }
  //   }
  // });

  app.post('/users', async (req, res) => {
    const { username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role } = req.body;

    const userQuery = 'INSERT INTO users (username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(userQuery, [username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role], async (userErr, userResults) => {
        if (userErr) {
            console.error('Error during signup:', userErr);
            res.status(500).send('Error during signup');
            return;
        }

        const user_id = userResults.insertId; // Get the ID of the newly created user

        // Create an initial deposit record
        const depositId = Date.now(); // Generate a unique deposit_id based on the current timestamp
        const initialDepositAmount = 0; // Initial deposit amount set to 0

        const depositQuery = `INSERT INTO deposits (deposit_id, user_id, deposit_amount) VALUES (?, ?, ?)`;
        db.query(depositQuery, [depositId, user_id, initialDepositAmount], (depositErr) => {
            if (depositErr) {
                console.error('Error creating initial deposit:', depositErr);
                return res.status(500).send('Server Error');
            }

            // Send welcome email
            const mailOptions = {
                from: 'sisindrareddy143@gmail.com',
                to: email,
                subject: 'Welcome to our platform!',
                text: `Dear ${username},\n\nThank you for signing up with us!\n\nYour account details:\nName: ${username}\nPassword: ${password}\nEmail: ${email}\nPhone Number: ${contact_number}\n\nBest regards,\nThe Betting Team`
            };

            try {
                 transporter.sendMail(mailOptions);
                res.status(201).send('Signup successful! Welcome email sent.');
            } catch (emailErr) {
                console.error('Error sending welcome email:', emailErr);
                res.status(500).send('Signup successful, but failed to send welcome email.');
            }
        });
    });
});

app.post('/api/deposits', (req, res) => {
    const { user_id, deposit_amount } = req.body;

    if (!user_id || !deposit_amount || isNaN(deposit_amount)) {
        return res.status(400).send('Invalid input');
    }

    // Check if deposit exists for the user
    const sqlCheck = 'SELECT id FROM deposits WHERE user_id = ?';
    db.query(sqlCheck, [user_id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking deposit:', checkErr);
            return res.status(500).send('Server Error');
        }

        if (checkResult.length > 0) {
            // Update existing deposit
            const sqlUpdate = 'UPDATE deposits SET deposit_amount = deposit_amount + ?, deposit_date = CURRENT_TIMESTAMP WHERE user_id = ?';
            db.query(sqlUpdate, [parseFloat(deposit_amount), user_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating deposit:', updateErr);
                    return res.status(500).send('Server Error');
                }
                res.status(200).send('Deposit updated successfully');
            });
        } else {
            // Insert new deposit if none exists (shouldn't happen after user signup)
            const depositId = Date.now(); // Generate a unique deposit_id based on the current timestamp
            const sqlInsert = `
                INSERT INTO deposits (deposit_id, user_id, deposit_amount)
                VALUES (?, ?, ?)
            `;
            db.query(sqlInsert, [depositId, user_id, parseFloat(deposit_amount)], (insertErr, result) => {
                if (insertErr) {
                    console.error('Error inserting deposit:', insertErr);
                    return res.status(500).send('Server Error');
                }
                res.status(201).json({
                    id: result.insertId,
                    deposit_id: depositId,
                    user_id,
                    deposit_amount: parseFloat(deposit_amount),
                    deposit_date: new Date() // Assuming deposit_date is set to current time by default
                });
            });
        }
    });
});

  // app.post('/users', async (req, res) => {
  //   const { username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role } = req.body;
  
  //   const userQuery = 'INSERT INTO users (username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
  //   db.query(userQuery, [username, email, contact_number, password, conform_password, first_name, last_name, Dob, country, role], async (userErr, userResults) => {
  //     if (userErr) {
  //       console.error('Error during signup:', userErr);
  //       res.status(500).send('Error during signup');
  //       return;
  //     }
  
  //     // Send welcome email
  //     const mailOptions = {
  //       from: 'sisindrareddy143@gmail.com',
  //       to: email,
  //       subject: 'Welcome to our platform!',
  //       text: `Dear ${username},\n\nThank you for signing up with us!\n\nYour account details:\nName: ${username}\n Password: ${password}\nEmail: ${email}\nPhone Number: ${contact_number}\n\nBest regards,\nThe Betting Team`
  //     };
  
  //     try {
  //       await transporter.sendMail(mailOptions);
  //       res.status(201).send('Signup successful! Welcome email sent.');
  //     } catch (emailErr) {
  //       console.error('Error sending welcome email:', emailErr);
  //       res.status(500).send('Signup successful, but failed to send welcome email.');
  //     }
  //   });
  // });
  


  app.post('/api/login', async (req, res) => {
    const { username, password, loginTime, sessionDuration } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
  
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login');
        return;
      }
      if (results.length > 0) {
        const userId = results[0].adminID;
        const sessionDurationMinute = parseFloat(sessionDuration);
        const insertLoginTimeQuery = 'INSERT INTO login_usage (userId, username, login_time, session_duration) VALUES (?, ?, ?, ?)';
        db.query(insertLoginTimeQuery, [userId, username, loginTime, sessionDurationMinute], (loginErr, loginResults) => {
          if (loginErr) {
            console.error('Error storing login time:', loginErr);
            res.status(500).send('Error storing login time');
          } else {
            // Modify the response to include managing_admin data
            const responseData = { ...results[0], managing_admin: results[0].managing_admin };
            res.json(responseData);
          }
        });
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
  });

  // app.get("/api/bet/details/:username", (req, res) => {
  //   const { username } = req.params;
  //   const sqlManagingAdmin = "SELECT contact_number FROM regusers WHERE username = ?";
    
  //   db.query(sqlManagingAdmin, [username], (error, managingAdminResult) => {
  //       if (error) {
  //           console.error("Error fetching user Details:", error);
  //           res.status(500).json({ error: "Internal server error" });
  //       } else {
  //           if (managingAdminResult.length === 0) {
  //               res.status(404).json({ error: "Contact Details not found" });
  //           } else {
  //               const managingAdmin = managingAdminResult[0].managing_admin;
  //               const sqlHospitalDetails = "SELECT * FROM regusers WHERE username = ?";
                
  //               db.query(sqlHospitalDetails, [managingAdmin], (error, hospitalDetailsResult) => {
  //                   if (error) {
  //                       console.error("Error fetching user table details:", error);
  //                       res.status(500).json({ error: "Internal server error" });
  //                   } else {
  //                       res.json(hospitalDetailsResult);
  //                   }
  //               });
  //           }
  //       }
  //   });
  // });

//   app.get("/api/bet/details/:username", (req, res) => {
//     const { username } = req.params;
//     const sqlManagingAdmin = "SELECT contact_number FROM regusers WHERE username = ?";
    
//     db.query(sqlManagingAdmin, [username], (error, managingAdminResult) => {
//         if (error) {
//             console.error("Error fetching managing admin:", error);
//             res.status(500).json({ error: "Internal server error" });
//         } else {
//             if (managingAdminResult.length === 0) {
//                 console.error("Managing admin not found for username:", username);
//                 res.status(404).json({ error: "Managing admin not found" });
//             } else {
//                 const managingAdmin = managingAdminResult[0].contact_number;
//                 const sqlHospitalDetails = "SELECT * FROM regusers WHERE contact_number = ?";
                
//                 db.query(sqlHospitalDetails, [managingAdmin], (error, hospitalDetailsResult) => {
//                     if (error) {
//                         console.error("Error fetching hospital details:", error);
//                         res.status(500).json({ error: "Internal server error" });
//                     } else {
//                         res.json(hospitalDetailsResult);
//                     }
//                 });
//             }
//         }
//     });
// });

app.get("/api/bet/details/:username", (req, res) => {
  const { username } = req.params;
  const sqlManagingAdmin = "SELECT contact_number FROM users WHERE username = ?";
  
  db.query(sqlManagingAdmin, [username], (error, managingAdminResult) => {
      if (error) {
          console.error("Error fetching managing admin:", error);
          res.status(500).json({ error: "Internal server error" });
      } else {
          if (managingAdminResult.length === 0) {
              console.error("Managing admin not found for username:", username);
              res.status(404).json({ error: "Managing admin not found" });
          } else {
              const managingAdmin = managingAdminResult[0].contact_number;
              const sqlHospitalDetails = "SELECT * FROM regusers WHERE contact_number = ?";
              
              db.query(sqlHospitalDetails, [managingAdmin], (error, hospitalDetailsResult) => {
                  if (error) {
                      console.error("Error fetching hospital details:", error);
                      res.status(500).json({ error: "Internal server error" });
                  } else {
                      res.json(hospitalDetailsResult);
                  }
              });
          }
      }
  });
});



  app.get('/api/adminuserdetails/:username', (req, res) => {
    const username = req.params.username;
  
    const query = 'SELECT * FROM users WHERE username = ?';
  
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        console.log('Query results:', results);
        res.status(500).json({ error: 'Error fetching user details' });
        return;
      }
  
      console.log('Query results:', results);
  
      if (results.length === 1) {
        res.json(results[0]);
        //res.json({ managingAdmin: results[0].managing_admin });
      } else {
        res.status(404).json({ error: 'User details not found' });
      }
    });
  });

  app.get('/api/userdetails/:username', (req, res) => {
    const userId = req.params.username;
  
    const query = 'SELECT * FROM users WHERE username = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        res.status(500).send('Error fetching user details');
        return;
      }
  
      // Ensure that the query returns exactly one row
      if (results.length === 1) {
        res.json({ managingAdmin: results[0].managing_admin });
      } else {
        res.status(404).send('User details not found');
      }
    });
  });
  
  





app.post("/api/register", async (req, res) => {
    try {
      const { Email } = req.query; // Extract email from query parameters
   
      // Create a transporter using SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'sisindrareddy143@gmail.com',
          pass: 'zmrgjkvomgybyaal'
        }
      });
   
      const mailOptions = {
       
        to: Email,
        subject: 'Betting Platform!',
        text: 'Welcome To Our Betting Platform Bet On Your Own Betting Prediction To Win Matches'
      };
   
      // Send the email
      await transporter.sendMail(mailOptions);
     
      console.log('Email sent successfully');
      res.status(200).json({ status: 200, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 500, error: 'Failed to send email' });
    }
  }); 


app.get('/api/transactions', (req, res) => {
    const sqlGet = "SELECT * FROM transactions";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Server Error");
        } else {
            res.json(result);
        }
    });
  });
  app.get('/api/userdetails', (req, res) => {
    const sqlGet = "SELECT * FROM users";
    db.query(sqlGet, (error, result) => {
      if (error) {
        console.error('Error fetching bets:', error);
        res.status(500).send('Server Error');
      } else {
        res.json(result);
      }
    });
  });
  // GET all bets
  app.get('/api/bets', (req, res) => {
    const sqlGet = "SELECT * FROM bets";
    db.query(sqlGet, (error, result) => {
      if (error) {
        console.error('Error fetching bets:', error);
        res.status(500).send('Server Error');
      } else {
        res.json(result);
      }
    });
  });
  // app.get('/api/bets/today', (req, res) => {
  //   db.getConnection((err, conn) => {
  //     if (err) {
  //       console.error('Error getting connection:', err);
  //       return res.status(500).send("Server Error");
  //     }
  
  //     // Get today's date in YYYY-MM-DD format
  //     const today = new Date().toISOString().split('T')[0];
  
  //     // Query to get today's bets grouped by bet details and sum the bet amounts
  //     const sqlGetTodayBets = `
  //       SELECT 
  //         bets.bet_details,
  //         COUNT(bets.bet_details) AS bet_count,
  //         SUM(bets.bet_amount) AS total_bet_amount,
  //         users.email,
  //         users.username,
  //         users.contact_number,
  //         deposits.deposit_id
  //       FROM bets
  //       JOIN users ON bets.user_id = users.id
  //       JOIN deposits ON bets.user_id = deposits.user_id
  //       WHERE DATE(bets.created_at) = ?
  //       GROUP BY bets.bet_details
  //     `;
  //     conn.query(sqlGetTodayBets, [today], (error, results) => {
  //       conn.release();
  
  //       if (error) {
  //         console.error('Error fetching today\'s bets:', error);
  //         return res.status(500).send("Server Error");
  //       }
  
  //       res.status(200).json(results);
  //     });
  //   });
  // });

  
  app.get('/api/bets/today/bet-details-distribution/:match', (req, res) => {
    const match = req.params.match; // e.g., 'sl-vs-bang-sl'
   
    db.getConnection((err, conn) => {
      if (err) {
        console.error('Error getting connection:', err);
        return res.status(500).send("Server Error");
      }
   
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
   
      // Query to count the number of bets per bet_detail for today and specific match
      const sqlBetDetailsDistribution = `
        SELECT
          bets.bet_details,
          COUNT(*) as bet_count
        FROM bets
        WHERE DATE(bets.created_at) = ?
          AND bets.match_id = ?
        GROUP BY bets.bet_details
      `;
     
      conn.query(sqlBetDetailsDistribution, [today, match], (error, results) => {
        conn.release();
   
        if (error) {
          console.error('Error fetching bet details distribution for today:', error);
          return res.status(500).send("Server Error");
        }
   
        res.status(200).json(results);
      });
    });
  });
   
  //
  // GET all withdrawals
  app.get('/api/withdrawals', (req, res) => {
    const sqlGet = "SELECT * FROM withdrawals";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Server Error");
        } else {
            res.json(result);
        }
    });
  });
  // app.get('/api/deposit1', (req, res) => {
  //   const sqlGet = "SELECT * FROM deposits";
  //   db.query(sqlGet, (error, result) => {
  //       if (error) {
  //           console.log(error);
  //           res.status(500).send("Server Error");
  //       } else {
  //           res.json(result);
  //       }
  //   });
  // });
   
   // Assuming userId is being sent as a query parameter or is accessible via the session.
// app.get('/api/deposit1', (req, res) => {
//   const { userId } = req.params; // Get userId from request parameters
//   const sqlGet = "SELECT deposit_amount FROM deposits WHERE user_id = ?"; // Fetch deposits for the specific user

//   db.query(sqlGet, [userId], (error, result) => {
//       if (error) {
//           console.log(error);
//           res.status(500).send("Server Error");
//       } else {
//           res.json(result); // Return the deposits of the specific user
//       }
//   });
// });

   
   
  // const generateTransactionId = () => {
  //   return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`; // Custom ID format
  // };
  app.post('/api/transactions', (req, res) => {
    const { user_id, transaction_type, amount, upi_id, uri_number, upi_number } = req.body;
  
    // Validate input
    if (!user_id || !transaction_type || !amount || isNaN(amount)) {
      return res.status(400).send('Invalid input');
    }
  
    const amountInt = parseFloat(amount);
    if (amountInt <= 0) {
      return res.status(400).send('Invalid amount');
    }
  
    // Check if user exists
    db.getConnection((err, conn) => {
      if (err) {
        console.error('Error getting connection:', err);
        return res.status(500).send('Server Error');
      }
  
      const sqlCheckUser = 'SELECT * FROM users WHERE id = ?';
      conn.query(sqlCheckUser, [user_id], (error, result) => {
        if (error) {
          conn.release();
          console.error('Error checking user:', error);
          return res.status(500).send('Server Error');
        }
  
        if (result.length === 0) {
          conn.release();
          return res.status(400).send('User not found');
        }
  
        // Generate custom transaction ID
        const transaction_id = generateTransactionId();
  
        // Step 1: Get the current deposit amount for the user
        const sqlGetDeposit = 'SELECT deposit_amount FROM deposits WHERE user_id = ?';
        conn.query(sqlGetDeposit, [user_id], (error, result) => {
          if (error) {
            conn.release();
            console.error('Error getting deposit amount:', error);
            return res.status(500).send('Server Error');
          }
  
          // Step 2: Calculate new deposit amount based on transaction type
          let currentDepositAmount = 0;
          if (result.length > 0) {
            currentDepositAmount = result[0].deposit_amount;
          }
  
          let newDepositAmount;
          let netAmount; // The amount that will be deducted after GST
  
          // Calculate 5% GST deduction
          const gstRate = 0.05; // 5% GST
          if (transaction_type === 'Deposit') {
            // Deduct 5% from the deposit amount
            netAmount = amountInt - (amountInt * gstRate); // Net amount after 5% GST deduction
            newDepositAmount = currentDepositAmount + netAmount; // Add the net amount after GST
          } else if (transaction_type === 'Bet') {
            // Deduct original amount (without GST)
            newDepositAmount = currentDepositAmount - amountInt; // Subtract only the original amount
            if (newDepositAmount < 0) {
              conn.release();
              return res.status(400).send('Insufficient funds');
            }
          } else {
            conn.release();
            return res.status(400).send('Invalid transaction type');
          }
  
          // Step 3: Update or insert the deposit record based on user_id
          let sqlUpsertDeposit;
          if (result.length > 0) {
            // Update existing deposit
            sqlUpsertDeposit = 'UPDATE deposits SET deposit_amount = ? WHERE user_id = ?';
          } else {
            // Insert new deposit
            sqlUpsertDeposit = 'INSERT INTO deposits (user_id, deposit_amount) VALUES (?, ?)';
          }
  
          conn.query(sqlUpsertDeposit, [newDepositAmount, user_id], (error, updateResult) => {
            if (error) {
              conn.release();
              console.error('Error updating or inserting deposit:', error);
              return res.status(500).send('Server Error');
            }
  
            // Step 4: Insert the transaction record
            const sqlPost = `
              INSERT INTO transactions (transaction_id, user_id, transaction_type, amount, payment_method, upi_id, upi_number, uri_number)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            conn.query(sqlPost, [transaction_id, user_id, transaction_type, amountInt, 'UPI', upi_id || null, upi_number || null, uri_number || null], (error, result) => {
              if (error) {
                conn.release();
                console.error('Error adding transaction:', error);
                return res.status(500).send('Server Error');
              }
  
              conn.release();
              res.status(201).json({
                transaction_id,
                user_id,
                transaction_type,
                amount: amountInt,
                net_amount: netAmount || amountInt, // Include net amount for deposits after GST
                upi_id,
                upi_number,
                uri_number
              });
            });
          });
        });
      });
    });
  });
  
  // app.post('/api/transactions', (req, res) => {
  //   const { user_id, transaction_type, amount, upi_id, uri_number, upi_number } = req.body;
   
  //   // Validate input
  //   if (!user_id || !transaction_type || !amount || isNaN(amount)) {
  //     return res.status(400).send('Invalid input');
  //   }
   
  //   const amountInt = parseFloat(amount);
  //   if (amountInt <= 0) {
  //     return res.status(400).send('Invalid amount');
  //   }
   
  //   // Check if user exists
  //   db.getConnection((err, conn) => {
  //     if (err) {
  //       console.error('Error getting connection:', err);
  //       return res.status(500).send('Server Error');
  //     }
   
  //     const sqlCheckUser = 'SELECT * FROM users WHERE id = ?';
  //     conn.query(sqlCheckUser, [user_id], (error, result) => {
  //       if (error) {
  //         conn.release();
  //         console.error('Error checking user:', error);
  //         return res.status(500).send('Server Error');
  //       }
   
  //       if (result.length === 0) {
  //         conn.release();
  //         return res.status(400).send('User not found');
  //       }
   
  //       // Generate custom transaction ID
  //       const transaction_id = generateTransactionId();
   
  //       // Step 1: Get the current deposit amount for the user
  //       const sqlGetDeposit = 'SELECT deposit_amount FROM deposits WHERE user_id = ?';
  //       conn.query(sqlGetDeposit, [user_id], (error, result) => {
  //         if (error) {
  //           conn.release();
  //           console.error('Error getting deposit amount:', error);
  //           return res.status(500).send('Server Error');
  //         }
   
  //         // Step 2: Calculate new deposit amount based on transaction type
  //         let currentDepositAmount = 0;
  //         if (result.length > 0) {
  //           currentDepositAmount = result[0].deposit_amount;
  //         }
   
  //         let newDepositAmount;
  //         if (transaction_type === 'Deposit') {
  //           newDepositAmount = currentDepositAmount + amountInt;
  //         } else if (transaction_type === 'Bet') {
  //           newDepositAmount = currentDepositAmount - amountInt;
  //           if (newDepositAmount < 0) {
  //             conn.release();
  //             return res.status(400).send('Insufficient funds');
  //           }
  //         } else {
  //           conn.release();
  //           return res.status(400).send('Invalid transaction type');
  //         }
   
  //         // Step 3: Update or insert the deposit record based on user_id
  //         let sqlUpsertDeposit;
  //         if (result.length > 0) {
  //           // Update existing deposit
  //           sqlUpsertDeposit = 'UPDATE deposits SET deposit_amount = ? WHERE user_id = ?';
  //         } else {
  //           // Insert new deposit
  //           sqlUpsertDeposit = 'INSERT INTO deposits (user_id, deposit_amount) VALUES (?, ?)';
  //         }
         
  //         conn.query(sqlUpsertDeposit, [newDepositAmount, user_id], (error, updateResult) => {
  //           if (error) {
  //             conn.release();
  //             console.error('Error updating or inserting deposit:', error);
  //             return res.status(500).send('Server Error');
  //           }
   
  //           // Step 4: Insert the transaction record
  //           const sqlPost = `
  //             INSERT INTO transactions (transaction_id, user_id, transaction_type, amount, payment_method, upi_id, upi_number, uri_number)
  //             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  //           `;
  //           conn.query(sqlPost, [transaction_id, user_id, transaction_type, amountInt, 'UPI', upi_id || null, upi_number || null, uri_number || null], (error, result) => {
  //             if (error) {
  //               conn.release();
  //               console.error('Error adding transaction:', error);
  //               return res.status(500).send('Server Error');
  //             }
   
  //             conn.release();
  //             res.status(201).json({
  //               transaction_id,
  //               user_id,
  //               transaction_type,
  //               amount: amountInt,
  //               upi_id,
  //               upi_number,
  //               uri_number
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // });
   
   
   
  app.post('/api/deposits', (req, res) => {
    const { user_id, deposit_amount } = req.body;
   
    if (!user_id || !deposit_amount || isNaN(deposit_amount)) {
      return res.status(400).send('Invalid input');
    }
   
    const depositId = Date.now(); // Generate a unique deposit_id based on the current timestamp
   
    // Check if deposit exists for the user
    const sqlCheck = 'SELECT id FROM deposits WHERE user_id = ?';
    db.query(sqlCheck, [user_id], (checkErr, checkResult) => {
      if (checkErr) {
        console.error('Error checking deposit:', checkErr);
        return res.status(500).send('Server Error');
      }
   
      if (checkResult.length > 0) {
        // Update existing deposit
        const sqlUpdate = 'UPDATE deposits SET deposit_amount = deposit_amount + ?, deposit_date = CURRENT_TIMESTAMP WHERE user_id = ?';
        db.query(sqlUpdate, [parseFloat(deposit_amount), user_id], (updateErr) => {
          if (updateErr) {
            console.error('Error updating deposit:', updateErr);
            return res.status(500).send('Server Error');
          }
          res.status(200).send('Deposit updated successfully');
        });
      } else {
        // Insert new deposit
        const sqlInsert = `
          INSERT INTO deposits (deposit_id, user_id, deposit_amount)
          VALUES (?, ?, ?)
        `;
        db.query(sqlInsert, [depositId, user_id, parseFloat(deposit_amount)], (insertErr, result) => {
          if (insertErr) {
            console.error('Error inserting deposit:', insertErr);
            return res.status(500).send('Server Error');
          }
          res.status(201).json({
            id: result.insertId,
            deposit_id: depositId,
            user_id,
            deposit_amount: parseFloat(deposit_amount),
            deposit_date: new Date() // Assuming deposit_date is set to current time by default
          });
        });
      }
    });
  });
   
  app.post('/api/withdrawals', (req, res) => {
    const {
      user_id,
      transaction_id,
      withdrawal_amount,
      status,
      account_number,
      ifsc_code,
      username,
      account_name,
      branch
    } = req.body;
   
    if (!user_id || !transaction_id || !withdrawal_amount || isNaN(withdrawal_amount) ||
        !account_number || !ifsc_code || !username || !account_name || !branch) {
        return res.status(400).send('Invalid input');
    }
   
    const withdrawalAmountInt = parseFloat(withdrawal_amount);
   
    if (withdrawalAmountInt <= 0) {
        return res.status(400).send('Invalid withdrawal amount');
    }
   
    db.getConnection((err, conn) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.status(500).send("Server Error");
        }
   
        conn.beginTransaction(err => {
            if (err) {
                console.error('Transaction error:', err);
                conn.release();
                return res.status(500).send("Server Error");
            }
   
            const sqlGetDeposit = "SELECT deposit_amount FROM deposits WHERE user_id = ?";
            conn.query(sqlGetDeposit, [user_id], (error, result) => {
                if (error) {
                    return conn.rollback(() => {
                        console.error('Error getting deposit:', error);
                        conn.release();
                        res.status(500).send("Server Error");
                    });
                }
   
                if (result.length === 0) {
                    return conn.rollback(() => {
                        conn.release();
                        return res.status(400).send('User not found');
                    });
                }
   
                const currentDeposit = result[0].deposit_amount;
                const newDepositAmount = currentDeposit - withdrawalAmountInt;
   
                if (newDepositAmount < 0) {
                    return conn.rollback(() => {
                        conn.release();
                        return res.status(400).send('Insufficient funds');
                    });
                }
   
                const sqlUpdateDeposit = `
                    UPDATE deposits SET deposit_amount = ? WHERE user_id = ?
                `;
                conn.query(sqlUpdateDeposit, [newDepositAmount, user_id], (error, updateResult) => {
                    if (error) {
                        return conn.rollback(() => {
                            console.error('Error updating deposit:', error);
                            conn.release();
                            res.status(500).send("Server Error");
                        });
                    }
   
                    if (updateResult.affectedRows === 0) {
                        return conn.rollback(() => {
                            conn.release();
                            return res.status(400).send('No deposit record found for the user');
                        });
                    }
   
                    const sqlPost = `
                        INSERT INTO withdrawals
                        (user_id, transaction_id, withdrawal_amount, status, account_number, ifsc_code, username, account_name, branch)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;
                    conn.query(sqlPost, [user_id, transaction_id, withdrawalAmountInt, status || 'Pending', account_number, ifsc_code, username, account_name, branch], (error, result) => {
                        if (error) {
                            return conn.rollback(() => {
                                console.error('Error adding withdrawal:', error);
                                conn.release();
                                res.status(500).send("Server Error");
                            });
                        }
   
                        conn.commit(err => {
                            if (err) {
                                return conn.rollback(() => {
                                    console.error('Commit error:', err);
                                    conn.release();
                                    res.status(500).send("Server Error");
                                });
                            }
   
                            conn.release();
                            res.status(201).json({
                                id: result.insertId,
                                user_id,
                                transaction_id,
                                withdrawal_amount: withdrawalAmountInt,
                                status,
                                account_number,
                                ifsc_code,
                                username,
                                account_name,
                                branch
                            });
                        });
                    });
                });
            });
        });
    });
  });


  app.post('/api/bets', (req, res) => {
    const {
      user_id,
      bet_amount,
      bet_details,
      transaction_id,
      status
    } = req.body;
   
    if (!user_id || !bet_amount || isNaN(bet_amount) || !bet_details) {
      return res.status(400).send('Invalid input');
    }
   
    const betAmountInt = parseFloat(bet_amount);
   
    if (betAmountInt <= 0) {
      return res.status(400).send('Invalid bet amount');
    }
    const generatedTransactionId = transaction_id || `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
   
    db.getConnection((err, conn) => {
      if (err) {
        console.error('Error getting connection:', err);
        return res.status(500).send("Server Error");
      }
   
      conn.beginTransaction(err => {
        if (err) {
          console.error('Transaction error:', err);
          conn.release();
          return res.status(500).send("Server Error");
        }
   
        const sqlGetDeposit = "SELECT deposit_amount FROM deposits WHERE user_id = ?";
        conn.query(sqlGetDeposit, [user_id], (error, result) => {
          if (error) {
            return conn.rollback(() => {
              console.error('Error getting deposit:', error);
              conn.release();
              res.status(500).send("Server Error");
            });
          }
   
          const currentDeposit = result.length > 0 ? result[0].deposit_amount : 0;
   
          if (currentDeposit < betAmountInt) {
            return conn.rollback(() => {
              conn.release();
              res.status(400).send('Insufficient funds for the bet');
            });
          }
   
          const newDepositAmount = currentDeposit - betAmountInt;
   
          const sqlUpdateDeposit = `
            UPDATE deposits
            SET deposit_amount = ?
            WHERE user_id = ?
          `;
          conn.query(sqlUpdateDeposit, [newDepositAmount, user_id], (error, updateResult) => {
            if (error) {
              return conn.rollback(() => {
                console.error('Error updating deposit:', error);
                conn.release();
                res.status(500).send("Server Error");
              });
            }
   
            const sqlPost = `
              INSERT INTO bets
              (user_id, bet_amount, bet_details, transaction_id, status)
              VALUES (?, ?, ?, ?, ?)
            `;
            conn.query(sqlPost, [user_id, betAmountInt, bet_details, generatedTransactionId, status || 'Pending'], (error, result) => {
              if (error) {
                return conn.rollback(() => {
                  console.error('Error adding bet:', error);
                  conn.release();
                  res.status(500).send("Server Error");
                });
              }
   
              conn.commit(err => {
                if (err) {
                  return conn.rollback(() => {
                    console.error('Commit error:', err);
                    conn.release();
                    res.status(500).send("Server Error");
                  });
                }
   
                conn.release();
                res.status(201).json({
                  id: result.insertId,
                  user_id,
                  bet_amount: betAmountInt,
                  bet_details,
                  transaction_id: generatedTransactionId,
                  status
                });
              });
            });
          });
        });
      });
    });
  });
  
  
  app.get('/api/matches', async (req, res) => {
    const sqlQuery = `
      SELECT leagues.id AS league_id, leagues.name AS league_name, leagues.flag AS league_flag,
             matches.id AS match_id, matches.teams, matches.match_time
      FROM leagues
      JOIN matches ON leagues.id = matches.league_id;
    `;
  
    try {
      const [rows] = await db.query(sqlQuery);
  
      const formattedData = {};
  
      rows.forEach((row) => {
        const { league_id, league_name, league_flag, match_id, teams, match_time } = row;
  
        if (!formattedData[league_id]) {
          formattedData[league_id] = {
            id: league_id,
            name: league_name,
            flag: league_flag, // Include the flag code
            matches: [],
          };
        }
  
        formattedData[league_id].matches.push({
          id: match_id,
          teams,
          match_time,
        });
      });
  
      res.json(Object.values(formattedData));
    } catch (error) {
      console.error('SQL Query Error:', error);
      res.status(500).json({ error: 'Error fetching match data from the database.' });
    }
  });


  app.post('/api/selected-matches', async (req, res) => {
    const { userId, matchId, bettingAmount } = req.body;
    try {
      await db.query(
        `INSERT INTO selected_matches (user_id, match_id, bet_amount) VALUES (?, ?, ?)`,
        [userId, matchId, bettingAmount]  
      );
      res.status(201).json({ message: 'Match selected successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error selecting match' });
    }
  });
  

  app.listen(5000, () => {
    console.log("Connected To Backend Database");
    console.log("Server is running on port 5000");
});



app.get('/api/users-by-month', (req, res) => {
  const sqlGetUsersByMonth = `
    SELECT 
      DATE_FORMAT(created_at, '%Y-%m') AS month,
      COUNT(*) AS user_count
    FROM users
    WHERE role = 'User'  -- Filter to only include users with the 'User' role
    GROUP BY month
    ORDER BY month DESC
  `;

  db.query(sqlGetUsersByMonth, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
    res.send(result);
  });
});


// app.get("/api/admin/last5users", (req, res) => {
//   const sqlGetLast5Users = "SELECT * FROM users ORDER BY created_at DESC LIMIT 5 ";
 
//   db.query(sqlGetLast5Users, (error, usersResult) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).send("Server Error");
//     }
//     res.send({ last5Users: usersResult });
//   });
// });

app.get("/api/admin/last5users", (req, res) => {
  const sqlGetLast5Users = "SELECT * FROM users WHERE role = 'user' ORDER BY created_at DESC LIMIT 5";

  db.query(sqlGetLast5Users, (error, usersResult) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }
    res.send({ last5Users: usersResult });
  });
});


app.get("/api/admin/total-user", (req, res) => {
  const sqlGetTotalUsers = `
    SELECT 
      role, 
      COUNT(*) AS totalUsers 
    FROM 
      users 
    GROUP BY 
      role
  `;

  db.query(sqlGetTotalUsers, (error, totalUsersResult) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Server Error");
    }

    const result = {
      Admin: 0,
      User: 0
    };

    totalUsersResult.forEach(row => {
      if (row.role === 'Admin') {
        result.Admin = row.totalUsers;
      } else if (row.role === 'User') {
        result.User = row.totalUsers;
      }
    });

    res.send(result);
  });
});




app.get('/api/active-users', (req, res) => {
  const sqlQuery = `
    SELECT
        u.id AS user_id,
        u.username,
        l.login_time,
        l.session_duration
    FROM login_history l
    JOIN users u ON l.userId = u.id
    WHERE l.logout_time IS NULL
      AND DATE(l.login_time) = CURDATE()
      AND u.role = 'User'
    GROUP BY u.id;  -- Ensure unique user_id in results
  `;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error fetching active users:', error);
      return res.status(500).send("Server Error");
    }

    const activeUserCount = results.length;

    res.json({
      active_user_count: activeUserCount,
      active_users: results
    });
  });
});





app.get('/api/transactions', (req, res) => {
  const sqlGet = "SELECT * FROM transactions";
  db.query(sqlGet, (error, result) => {
      if (error) {
          console.log(error);
          res.status(500).send("Server Error");
      } else {
          res.json(result);
      }
  });
});

// GET all bets
app.get('/api/bets', (req, res) => {
  const sqlGet = "SELECT * FROM bets";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error('Error fetching bets:', error);
      res.status(500).send('Server Error');
    } else {
      res.json(result);
    }
  });
});

// app.get('/api/bets/today-matchs', (req, res) => {
//   db.getConnection((err, conn) => {
//     if (err) {
//       console.error('Error getting connection:', err);
//       return res.status(500).send("Server Error");
//     }

//     // Get today's date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0];

//     // Query to get today's bets grouped by bet_details (match_name)
//     const sqlGetTodayBets = `
//       SELECT 
//         bets.bet_details AS match_name,  -- Using bet_details as match_name
//        bets.bet_match ,
//         JSON_ARRAYAGG(
//           JSON_OBJECT(
//             'name', bets.bet_details,
//             'bet_match',bets.bet_match,
//             'amount', bets.bet_amount
//           )
//         ) AS bets,  -- Aggregate bets details into JSON
//         SUM(bets.bet_amount) AS total_bet_amount
//       FROM bets
//       WHERE DATE(bets.created_at) = ?
//       GROUP BY bets.bet_details
//     `;
    
//     conn.query(sqlGetTodayBets, [today], (error, results) => {
//       conn.release();

//       if (error) {
//         console.error('Error fetching today\'s bets:', error);
//         return res.status(500).send("Server Error");
//       }

//       // Process results
//       const formattedResults = results.map(result => {
//         // Check if result.bets is already an object
//         let betsArray;
//         if (typeof result.bets === 'string') {
//           // If it's a string, parse it
//           betsArray = JSON.parse(result.bets);
//         } else {
//           // Otherwise, assume it's already an object
//           betsArray = result.bets;
//         }

//         return {
//           match_name: result.match_name,
//           data: {
//             labels: betsArray.map(bet => bet.name),
//             datasets: [
//               {
//                 label: 'Bet Amount',
//                 data: betsArray.map(bet => bet.amount),
//                 backgroundColor: [
//                   '#FF6384',
//                   '#36A2EB',
//                   '#FFCE56',
//                 ],
//               }
//             ]
//           },
//           bets: betsArray
//         };
//       });

//       res.status(200).json(formattedResults);
//     });
//   });
// });






// app.get('/api/bets/today-matchs', (req, res) => {
//   db.getConnection((err, conn) => {
//     if (err) {
//       console.error('Error getting connection:', err);
//       return res.status(500).send("Server Error");
//     }

//     // Get today's date in YYYY-MM-DD format
//     const today = new Date().toISOString().split('T')[0];

//     // Query to get today's bets grouped by bet_details (match_name)
//     const sqlGetTodayBets = `
//       SELECT 
//         bets.bet_details AS match_name,  -- Using bet_details as match_name
//         JSON_ARRAYAGG(
//           JSON_OBJECT(
//             'name', bets.bet_details,
//             'amount', bets.bet_amount
//           )
//         ) AS bets,  -- Aggregate bets details into JSON
//         SUM(bets.bet_amount) AS total_bet_amount
//       FROM bets
//       WHERE DATE(bets.created_at) = ?
//       GROUP BY bets.bet_details
//     `;
    
//     conn.query(sqlGetTodayBets, [today], (error, results) => {
//       conn.release();

//       if (error) {
//         console.error('Error fetching today\'s bets:', error);
//         return res.status(500).send("Server Error");
//       }

//       // Process results
//       const formattedResults = results.map(result => ({
//         name: result.match_name,
//         data: {
//           labels: result.bets.map(bet => bet.name),  // No need to parse JSON here
//           datasets: [
//             {
//               label: 'Bet Amount',
//               data: result.bets.map(bet => bet.amount),  // No need to parse JSON here
//               backgroundColor: [
//                 '#FF6384',
//                 '#36A2EB',
//                 '#FFCE56',
//               ],
//             }
//           ]
//         },
//         bets: result.bets  // Directly use the JSON object
//       }));

//       res.status(200).json(formattedResults);
//     });
//   });
// });

app.get("/api/bets/today-matchs", (req, res) => {
  db.getConnection((err, conn) => {
    if (err) {
      console.error("Error getting connection:", err);
      return res.status(500).send("Server Error");
    }
 
    const today = new Date().toISOString().split("T")[0];
 
    const sqlGetTodayBets = `
      SELECT
        bets.bet_match AS match_name,
        bets.bet_details AS team_name,
        SUM(bets.bet_amount) AS total_bet_amount
      FROM bets
      WHERE DATE(bets.created_at) = ?
      GROUP BY bets.bet_match, bets.bet_details;  -- Group by match and team
    `;
 
    conn.query(sqlGetTodayBets, [today], (error, results) => {
      conn.release();
 
      if (error) {
        console.error("Error fetching today's bets:", error);
        return res.status(500).send("Server Error");
      }
 
      // Group results by match
      const formattedResults = results.reduce((acc, row) => {
        const matchName = row.match_name;
        const teamName = row.team_name;
        const betAmount = row.total_bet_amount;
 
        if (!acc[matchName]) {
          acc[matchName] = { match_name: matchName, bets: [] };
        }
 
        acc[matchName].bets.push({ team: teamName, amount: betAmount });
 
        return acc;
      }, {});
 
      res.status(200).json(Object.values(formattedResults));
    });
  });
});
app.get('/api/bets/today', (req, res) => {
  db.getConnection((err, conn) => {
    if (err) {
      console.error('Error getting connection:', err);
      return res.status(500).send("Server Error");
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    console.log("Today's date: ", today);

    // Query to get today's bets grouped by bet details and sum the bet amounts
    const sqlGetTodayBets = `
     SELECT * FROM bets WHERE DATE(created_at) = CURDATE()

    `;
    
    console.log("SQL Query: ", sqlGetTodayBets);

    conn.query(sqlGetTodayBets, [today], (error, results) => {
      conn.release();

      if (error) {
        console.error('Error fetching today\'s bets:', error);
        return res.status(500).send("Server Error");
      }

      res.status(200).json(results);
    });
  });
});


// GET all withdrawals
app.get('/api/withdrawals', (req, res) => {
  const sqlGet = "SELECT * FROM withdrawals";
  db.query(sqlGet, (error, result) => {
      if (error) {
          console.log(error);
          res.status(500).send("Server Error");
      } else {
          res.json(result);
      }
  });
});
// app.get('/api/Deposit1', (req, res) => {
//   const sqlGet = "SELECT * FROM deposits";
//   db.query(sqlGet, (error, result) => {
//       if (error) {
//           console.log(error);
//           res.status(500).send("Server Error");
//       } else {
//           res.json(result);
//       }
//   });
// });

app.get('/api/bets/today/bet-details-distribution/:match', (req, res) => {
  const match = req.params.match; // e.g., 'sl-vs-bang-sl'

  db.getConnection((err, conn) => {
    if (err) {
      console.error('Error getting connection:', err);
      return res.status(500).send("Server Error");
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Query to count the number of bets per bet_detail for today and specific match
    const sqlBetDetailsDistribution = `
      SELECT 
        bets.bet_details, 
        COUNT(*) as bet_count
      FROM bets
      WHERE DATE(bets.created_at) = ? 
        AND bets.match_id = ? 
      GROUP BY bets.bet_details
    `;
    
    conn.query(sqlBetDetailsDistribution, [today, match], (error, results) => {
      conn.release();

      if (error) {
        console.error('Error fetching bet details distribution for today:', error);
        return res.status(500).send("Server Error");
      }

      res.status(200).json(results);
    });
  });
});


const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`; // Custom ID format
};

app.post('/api/transactions', (req, res) => {
  const { user_id, transaction_type, amount, upi_id, uri_number, upi_number } = req.body;

  // Validate input
  if (!user_id || !transaction_type || !amount || isNaN(amount)) {
    return res.status(400).send('Invalid input');
  }

  const amountInt = parseFloat(amount);
  if (amountInt <= 0) {
    return res.status(400).send('Invalid amount');
  }

  // Check if user exists
  db.getConnection((err, conn) => {
    if (err) {
      console.error('Error getting connection:', err);
      return res.status(500).send('Server Error');
    }

    const sqlCheckUser = 'SELECT * FROM users WHERE id = ?';
    conn.query(sqlCheckUser, [user_id], (error, result) => {
      if (error) {
        conn.release();
        console.error('Error checking user:', error);
        return res.status(500).send('Server Error');
      }

      if (result.length === 0) {
        conn.release();
        return res.status(400).send('User not found');
      }

      // Generate custom transaction ID
      const transaction_id = generateTransactionId();

      // Step 1: Get the current deposit amount for the user
      const sqlGetDeposit = 'SELECT deposit_amount FROM deposits WHERE user_id = ?';
      conn.query(sqlGetDeposit, [user_id], (error, result) => {
        if (error) {
          conn.release();
          console.error('Error getting deposit amount:', error);
          return res.status(500).send('Server Error');
        }

        // Step 2: Calculate new deposit amount based on transaction type
        let currentDepositAmount = 0;
        if (result.length > 0) {
          currentDepositAmount = result[0].deposit_amount;
        }

        let newDepositAmount;
        if (transaction_type === 'Deposit') {
          newDepositAmount = currentDepositAmount + amountInt;
        } else if (transaction_type === 'Bet') {
          newDepositAmount = currentDepositAmount - amountInt;
          if (newDepositAmount < 0) {
            conn.release();
            return res.status(400).send('Insufficient funds');
          }
        } else {
          conn.release();
          return res.status(400).send('Invalid transaction type');
        }

        // Step 3: Update or insert the deposit record based on user_id
        let sqlUpsertDeposit;
        if (result.length > 0) {
          // Update existing deposit
          sqlUpsertDeposit = 'UPDATE deposits SET deposit_amount = ? WHERE user_id = ?';
        } else {
          // Insert new deposit
          sqlUpsertDeposit = 'INSERT INTO deposits (user_id, deposit_amount) VALUES (?, ?)';
        }
        
        conn.query(sqlUpsertDeposit, [newDepositAmount, user_id], (error, updateResult) => {
          if (error) {
            conn.release();
            console.error('Error updating or inserting deposit:', error);
            return res.status(500).send('Server Error');
          }

          // Step 4: Insert the transaction record
          const sqlPost = `
            INSERT INTO transactions (transaction_id, user_id, transaction_type, amount, payment_method, upi_id, upi_number, uri_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          conn.query(sqlPost, [transaction_id, user_id, transaction_type, amountInt, 'UPI', upi_id || null, upi_number || null, uri_number || null], (error, result) => {
            if (error) {
              conn.release();
              console.error('Error adding transaction:', error);
              return res.status(500).send('Server Error');
            }

            conn.release();
            res.status(201).json({
              transaction_id,
              user_id,
              transaction_type,
              amount: amountInt,
              upi_id,
              upi_number,
              uri_number
            });
          });
        });
      });
    });
  });
});



app.post('/api/deposits', (req, res) => {
  const { user_id, deposit_amount } = req.body;

  if (!user_id || !deposit_amount || isNaN(deposit_amount)) {
    return res.status(400).send('Invalid input');
  }

  const depositId = Date.now(); // Generate a unique deposit_id based on the current timestamp

  // Check if deposit exists for the user
  const sqlCheck = 'SELECT id FROM deposits WHERE user_id = ?';
  db.query(sqlCheck, [user_id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking deposit:', checkErr);
      return res.status(500).send('Server Error');
    }

    if (checkResult.length > 0) {
      // Update existing deposit
      const sqlUpdate = 'UPDATE deposits SET deposit_amount = deposit_amount + ?, deposit_date = CURRENT_TIMESTAMP WHERE user_id = ?';
      db.query(sqlUpdate, [parseFloat(deposit_amount), user_id], (updateErr) => {
        if (updateErr) {
          console.error('Error updating deposit:', updateErr);
          return res.status(500).send('Server Error');
        }
        res.status(200).send('Deposit updated successfully');
      });
    } else {
      // Insert new deposit
      const sqlInsert = `
        INSERT INTO deposits (deposit_id, user_id, deposit_amount)
        VALUES (?, ?, ?)
      `;
      db.query(sqlInsert, [depositId, user_id, parseFloat(deposit_amount)], (insertErr, result) => {
        if (insertErr) {
          console.error('Error inserting deposit:', insertErr);
          return res.status(500).send('Server Error');
        }
        res.status(201).json({
          id: result.insertId,
          deposit_id: depositId,
          user_id,
          deposit_amount: parseFloat(deposit_amount),
          deposit_date: new Date() // Assuming deposit_date is set to current time by default
        });
      });
    }
  });
});

app.post('/api/withdrawals', (req, res) => {
  const {
    user_id, 
    transaction_id, 
    withdrawal_amount, 
    status, 
    account_number, 
    ifsc_code, 
    username, 
    account_name, 
    branch
  } = req.body;

  if (!user_id || !transaction_id || !withdrawal_amount || isNaN(withdrawal_amount) ||
      !account_number || !ifsc_code || !username || !account_name || !branch) {
      return res.status(400).send('Invalid input');
  }

  const withdrawalAmountInt = parseFloat(withdrawal_amount);

  if (withdrawalAmountInt <= 0) {
      return res.status(400).send('Invalid withdrawal amount');
  }

  db.getConnection((err, conn) => {
      if (err) {
          console.error('Error getting connection:', err);
          return res.status(500).send("Server Error");
      }

      conn.beginTransaction(err => {
          if (err) {
              console.error('Transaction error:', err);
              conn.release();
              return res.status(500).send("Server Error");
          }

          // Step 1: Get the current deposit amount for the user
          const sqlGetDeposit = "SELECT deposit_amount FROM deposits WHERE user_id = ?";
          conn.query(sqlGetDeposit, [user_id], (error, result) => {
              if (error) {
                  return conn.rollback(() => {
                      console.error('Error getting deposit:', error);
                      conn.release();
                      res.status(500).send("Server Error");
                  });
              }

              if (result.length === 0) {
                  return conn.rollback(() => {
                      conn.release();
                      return res.status(400).send('User not found');
                  });
              }

              const currentDeposit = result[0].deposit_amount;
              const newDepositAmount = currentDeposit - withdrawalAmountInt;

              if (newDepositAmount < 0) {
                  return conn.rollback(() => {
                      conn.release();
                      return res.status(400).send('Insufficient funds');
                  });
              }

              // Step 2: Update the deposit record by subtracting the withdrawal amount
              const sqlUpdateDeposit = `
                  UPDATE deposits SET deposit_amount = ? WHERE user_id = ?
              `;
              conn.query(sqlUpdateDeposit, [newDepositAmount, user_id], (error, updateResult) => {
                  if (error) {
                      return conn.rollback(() => {
                          console.error('Error updating deposit:', error);
                          conn.release();
                          res.status(500).send("Server Error");
                      });
                  }

                  if (updateResult.affectedRows === 0) {
                      return conn.rollback(() => {
                          conn.release();
                          return res.status(400).send('No deposit record found for the user');
                      });
                  }

                  // Step 3: Insert the withdrawal record
                  const sqlPost = `
                      INSERT INTO withdrawals 
                      (user_id, transaction_id, withdrawal_amount, status, account_number, ifsc_code, username, account_name, branch)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;
                  conn.query(sqlPost, [user_id, transaction_id, withdrawalAmountInt, status || 'Pending', account_number, ifsc_code, username, account_name, branch], (error, result) => {
                      if (error) {
                          return conn.rollback(() => {
                              console.error('Error adding withdrawal:', error);
                              conn.release();
                              res.status(500).send("Server Error");
                          });
                      }

                      conn.commit(err => {
                          if (err) {
                              return conn.rollback(() => {
                                  console.error('Commit error:', err);
                                  conn.release();
                                  res.status(500).send("Server Error");
                              });
                          }

                          conn.release();
                          res.status(201).json({ 
                              id: result.insertId, 
                              user_id, 
                              transaction_id, 
                              withdrawal_amount: withdrawalAmountInt, 
                              status, 
                              account_number, 
                              ifsc_code, 
                              username, 
                              account_name, 
                              branch 
                          });
                      });
                  });
              });
          });
      });
  });
});
app.post('/api/bets', (req, res) => {
  const {
    user_id,
    bet_amount,
    bet_details,
    transaction_id,
    status
  } = req.body;

  if (!user_id || !bet_amount || isNaN(bet_amount) || !bet_details) {
    return res.status(400).send('Invalid input');
  }

  const betAmountInt = parseFloat(bet_amount);

  if (betAmountInt <= 0) {
    return res.status(400).send('Invalid bet amount');
  }
  const generatedTransactionId = transaction_id || `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  db.getConnection((err, conn) => {
    if (err) {
      console.error('Error getting connection:', err);
      return res.status(500).send("Server Error");
    }

    conn.beginTransaction(err => {
      if (err) {
        console.error('Transaction error:', err);
        conn.release();
        return res.status(500).send("Server Error");
      }

      // Step 1: Get the current deposit amount for the user
      const sqlGetDeposit = "SELECT deposit_amount FROM deposits WHERE user_id = ?";
      conn.query(sqlGetDeposit, [user_id], (error, result) => {
        if (error) {
          return conn.rollback(() => {
            console.error('Error getting deposit:', error);
            conn.release();
            res.status(500).send("Server Error");
          });
        }

        const currentDeposit = result.length > 0 ? result[0].deposit_amount : 0;

        // Step 2: Check if the user has sufficient funds
        if (currentDeposit < betAmountInt) {
          return conn.rollback(() => {
            conn.release();
            res.status(400).send('Insufficient funds for the bet');
          });
        }

        // Step 3: Subtract the bet amount from the current deposit
        const newDepositAmount = currentDeposit - betAmountInt;

        // Step 4: Update the deposit amount
        const sqlUpdateDeposit = `
          UPDATE deposits 
          SET deposit_amount = ? 
          WHERE user_id = ?
        `;
        conn.query(sqlUpdateDeposit, [newDepositAmount, user_id], (error, updateResult) => {
          if (error) {
            return conn.rollback(() => {
              console.error('Error updating deposit:', error);
              conn.release();
              res.status(500).send("Server Error");
            });
          }

          // Step 5: Insert the bet record
          const sqlPost = `
            INSERT INTO bets 
            (user_id, bet_amount, bet_details, transaction_id, status)
            VALUES (?, ?, ?, ?, ?)
          `;
          conn.query(sqlPost, [user_id, betAmountInt, bet_details, generatedTransactionId, status || 'Pending'], (error, result) => {
            if (error) {
              return conn.rollback(() => {
                console.error('Error adding bet:', error);
                conn.release();
                res.status(500).send("Server Error");
              });
            }

            // Step 6: Commit the transaction
            conn.commit(err => {
              if (err) {
                return conn.rollback(() => {
                  console.error('Commit error:', err);
                  conn.release();
                  res.status(500).send("Server Error");
                });
              }

              conn.release();
              res.status(201).json({ 
                id: result.insertId, 
                user_id, 
                bet_amount: betAmountInt, 
                bet_details, 
                transaction_id: generatedTransactionId, 
                status 
              });
            });
          });
        });
      });
    });
  });
});


app.get('/api/user/:userId/totalcreditscore', (req, res) => {
  const userId = req.params.userId;

  const combinedQuery = `
      SELECT t.transaction_id, t.amount AS transaction_amount, t.transaction_type, 
             w.withdrawal_amount, w.status AS withdrawal_status
      FROM transactions t
      LEFT JOIN withdrawals w ON t.user_id = w.user_id
      WHERE t.user_id = ?
  `;

  db.query(combinedQuery, [userId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error fetching combined data.' });
      }

      // Separate transactions and withdrawals
      const transactions = results.map(row => ({
          transaction_id: row.transaction_id,
          transaction_type: row.transaction_type,
          transaction_amount: parseFloat(row.transaction_amount),
          payment_method: row.payment_method,
          transaction_date: row.transaction_date
      }));

      const withdrawals = results
          .filter(row => row.withdrawal_amount != null)
          .map(row => ({
              withdrawal_amount: parseFloat(row.withdrawal_amount),
              status: row.withdrawal_status,
              account_number: row.account_number,
              created_at: row.created_at
          }));

      // Calculate total deposits and withdrawals
      let totalDeposits = 0;
      let totalWithdrawals = 0;

      // Process deposits
      transactions.forEach(transaction => {
          if (transaction.transaction_type === 'Deposit') {
              totalDeposits += transaction.transaction_amount;
          }
      });

      // Process withdrawals
      withdrawals.forEach(withdrawal => {
          totalWithdrawals += withdrawal.withdrawal_amount;
      });

      // Calculate credit score
      const creditScore = -totalDeposits + totalWithdrawals;

      // Return response with detailed profit/loss and credit score
      res.json({
          userId,
          creditScore,
          totalDeposits,
          totalWithdrawals,
          transactions,
          withdrawals
      });
  });
});


app.get('/api/user/:userId/creditscore-today', (req, res) => {
  const userId = req.params.userId;

  // Get the current date and define the start and end of the day
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // Midnight today
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0); // Midnight next day

  // Query to sum today's distinct deposits and withdrawals for the specific user
  const combinedQuery = `
    SELECT 
      -- Sum distinct deposits from the transactions table
      SUM(DISTINCT CASE 
          WHEN t.transaction_type = 'Deposit' THEN t.amount 
          ELSE 0 
      END) AS total_deposits_today,

      -- Sum distinct withdrawals from the withdrawals table
      SUM(DISTINCT CASE 
          WHEN w.withdrawal_amount IS NOT NULL THEN w.withdrawal_amount 
          ELSE 0 
      END) AS total_withdrawals_today
    FROM transactions t
    LEFT JOIN withdrawals w 
      ON t.user_id = w.user_id 
      AND w.created_at >= ? 
      AND w.created_at < ?
    WHERE t.user_id = ?
      AND t.transaction_date >= ? 
      AND t.transaction_date < ?;
  `;

  // Execute the query
  db.query(combinedQuery, [startOfDay, endOfDay, userId, startOfDay, endOfDay], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching today's credit score data." });
    }

    // Get the summed values for deposits and withdrawals
    const totalDepositsToday = results[0].total_deposits_today || 0;
    const totalWithdrawalsToday = results[0].total_withdrawals_today || 0;

    // Calculate credit score for today
    const creditScoreToday = totalDepositsToday - totalWithdrawalsToday;

    // Return the final data in response
    res.json({
      userId,
      creditScoreToday,
      totalDepositsToday,
      totalWithdrawalsToday
    });
  });
});





app.get('/api/user/:userId/creditscore-this-month', (req, res) => {
  const userId = req.params.userId;

  // Get the current date and define the start and end of the current month
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 1st day of the month
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); // Last day of the month till the end of the day

  // SQL query to get transactions for the given user and time range
  const transactionQuery = `
    SELECT 
      transaction_id, 
      amount AS transaction_amount, 
      transaction_type, 
      transaction_date
    FROM transactions
    WHERE user_id = ? 
      AND transaction_date BETWEEN ? AND ?
  `;

  // SQL query to get withdrawals for the given user and time range
  const withdrawalQuery = `
    SELECT 
      withdrawal_amount, 
      status AS withdrawal_status, 
      account_number, 
      created_at
    FROM withdrawals
    WHERE user_id = ? 
      AND created_at BETWEEN ? AND ?
  `;

  // Execute the first query to get transactions
  db.query(transactionQuery, [userId, startOfMonth, endOfMonth], (err, transactionResults) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching transactions.' });
    }

    // Execute the second query to get withdrawals
    db.query(withdrawalQuery, [userId, startOfMonth, endOfMonth], (err, withdrawalResults) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching withdrawals.' });
      }

      // Process transactions
      const transactions = transactionResults.map(row => ({
        transaction_id: row.transaction_id,
        transaction_type: row.transaction_type,
        transaction_amount: parseFloat(row.transaction_amount),
        transaction_date: row.transaction_date
      }));

      // Process withdrawals
      const withdrawals = withdrawalResults.map(row => ({
        withdrawal_amount: parseFloat(row.withdrawal_amount),
        status: row.withdrawal_status,
        account_number: row.account_number,
        created_at: row.created_at
      }));

      // Calculate total deposits and withdrawals for this month
      let totalDepositsThisMonth = 0;
      let totalWithdrawalsThisMonth = 0;

      // Process deposits
      transactions.forEach(transaction => {
        if (transaction.transaction_type === 'Deposit') {
          totalDepositsThisMonth += transaction.transaction_amount;
        }
      });

      // Process withdrawals
      withdrawals.forEach(withdrawal => {
        totalWithdrawalsThisMonth += withdrawal.withdrawal_amount;
      });

      // Calculate credit score based on deposits and withdrawals for this month
      const creditScoreThisMonth =  totalWithdrawalsThisMonth-totalDepositsThisMonth ;

      // Return response with this month's transactions, withdrawals, and credit score
      res.json({
        userId,
        creditScoreThisMonth,
        totalDepositsThisMonth,
        totalWithdrawalsThisMonth,
        transactions,
        withdrawals
      });
    });
  });
});



app.get('/api/user/:userId/creditscore-this-year', (req, res) => {
  const userId = req.params.userId;

  // Get the current date and define the start and end of the current year
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1); // 1st January of the current year
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59); // 31st December till the end of the day

  // SQL query to get transactions for the given user and time range (whole year)
  const transactionQuery = `
    SELECT 
      transaction_id, 
      amount AS transaction_amount, 
      transaction_type, 
      transaction_date
    FROM transactions
    WHERE user_id = ? 
      AND transaction_date BETWEEN ? AND ?
  `;

  // SQL query to get withdrawals for the given user and time range (whole year)
  const withdrawalQuery = `
    SELECT 
      withdrawal_amount, 
      status AS withdrawal_status, 
      account_number, 
      created_at
    FROM withdrawals
    WHERE user_id = ? 
      AND created_at BETWEEN ? AND ?
  `;

  // Execute the first query to get transactions for the year
  db.query(transactionQuery, [userId, startOfYear, endOfYear], (err, transactionResults) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching transactions for the year.' });
    }

    // Execute the second query to get withdrawals for the year
    db.query(withdrawalQuery, [userId, startOfYear, endOfYear], (err, withdrawalResults) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching withdrawals for the year.' });
      }

      // Process transactions
      const transactions = transactionResults.map(row => ({
        transaction_id: row.transaction_id,
        transaction_type: row.transaction_type,
        transaction_amount: parseFloat(row.transaction_amount),
        transaction_date: row.transaction_date
      }));

      // Process withdrawals
      const withdrawals = withdrawalResults.map(row => ({
        withdrawal_amount: parseFloat(row.withdrawal_amount),
        status: row.withdrawal_status,
        account_number: row.account_number,
        created_at: row.created_at
      }));

      // Calculate total deposits and withdrawals for this year
      let totalDepositsThisYear = 0;
      let totalWithdrawalsThisYear = 0;

      // Process deposits
      transactions.forEach(transaction => {
        if (transaction.transaction_type === 'Deposit') {
          totalDepositsThisYear += transaction.transaction_amount;
        }
      });

      // Process withdrawals
      withdrawals.forEach(withdrawal => {
        totalWithdrawalsThisYear += withdrawal.withdrawal_amount;
      });

      // Calculate credit score based on deposits and withdrawals for the whole year
      const creditScoreThisYear = totalWithdrawalsThisYear - totalDepositsThisYear;

      // Return response with this year's transactions, withdrawals, and credit score
      res.json({
        userId,
        creditScoreThisYear,
        totalDepositsThisYear,
        totalWithdrawalsThisYear,
        transactions,
        withdrawals
      });
    });
  });
});




app.get('/api/transactions/:userId', (req, res) => {
  const userId = req.params.userId;
  const { startDate, endDate } = req.query;
  
  let sqlGet = "SELECT * FROM transactions WHERE user_id = ?";
  const params = [userId];
  
  // Add date filtering if both dates are provided
  if (startDate && endDate) {
    sqlGet += " AND transaction_date BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  db.query(sqlGet, params, (error, result) => {
      if (error) {
          console.log(error);
          res.status(500).send("Server Error");
      } else {
          res.json(result);
      }
  });
});
app.get('/api/withdrawals/:userId', (req, res) => {
  const userId = req.params.userId;
  const { startDate, endDate } = req.query;
  
  let sqlGet = "SELECT * FROM withdrawals WHERE user_id = ?";
  const params = [userId];
  
  if (startDate && endDate) {
    sqlGet += " AND created_at BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  db.query(sqlGet, params, (error, result) => {
      if (error) {
          console.log(error);
          res.status(500).send("Server Error");
      } else {
          res.json(result);
      }
  });
});
app.get('/api/bets/:userId', (req, res) => {
  const userId = req.params.userId;
  const { startDate, endDate } = req.query;
  
  let sqlGet = "SELECT * FROM bets WHERE user_id = ?";
  const params = [userId];
  
  if (startDate && endDate) {
    sqlGet += " AND created_at BETWEEN ? AND ?";
    params.push(startDate, endDate);
  }

  db.query(sqlGet, params, (error, result) => {
    if (error) {
      console.error('Error fetching bets:', error);
      res.status(500).send('Server Error');
    } else {
      res.json(result);
    }
  });
});


// app.get('/api/admin/negative-creditscores/today', (req, res) => {
//   // Get the current date and define the start and end of the day
//   const today = new Date();
//   const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
//   const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

//   const query = `
//       SELECT u.id AS user_id, 
//              u.username, 
//              (SUM(CASE WHEN t.transaction_type = 'Deposit' AND t.transaction_date >= ? AND t.transaction_date < ? THEN t.amount ELSE 0 END) - 
//               SUM(CASE WHEN w.withdrawal_amount IS NOT NULL AND w.created_at >= ? AND w.created_at < ? THEN w.withdrawal_amount ELSE 0 END)) AS credit_score,
//              SUM(CASE WHEN t.transaction_type = 'Deposit' AND t.transaction_date >= ? AND t.transaction_date < ? THEN t.amount ELSE 0 END) AS total_deposits_today,
//              SUM(CASE WHEN w.withdrawal_amount IS NOT NULL AND w.created_at >= ? AND w.created_at < ? THEN w.withdrawal_amount ELSE 0 END) AS total_withdrawals_today
//       FROM users u
//       LEFT JOIN transactions t ON u.id = t.user_id
//       LEFT JOIN withdrawals w ON u.id = w.user_id
//       GROUP BY u.id
//       HAVING credit_score < 0
//   `;

//   db.query(query, 
//       [startOfDay, endOfDay, startOfDay, endOfDay, startOfDay, endOfDay, startOfDay, endOfDay], 
//       (err, results) => {
//           if (err) {
//               return res.status(500).json({ error: 'Error fetching negative credit scores for today.' });
//           }

//           // Process and return the results
//           const negativeCreditScores = results.map(row => ({
//               userId: row.user_id,
//               username: row.username,
//               creditScore: row.credit_score,
//               totalDepositsToday: row.total_deposits_today,
//               totalWithdrawalsToday: row.total_withdrawals_today,
//               lossAmount: Math.abs(row.credit_score), // Show the absolute value of loss
//           }));

//           res.json({ negativeCreditScores });
//       }
//   );
// });






app.get('/api/admin/negative-creditscores/today', (req, res) => {
  // Get the current date
  const today = new Date();
  
  // Set start and end of the day dynamically (start at midnight, end before midnight of the next day)
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0); // Midnight of today
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0); // Midnight of tomorrow

  const query = `
      SELECT 
          u.id AS user_id, 
          u.username, 
          -- Calculate credit score as total deposits - total withdrawals
          (IFNULL(today_deposits.total_deposits, 0) - IFNULL(today_withdrawals.total_withdrawals, 0)) AS credit_score,
          
          -- Total deposits for today
          IFNULL(today_deposits.total_deposits, 0) AS total_deposits_today,
          
          -- Total withdrawals for today
          IFNULL(today_withdrawals.total_withdrawals, 0) AS total_withdrawals_today
      FROM 
          users u
      LEFT JOIN 
          (
              SELECT 
                  user_id, 
                  SUM(amount) AS total_deposits
              FROM 
                  transactions
              WHERE 
                  transaction_type = 'Deposit' 
                  AND transaction_date >= ? 
                  AND transaction_date < ?
              GROUP BY 
                  user_id
          ) AS today_deposits ON u.id = today_deposits.user_id
      LEFT JOIN 
          (
              SELECT 
                  user_id, 
                  SUM(withdrawal_amount) AS total_withdrawals
              FROM 
                  withdrawals
              WHERE 
                  created_at >= ? 
                  AND created_at < ?
              GROUP BY 
                  user_id
          ) AS today_withdrawals ON u.id = today_withdrawals.user_id
      HAVING 
          credit_score < 0;
  `;

  // Execute the query with parameterized inputs for date ranges
  db.query(query, [startOfDay, endOfDay, startOfDay, endOfDay], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Error fetching negative credit scores for today.' });
      }

      // Process and return the results
      const negativeCreditScores = results.map(row => ({
          userId: row.user_id,
          username: row.username,
          creditScore: row.credit_score,
          totalDepositsToday: row.total_deposits_today,
          totalWithdrawalsToday: row.total_withdrawals_today,
      }));

      res.json({ negativeCreditScores });
  });
});


app.get("/api/get", (req, res)=>{
 
const sqlGet= "SELECT * FROM users"
db.query(sqlGet, (error,result)=>{
  res.send(result);
});
});



