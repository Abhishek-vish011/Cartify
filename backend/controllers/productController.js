import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// Function for add Product
const addProduct = async(req, res)=>{
    try{
         const { name, description, price, category, SubCategory, size, bestseller} = req.body;

         const image1 = req.files.image1 && req.files.image1[0];
         const image2 = req.files.image2 && req.files.image2[0];
         const image3 = req.files.image3 && req.files.image3[0];
         const image4 = req.files.image4 && req.files.image4[0];

         const images = [image1, image2, image3, image4].filter((item)=> item !== undefined)

         let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
         )

         const productData = {
            name,
            description,
            category, 
            price: Number(price),
            SubCategory,
            bestSeller: bestseller === "true" ? true : false,
            size: JSON.parse(size),
            image: imagesUrl,
            date: Date.now()
         }

         console.log(productData);

         const product = new productModel(productData)

         await product.save()

         res.json({success: true, message: "Product Added"})
    }catch(err){
        console.log(err)
        return res.json({success: false, message:err.message});
    }
}

// Function for add ListProduct
const listProducts = async(req, res)=>{
  try{

      const products = await productModel.find({});
      res.json({success: true, products})

  }catch(err){
     console.log(err)
     return res.json({success: false, message:err.message});
  }
}

// Function for add removeProduct
const removeProducts = async(req, res)=>{
  try{
         const product_id = req.body.id

         await productModel.findByIdAndDelete(product_id)

         res.json({success: true, message: "Product Remove"})
  }catch(err){
     console.log(err)
     return res.json({success: false, message:err.message});
  }
}

// Function for add singleProduct
const singleProducts = async(req, res)=>{

    try{
        const{ productId }= req.body;
        console.log(productId);
        const product = await productModel.findById(productId)

        res.json({success: true, product});

    }catch(err){
         console.log(err)
     return res.json({success: false, message:err.message});
    }

}

export { listProducts, addProduct, removeProducts, singleProducts }