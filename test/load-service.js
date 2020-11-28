const loaderIoToken = 'loaderio-2aa50da43d3c2dc1193ac584e52d7cff'

const service = {
    getToken(){
        console.log(loaderIoToken + '/')
        return loaderIoToken + '/'
    }
}

module.exports = service