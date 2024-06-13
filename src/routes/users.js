const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/productos/ordenados', userController.getProductosOrdenados);
router.get('/productos/filtrados', userController.getProductosFiltrados);

module.exports = router;