import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import { products } from './constants/index.js';

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: '*', // Allow only this origin
    methods: ['GET', 'POST'], // Allow only these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow only these headers
  };

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    console.log('Health check route accessed');
    res.status(200).json({ message: 'Server is healthy' });
});


app.get("/products", (req, res) => {
    const { query, queryBy='name', limit = 8 } = req.query;
    if (!queryBy in products[0]) {
        return res.status(400).json({ message: `Bad Request. Cannot query by ${queryBy}` })
    }
    if(!query)
    {
        return res.status(400).json({message:'Bad request'})
    }



    const filterdProducts = products.filter((product) =>{
        return product[queryBy].toLowerCase().includes(query.toLowerCase())
    }
    ).slice(0,limit);

    res.status(200).json({message:'Fetched Products',products:filterdProducts})

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
