/** src/routes/bits.ts */
import express from 'express';
import controller from '../controllers/bits';

const router = express.Router();    

router.get('/bits/:bits/:currency', controller.convertion);

export = router;