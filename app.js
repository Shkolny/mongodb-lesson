const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const ProductModel = require('./models/UserModel')

require('dotenv').config()

const port = process.env.PORT || 3002
const app = express()

app.use(
	cors({
		origin: ['http://127.0.0.1:5500'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)

// получение всех пользователей из БД
app.get('/getUsers', async (req, res) => {
	try {
		const products = await ProductModel.find({})
		res.send({ products })
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
		res.send({ error: 'Произошла ошибка при получении пользователей' })
	}
})

// добавление нового пользователя в БД
app.post('/addUsers', async (req, res) => {
	try {
		const { name, price } = req.body
		const products = { name, price }
		await ProductModel.create(products)
		res.send({ message: 'Пользователь успешно добавлен в БД' })
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового пользователя', err)
		res.send({
			error: `Произошла ошибка при добавлении нового пользователя ${err}`
		})
	}
})

// удаление пользователя из БД
app.delete('/deleteUser/:id', async (req, res) => {
	try {
		const { id } = req.params
		await ProductModel.findByIdAndDelete(id)
		res.send({ message: 'Пользователь успешно удален из БД' })
	} catch (err) {
		console.error('Произошла ошибка при удалении пользователя', err)
		res.send({
			error: `Произошла ошибка при удалении пользователя ${err}`
		})
	}
})

// редактирование пользователя в БД
app.patch('/editUser/:name', async (req, res) => {
	try {
		const { name } = req.params
		const { newName, newPrice } = req.body

		const product = await UserModel.findOne({ name })
		if (user) {
			user.name = newName
			user.price = newPrice
		}
		const info = await product.save()
		if (info) {
			res.send({ message: 'Пользователь успешно отредактирован в БД' })
		}
	} catch (err) {
		console.error('Произошла ошибка при редактировании пользователя', err)
		res.send({
			error: `Произошла ошибка при редактировании пользователя ${err}`
		})
	}
})

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
