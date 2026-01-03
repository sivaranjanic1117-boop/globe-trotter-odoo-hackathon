const { getTrips, createTrip, deleteTrip, getTripById } = require('../controllers/tripController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateToken); // Protect all routes below

router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.delete('/:id', deleteTrip);

module.exports = router;
