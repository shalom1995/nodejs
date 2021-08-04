const http = require('http');
const Url = require('url');

let getRetry = (url) => {
    http.get(url,(res)=>{
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // 消费响应数据以释放内存
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);

    });
}

exports.PostRetry = httpUtil;
exports.GetRetry = httpUtil;