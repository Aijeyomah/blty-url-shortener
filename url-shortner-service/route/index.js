import { Router } from 'express';
import { redirectToLongUrl } from '../controllers';

const router = Router();

router.get(
  '/:shortUrl',
  redirectToLongUrl,
);

export default router;
