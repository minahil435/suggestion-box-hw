var express = require('express');
var router = express.Router();
var suggestionController = require("./controller/suggestionController")

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/all-suggestions', suggestionController.getAllSuggestions)
router.get('/single-suggestion/:id', suggestionController.getSingleSuggestion)
router.get('/by-author-suggestion', suggestionController.getSuggestionsByAuthor)
router.post('/create-suggestion', suggestionController.createSuggestion)
router.put('/update-suggestion/:id', suggestionController.updateSuggestion)
router.delete('/delete-suggestion/:id', suggestionController.deleteSuggestion)

module.exports = router;
