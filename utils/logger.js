const logger = (req, res, next)=>{
    console.log('Method', req.method);
    console.log('Path:', req.path);
    console.log('Body', req.body);
    console.log('Query:', req.query);
    console.log('cookies:', req.cookies)
    console.log('---');
    next()
}
module.exports = logger;