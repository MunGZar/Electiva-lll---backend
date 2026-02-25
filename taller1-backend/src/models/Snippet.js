const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        minlength: [3, 'El título debe tener al menos 3 caracteres']
    },
    language: {
        type: String,
        required: [true, 'El lenguaje es obligatorio']
    },
    code: {
        type: String,
        required: [true, 'El código es obligatorio']
    },
    tags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Snippet', SnippetSchema);
