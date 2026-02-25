const express = require('express');
const {
    createSnippet,
    getSnippets,
    updateSnippet,
    deleteSnippet
} = require('../controllers/snippet.controller');
const { protect } = require('../middleware/auth');
const { snippetValidator } = require('../validators/snippet.validator');
const { validateFields } = require('../validators/validateFields');

const router = express.Router();

// Todas las rutas están protegidas por JWT
router.use(protect);

router.route('/')
    .get(getSnippets)
    .post(snippetValidator, validateFields, createSnippet);

router.route('/:id')
    .put(snippetValidator, validateFields, updateSnippet)
    .delete(deleteSnippet);

module.exports = router;
