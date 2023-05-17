import { Router } from "express";
const router = Router();
import { nanoid } from "nanoid";

const idLength = 8;

/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The 8 character auto-generated book id
 *         title:
 *           type: string
 *         author:
 *           type: string
 *           description: The book author or authors
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

/**
 * @openapi
 * tags:
 *   name: Books
 *   description: The book API
 */

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Returns the list of all the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

router.get("/", async (req, res) => {
    await req.app.db.read();
    const books = req.app.db.data.books;
    res.send(books);
});

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get a book from a given id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description:  The id of the requested book
 *     responses:
 *       200:
 *         description: Returns the book with the given id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book with the given id was not found
 */

router.get("/:id", async (req, res) => {
    await req.app.db.read();
    const book = req.app.db.data.books.filter(b => b.id == req.params.id)[0];
    if(!book) res.sendStatus(404);
    res.send(book);
});

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: The New Turing Omnibus
 *             author: Alexander K. Dewdney
 *       description: A JSON object with the book title and author/authors that the book should be created with
 *     responses:
 *       200:
 *         description: Returns the new book after the book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: There was a server error while trying to create the book
 */

router.post("/", async (req, res) => {
    try{
        delete req.body.id;
        const book = {id: nanoid(idLength), ...req.body};
        await req.app.db.read();
        req.app.db.data.books.push(book);
        res.app.db.write();
        res.send(book);
    }catch(error){
        res.status(500).send(error);
    }
});

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book from a given id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the book that should be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *           example:
 *             title: The New Turing Omnibus
 *             author: Alexander K. Dewdney
 *       description: A JSON object with the book title and or author/authors that the book should be updated with
 *     responses:
 *       200:
 *         description: Returns the book with the given id after the book was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book with the given id was not found
 *       500:
 *         description: There was a server error while trying to update the book
 */

router.put("/:id", async (req, res) => {
    try{
        await req.app.db.read();
        const book = req.app.db.data.books.filter(b => b.id == req.params.id)[0];
        if(!book) return res.sendStatus(404);
        delete req.body.id;
        book = {...book, ...req.body};
        console.log(req.app.db.data.books.filter(b => b.id == req.params.id)[0]);
        req.app.db.write();
        res.send(book);
    }catch(error){
        res.status(500).send(error);
    }
});

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book from a given id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the book that should be deleted
 *     responses:
 *       200:
 *         description: The book was successfully deleted
 *       404:
 *         description: The book with the given id was not found
 */

router.delete("/:id", async (req, res) => {
    await req.app.db.read();
    const book = req.app.db.data.books.filter(b => b.id == req.params.id)[0];
    if(!book) return res.sendStatus(404);
    req.app.db.data.books = req.app.db.data.books.filter(b => b.id != req.params.id);
    req.app.db.write();
    res.sendStatus(200);
});

export default router;