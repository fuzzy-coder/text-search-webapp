const RESPONSE_TEMPLATE = {
    success: false,
    error : null,
    data: null
}

function ok(res, data){
    let response = Object.assign({}, RESPONSE_TEMPLATE);
    response.success = true
    response.data = data
    res.json(response)
}

function badRequest(res, error){
    let response = Object.assign({}, RESPONSE_TEMPLATE);
    response.success = false
    response.error = error
    res.statusCode = 400
    res.json(response)
}

function notFound(res, error){
    let response = Object.assign({}, RESPONSE_TEMPLATE);
    response.success = false
    response.error = error
    res.statusCode = 404
    res.json(response)
}

function serverError(res, error){
    let response = Object.assign({}, RESPONSE_TEMPLATE);
    response.error = error.message || error
    res.statusCode = 500
    res.json(response)
}

module.exports = {ok, badRequest, notFound, serverError}