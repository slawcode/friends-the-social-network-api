const router = require('express').Router();
const {
  getAllThoughts, 
  getSingleThought,
  createThought,
  deleteThought,
  updateThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getAllThoughts)
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/:thoughtID
router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// Router export
module.exports = router;