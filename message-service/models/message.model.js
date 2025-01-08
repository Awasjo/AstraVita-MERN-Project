const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    iv: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        expires: '14d'
    }
});

// Generate a secure key
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32); 

// Encrypt messages for storage and privacy
messageSchema.pre('save', function (next) {
    const iv = crypto.randomBytes(16); 
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(this.content, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    this.iv = iv.toString('hex'); 
    this.content = encrypted;
    next();
});

// Decrypt messages for retrieval
messageSchema.post('init', function (doc) {
    const iv = Buffer.from(doc.iv, 'hex'); 
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(doc.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    doc.content = decrypted;
});

module.exports = mongoose.model('Message', messageSchema);