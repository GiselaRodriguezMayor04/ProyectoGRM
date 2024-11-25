const express = require('express');
const cors = require('cors');
const { getData, insertData, deleteData } = require('./services/items');
const login = require('./services/login');

const port = 3030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.json({ message: 'Adiós Mundo!' }));

app.get('/login', async (req, res, next) => {
    const { user, password } = req.query;
    try {
        const result = await login.getUserData(user, password);
        res.json(result);
    } catch (err) {
        console.error('Error while getting data:', err.message);
        next(err);
    }
});

app.get('/addItem', async (req, res, next) => {
    try {
        const result = await insertData(req);
        res.json(result);
    } catch (err) {
        console.error('Error while inserting items:', err.message);
        next(err);
    }
});

app.get('/getItems', async (req, res, next) => {
    try {
        const result = await getData(req);
        res.json(result);
    } catch (err) {
        console.error('Error while getting items:', err.message);
        next(err);
    }
});

app.get('/deleteItem', async (req, res, next) => {
    try {
        const result = await deleteData(req);
        res.json(result);
    } catch (err) {
        console.error('Error while deleting items:', err.message);
        next(err);
    }
});

app.listen(port, () => console.log(`API escuchando en el puerto ${port}`));
