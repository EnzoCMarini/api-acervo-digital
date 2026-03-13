import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * Endpoint padrão
 */
router.get('/', (req: Request, res: Response) => {
    return res.
            status(200).
            json(`Aplicação online. Timestamp: ${new Date()}`);
});

export { router }