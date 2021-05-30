
// - createSuggestion- does not need id or time from user
// - updateSuggestion- user can only update title and suggestion



const Suggestion = require("../model/Suggestion")


module.exports = {
    getAllSuggestions,
    getSingleSuggestion,
    createSuggestion,
    updateSuggestion,
    deleteSuggestion,
    getSuggestionsByAuthor
};

async function getAllSuggestions(req, res) {
    try {
        let allSuggestions = await Suggestion.find({})
        res.json({ message: "success", data: allSuggestions })
    }
    catch (e) {
        res.json({ message: "failure", error: e.message })
    }
}

async function getSingleSuggestion(req, res) {
    try {
        let suggestion = await Suggestion.find({ _id: req.params.id })
        res.json({ message: "success", data: suggestion })
    }
    catch (e) {
        res.json({ message: "failure", error: e.message })
    }
}

async function getSuggestionsByAuthor(req, res){
    console.log("Hello" + req.query.name)
    try{
        let allSuggestions = await Suggestion.find({author : req.query.name})
        res.json({ message: "success", data: allSuggestions })
        
    }
    catch(e){
        res.json({ message: "failure", error: e.message })
    }
}

function checkIsEmpty(target) {
    if (target.length === 0) {
      return true;
    } else {
      return false;
    }
  }

async function createSuggestion(req, res) {

    const { title, author, suggestion, likes, anonymous } = req.body

    let errorObj = {};
    if (checkIsEmpty(title)) {
      errorObj.title = "title cannot be empty";
    }
    if (checkIsEmpty(suggestion)) {
      errorObj.suggestion = "suggestion cannot be empty";
    }
    if (Object.keys(errorObj).length > 0) {
      res.status(500).json({ message: "failure", payload: errorObj });
    }
     
    try {
        const newSuggestion = new Suggestion({
            title,
            author,
            suggestion,
            likes,
            anonymous,
        })
        let _newSuggestion = await newSuggestion.save()
        res.json({ message: "success", data: _newSuggestion })
    }
    catch (e) {
        res.json({ message: "failure", error: e.message })
    }
}

async function updateSuggestion(req, res) {

    let errorObj = {};
    if (checkIsEmpty(req.body.title )) {
      errorObj.title = "title cannot be empty";
    }
    if (checkIsEmpty(req.body.suggestion)) {
      errorObj.suggestion = "suggestion cannot be empty";
    }
    if (Object.keys(errorObj).length > 0) {
      res.status(500).json({ message: "failure", payload: errorObj });
    }

    try {
        let updatedSuggestion = await Suggestion.findByIdAndUpdate({ _id: req.params.id }, {title: req.body.title , suggestion: req.body.suggestion}, { new: true })
        res.json({ message: "success", data: updatedSuggestion })
    }
    catch (e) {
        res.json({ message: "failure", error: e.message })
    }
}

async function deleteSuggestion(req, res) {
    try {
        let deletedSuggestion = await Suggestion.findByIdAndRemove({ _id: req.params.id })
        res.json({ message: "success", data: deletedSuggestion })
    }
    catch (e) {
        res.json({ message: "failure", error: e.message })
    }
}
