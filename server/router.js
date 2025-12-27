import express from 'express';
const router = express.Router();

router.post('/', () => {
  console.log('test');
});

export default router;
