import express from 'express';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/social-media-analytics-service', userRoutes);
app.use('/social-media-analytics-service', postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
