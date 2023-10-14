import express from 'express';
import connectDB from './config/db.js';
import routerUrl from './routes/url.js';
import routerIndex from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ extended: false }));
app.use('/api/url', routerUrl);
app.use('', routerIndex);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
