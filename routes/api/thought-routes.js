const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

//API thoughts
router.route('/').get(getThoughts).post(createThought);

//API thoughts/:thoughtID
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//API thoughts/:thoughtID/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//API thoughts/:thoughtID/reactions/:reactionID
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

