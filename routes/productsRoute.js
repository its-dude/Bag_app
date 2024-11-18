const express=require('express');
const productmodel=require('../models/productmodel');
const multer=require('multer');
const route=express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

route.get('/',(req,res)=>{
    res.send(' products');
})

route.post('/create',upload.single('image'), async(req,res)=>{
    try {
        const { name, price, discount, bgcolor, textcolor, panelcolor } = req.body;

        // Validate if file was uploaded
        if (!req.file) {
            return res.status(400).send('Image file is required');
        }

        // Create a new product
        const product = await productmodel.create({
            image: req.file.buffer,  // Save the image buffer from Multer
            name,
            price,
            discount: discount || 0,  // Optional field, default is 0
            bgcolor,
            textcolor,
            panelcolor
        });


        req.flash( "success",'Product created successfully');
        res.redirect('/owners/admin')
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

route.get('/deleteAll', async (req, res) => {
    try {
        const result = await productmodel.deleteMany();
        req.flash("success", 'All products deleted successfully.');
        res.redirect('/owners/admin');
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).json({ message: 'Error deleting products.', error: error.message });
    }
});

module.exports=route;