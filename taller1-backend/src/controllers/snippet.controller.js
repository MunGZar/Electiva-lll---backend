const Snippet = require('../models/Snippet');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Crear snippet
// @route   POST /api/v1/snippets
// @access  Private
const createSnippet = asyncHandler(async (req, res) => {
    // El ID del dueño debe extraerse directamente del Token JWT (req.user._id)
    req.body.user = req.user._id;

    const snippet = await Snippet.create(req.body);

    res.status(201).json({
        success: true,
        data: snippet
    });
});

// @desc    Listar snippets del usuario actual
// @route   GET /api/v1/snippets
// @access  Private
const getSnippets = asyncHandler(async (req, res) => {
    const snippets = await Snippet.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        count: snippets.length,
        data: snippets
    });
});

// @desc    Editar snippet (solo si pertenece al usuario)
// @route   PUT /api/v1/snippets/:id
// @access  Private
const updateSnippet = asyncHandler(async (req, res) => {
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
        return res.status(404).json({
            success: false,
            message: 'Snippet no encontrado'
        });
    }

    // El sistema debe garantizar seguridad total. 
    // Un usuario NUNCA debe poder ver, editar o borrar snippets creados por otros.
    if (snippet.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            success: false,
            message: 'No tiene permiso para editar este snippet'
        });
    }

    snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: snippet
    });
});

// @desc    Borrar snippet (solo si pertenece al usuario)
// @route   DELETE /api/v1/snippets/:id
// @access  Private
const deleteSnippet = asyncHandler(async (req, res) => {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
        return res.status(404).json({
            success: false,
            message: 'Snippet no encontrado'
        });
    }

    // Regla de Oro: Seguridad a nivel de datos
    if (snippet.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            success: false,
            message: 'No tiene permiso para borrar este snippet'
        });
    }

    await snippet.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});

module.exports = {
    createSnippet,
    getSnippets,
    updateSnippet,
    deleteSnippet
};
