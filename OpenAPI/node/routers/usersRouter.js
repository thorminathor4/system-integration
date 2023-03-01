import {Router} from "express";
const router = Router();

const users = [{id: 1, name: "John Doe"}];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns all users
 *         constent: application/json
 */
router.get("/api/users", (req, res) => {
    res.send({data: users});
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new users
 *     responses:
 *       200:
 *         description: Returns the user that was created
 *         constent: application/json
 */
router.post("/api/users", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({data: user});
});

export default router;