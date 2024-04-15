const mongoose = require('mongoose')

const productShema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	}
})

const ProductModel = mongoose.model('products', productShema)

module.exports = ProductModel
