const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body; // photo_url dihapus dari input

            // Cek apakah email sudah digunakan
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return ResponseAPI.error(res, 'Email already in use', 400);
            }

            // Buat user baru tanpa photo_url
            const newUser = new User({
                name,
                email,
                password, // Password akan di-hash otomatis oleh middleware di model
                photo_url: '' // Default photo_url kosong
            });

            await newUser.save();

            // Buat token JWT
            const token = generateToken(newUser._id);

            ResponseAPI.success(res, {
                token,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    photo_url: newUser.photo_url // Akan tetap kosong saat pertama kali register
                }
            });
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const token = generateToken(user._id);

            ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    photo_url: user.photo_url // Akan kosong jika belum diupdate
                }
            });
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user._id).select('-password');
            ResponseAPI.success(res, user);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async updateProfile(req, res) {
        try {
            const { name, email, photo_url, password } = req.body;

            const user = await User.findById(req.user._id).select('-password');

            if (password) {
                user.password = password;
            }

            if (name) {
                user.name = name;
            }

            if (email) {
                user.email = email;
            }

            if (photo_url) {
                user.photo_url = photo_url; // User bisa menambahkan photo_url setelah login
            }

            await user.save();

            ResponseAPI.success(res, user);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = userController;
