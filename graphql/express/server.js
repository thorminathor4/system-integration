import express from "express";
import {graphqlHTTP} from "express-graphql";
import {GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} from "graphql";

const app = express();

const authors = [
    {id: 1, name: "J. K. Rowling"},
    {id: 2, name: "J. R. R. Tolkien"},
    {id: 3, name: "Brent Weeks"}
];
let authorIdCounter = authors.length + 1;

const books = [
    {id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1},
    {id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1},
    {id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1},
    {id: 4, name: "The Fellowship of the Ring", authorId: 2},
    {id: 5, name: "The Two Towers", authorId: 2},
    {id: 6, name: "The Return of the King", authorId: 2},
    {id: 7, name: "The Way of Shadows", authorId: 3},
    {id: 8, name: "Beyond the Shadows", authorId: 3}
];
let bookIdCounter = books.length + 1;

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represents an author of one or more books",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => books.filter(book => author.id == book.authorId)
        }
    })
}); 

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "This represents a book written by an author",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => authors.find(author => book.authorId == author.id)
        }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        book: {
            type: BookType,
            description: "A Single Book",
            args: {id: {type: GraphQLNonNull(GraphQLInt)}},
            resolve: (parent, args) => books.find(book => book.id == args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: "List of All Books",
            resolve: () => books
        },
        author: {
            type: AuthorType,
            description: "A Single Author",
            args: {id: {type: GraphQLNonNull(GraphQLInt)}},
            resolve: (parent, args) => authors.find(author => author.id == args.id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of All Authors",
            resolve: () => authors
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description: "Add a Book",
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const {name, authorId} = args;
                const book = {id: bookIdCounter++, name, authorId};
                books.push(book);
                return book;
            }
        },
        editBook: {
            type: BookType,
            description: "Edit a Book",
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString},
                authorId: {type: GraphQLInt}
            },
            resolve: (parent, args) => {
                const {id, name, authorId} = args;
                const book = books.find(book => book.id == id);
                if(!book) return book;
                if(name) book.name = name;
                if(authorId) book.authorId = authorId;
                return book;
            }
        },
        editAuthor: {
            type: AuthorType,
            description: "Edit an Author",
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)},
                name: {type: GraphQLString}
            },
            resolve: (parent, args) => {
                const {id, name} = args;
                const author = authors.find(author => author.id == id);
                if(!author) return author;
                if(name) author.name = name;
                return author;
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));

app.listen(4000, () => console.log("Server Running"));