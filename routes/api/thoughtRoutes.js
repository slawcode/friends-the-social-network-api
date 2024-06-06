const router = require('express').Router();

const {
    getAllThoughts, 
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
} = require('../controllers/thoughtController')

// api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:thoughtId)
    .get(getAllThoughts)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;