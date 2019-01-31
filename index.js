function explainMongooseQuery(model, query, cb = ()=>{}){
    try{
        model.collection.find(query).explain(function(err,result){
            console.log(result)
            let c = result;
            console.log(JSON.stringify(c.queryPlanner, null, 4))
            console.log(c.queryPlanner.parsedQuery.$and);
            cb(err, c)
        });
    }
    catch(err){
        cb(err)
    }
}

function explainMongooseAggregation(model, query, cb = ()=>{}){
    try {
        model.collection.aggregate(query, { explain: true, allowDiskUse: true }, function(err, result) {
            let c = result[0].$cursor;
            console.log(JSON.stringify(c.queryPlanner, null, 4))
            console.log(c.queryPlanner.parsedQuery.$and)
            cb(err, c)
        })
    } catch (err) {
        cb(err)
    }
}

module.exports = {
    explainMongooseQuery,
    explainMongooseAggregation
};