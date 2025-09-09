const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seedRoutes = require('./API/routes/search');
const authRoutes = require('./API/routes/auth');
const userRoutes = require('./API/routes/profile');
const wishlistRoutes = require('./API/routes/wishlist');
const shopRoutes = require('./API/routes/shops');
const reviewRoutes = require('./API/routes/reviews');
// ... weitere Route-Imports

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB verbunden'))
  .catch(err => console.error(err));

// Routen
app.use('/api/seeds', seedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/reviews', reviewRoutes);
// ... weitere app.use

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Interner Serverfehler' });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));