const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komikList = await db.Komik.findAll();
        res.status(200).json(komikList);
    } catch (error) {
        console.error('Error fetching komik:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}