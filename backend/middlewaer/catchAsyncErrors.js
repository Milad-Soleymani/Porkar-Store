module.exports = (theFunk) => (req, res, next) => {
    Promise.resolve(theFunk(req, res, next)).catch(next)
};