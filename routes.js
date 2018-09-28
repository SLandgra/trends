let router = require('express').Router();
const googleTrends = require('google-trends-api');

router.get('/',(req, res)=>{
  res.json({
    hello: 'hello!'
  })
})
router.get('/trends', (req, res) =>{
  const terms = req.query.terms;
  googleTrends.interestOverTime({keyword: terms.split(',')})
  .then((results)=>{
    res.json({
      results: results
    })
  })
  .catch((err)=>{
    res.json({error: err})
  })
})

module.exports = router;
