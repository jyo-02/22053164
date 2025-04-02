import { fetchPosts } from '../services/apiFetcher.js';
import { processTopPosts, processLatestPosts } from '../utils/dataProcessor.js';

export const getPosts = async (req, res) => {
    try {
        const { type } = req.query;
        const posts = await fetchPosts();

        if (type === 'popular') {
            const topPosts = processTopPosts(posts);
            res.json(topPosts);
        } else if (type === 'latest') {
            const latestPosts = processLatestPosts(posts);
            res.json(latestPosts);
        } else {
            res.status(400).json({ error: 'Invalid query parameter.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
};
