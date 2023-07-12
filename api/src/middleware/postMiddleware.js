async function postMiddleware(req, res, next) {
    const { name, height, weight, image, temperament, life_span } = req.body
    if (!name || !height || !weight || !image || !life_span || !temperament) {
        return res.status(400).json({ error: "Faltan datos requeridos" })
    }
    next();
}
module.exports = postMiddleware