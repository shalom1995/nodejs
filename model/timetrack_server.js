const mysql = require('mysql');

//  连接MySQL
let db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'flashLoan',
    charset: 'utf8mb4'
});

const handleDisconnect = ()=>{
    db.connect((err) => {
        if (err) {
            console.log("与数据库建立连接失败！")
        } else {
            console.log("与数据库建立连接成功！")
        }
    })
}

db.on('error',(err)=>{
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
        console.log('与数据库连接丢失！')
        setTimeout(()=>{
            handleDisconnect();
        },10000)
    }else {
        throw err;
    }
})

handleDisconnect();