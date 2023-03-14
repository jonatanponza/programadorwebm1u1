var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET Novedades page. */
router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('admin/novedades', {
        layout: 'admin/layout',
        persona: req.session.nombre,
        novedades
    });
});

// controlador eliminar Novedad
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});

// controlador agregar Novedad
router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layout: 'admin/layout',
    });
});

// controlador agrega en BD
router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.precio != "" && req.body.fecha != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true, message: 'Completar todos los campos'
            });
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true, message: 'No se cargo la novedad'
        });
    }
});

// controlador modificar Novedad
router.get('/modificar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    });
});

// controlador modifica en la BD
router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            fecha: req.body.fecha,
            precio: req.body.precio,
            cuerpo: req.body.cuerpo
        }
        
        console.log(obj) //captura los datos
        await novedadesModel.modificarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    }
    catch (error) {
        console.log(error)
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'La entrada no se pudo modificar'
        });
    }
});

module.exports = router;