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

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error fetching komik:', error.message);
        res.status(500).json({ error: 'Failed to fetch komik by ID' });
    }
}