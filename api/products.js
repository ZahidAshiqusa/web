// This would be deployed as a Vercel serverless function
const { MongoClient } = require('mongodb');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    cachedDb = client.db('ecommerce');
    return cachedDb;
}

module.exports = async (req, res) => {
    const db = await connectToDatabase();
    
    switch (req.method) {
        case 'GET':
            const products = await db.collection('products').find({}).toArray();
            res.status(200).json(products);
            break;
            
        case 'POST':
            const product = req.body;
            
            // Upload image to Cloudinary if base64 is provided
            if (product.image && product.image.startsWith('data:image')) {
                const uploadResponse = await cloudinary.uploader.upload(product.image, {
                    folder: 'ecommerce-products'
                });
                product.image = uploadResponse.secure_url;
            }
            
            const result = await db.collection('products').insertOne(product);
            res.status(201).json({ ...product, _id: result.insertedId });
            break;
            
        case 'PUT':
            const { id, ...updateData } = req.body;
            await db.collection('products').updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
            );
            res.status(200).json({ message: 'Product updated' });
            break;
            
        case 'DELETE':
            const { productId } = req.body;
            await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
            res.status(200).json({ message: 'Product deleted' });
            break;
            
        default:
            res.status(405).json({ error: 'Method not allowed' });
    }
};