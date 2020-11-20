function  applyHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
};

module.export = applyHeader;