const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.User;

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email dan password wajib diisi' });
        }

        const existingUser = await User.findOne({ 
            where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            email: email,
            password: hashedPassword
        });

        return res.status(201).json({ message: 'Registrasi user berhasil', data: { id: user.id, email: user.email } });  

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email dan password wajib diisi' 

            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Email atau password salah' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email 

            },
             process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login Berhasil', token });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register,
    login
};   
