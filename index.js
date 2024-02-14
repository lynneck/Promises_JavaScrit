const Request = require("./request");
const request = new Request()

async function scheduler(){
    console.log('starting in ...', new Date().toDateString)

    const requests = [
        {url: 'https://www.mercadobitcoin.net/api/BTC/ticker/'},
        {url: 'https://www.nao_Existe.net/api/BTC/ticker/'},
        {url: 'https://www.mercadobitcoin.net/api/BTC/orderbook/'},
    ]
    .map(data => ({
        ...data,
        timeout: 2000,
        method: 'get'
    }))
    .map(params => request.makeRequest(params))

    const result = await Promise.allSettled(requests)
    const allSuceded = []
    const allFailed = []

    for (const { status, value, reason} of result){
        if(status === 'rejected'){
            allFailed.push(reason)
            continue;
        }

        allSuceded.push(value)
   } 
   console.log({
       allFailed,
       allSuceded: JSON.stringify(allSuceded)}
   )

}


const PERIOD = 2000

setInterval(scheduler, PERIOD)