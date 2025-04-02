import { fetchUsers } from '../services/apiFetcher.js';
import { processTopUsers } from '../utils/dataProcessor.js';

export const getTopUsers = async (req, res) => {
    try {
        const users = await fetchUsers();
        const topUsers = processTopUsers(users);
        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch top users.' });
    }
};
