


  const express = require('express');
  const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(cors());

app.use((req,res,next) =>{

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Header', '*');

  next();

})
// Database connection
mongoose
  .connect('mongodb+srv://grahkevinseguy:Tree0nice@cluster0.8q26p8n.mongodb.net/hospitalData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  .then(() => {
    console.log('Connected to the database');

    // Define the hospital schema
    const hospitalSchema = new mongoose.Schema({
      hospitalName: String,
      insuranceIDs: [String],
      doctorIDs: [String]
    });

    // Create the Hospital model
    const Hospital = mongoose.model('Hospital', hospitalSchema);

    // API endpoint to fetch hospitals
    app.get('/hospitals', async (req, res) => {
      try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
      
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
