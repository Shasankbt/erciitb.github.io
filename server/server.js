import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

// Middleware setup
app.use(cors());
app.use(express.json()); // replaces body-parser in modern Express
app.use(express.urlencoded({ extended: true }));

// POST endpoint for subscriptions
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  console.log('New subscription:', email);
  saveNewsletterSubscription({'email': email, 'timestamp': new Date().toISOString() });
  return res.json({ success: true, message: 'Thank you for subscribing !' });
});

const newsletterSubscriptionFilePath = path.join(__dirname, 'data/events_newsletter.json'); 
if (!fs.existsSync(newsletterSubscriptionFilePath)) { fs.writeFileSync(newsletterSubscriptionFilePath, '[]'); }
const newsletterSubscriptions = JSON.parse(fs.readFileSync(newsletterSubscriptionFilePath, 'utf8'));

function saveNewsletterSubscription(object) {
    console.log(`Saving subscription for: ${object}`);
    newsletterSubscriptions.push(object);
    fs.writeFileSync(newsletterSubscriptionFilePath, JSON.stringify(newsletterSubscriptions, null, 2));
}

// Serve static files (for production)
app.use(express.static(path.join(__dirname, '../dist')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});