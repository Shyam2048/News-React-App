import Ip from '../../Ip.json'

let key = '3e97b6ca85d448a4aa0bb844ca6c67bf'
const get = (category, page, pageSize) => {
    console.log(Ip.ip)
    let url =
        Ip.ip +
        '&apiKey=' +
        key +
        '&pageSize=' +
        pageSize +
        '&page=' +
        page +
        '&category=' +
        category
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default {
    get: get
}
