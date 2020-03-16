import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
 vus: 10,
 duration: '300s',
};
export default function() {
let loginByClient = http.batch( [{
  "method": "post",
  "url": "http://localhost:8080/login",
  "body": "username=client&password=test",
  "params": {
  "headers": {
  "Host": "localhost:8080",
  "Connection": "keep-alive",
  "Accept": "application/json, text/plain, */*",
  "Sec-Fetch-Dest": "empty",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Origin": "http://localhost:8080",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Referer": "http://localhost:8080/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru,uk;q=0.9,en-GB;q=0.8,en;q=0.7"
    }
  }
}]);
console.log('loginByClient response body ' + String(loginByClient[0].body));
let jsessionid = String (loginByClient[0].cookies.JSESSIONID[0].value);
console.log('jsessionid' + jsessionid);
let makeOrder = http.batch( [{
  "method": "post",
  "url": "http://localhost:8080/api/orders/",
  "body": "{\"id\":\"5e6ebe8e7bf65e3150030252\",\"items\":[{\"product\":{\"id\":\"5e6ebe8e7bf65e315003024d\",\"name\":\"Testowy produkt 1\",\"category\":{\"id\":\"5e6ebe8e7bf65e315003023e\",\"name\":\"Test 1\"},\"company\":\"TEST\",\"description\":null,\"price\":1,\"expirationDate\":null},\"quantity\":10,\"id\":1},{\"product\":{\"id\":\"5e6ebe8e7bf65e315003024e\",\"name\":\"Testowy produkt 2\",\"category\":{\"id\":\"5e6ebe8e7bf65e315003023e\",\"name\":\"Test 1\"},\"company\":\"TEST\",\"description\":null,\"price\":2,\"expirationDate\":null},\"quantity\":20,\"id\":2}],\"client\":{\"id\":\"5e6ebe8d7bf65e315003023b\",\"name\":\"Client Test 1\"},\"orderDate\":\"2020-03-16 00:47:26\",\"completeDate\":null,\"status\":\"DRAFT\"}",
  "params": {
  "cookies": {"JSESSIONID": jsessionid},
  "headers": {
  "Host": "localhost:8080",
  "Connection": "keep-alive",
  "Accept": "*/*",
  "Sec-Fetch-Dest": "empty",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
  "Content-Type": "application/json",
  "Origin": "http://localhost:8080",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Referer": "http://localhost:8080/swagger-ui.html",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru,uk;q=0.9,en-GB;q=0.8,en;q=0.7"
      }
    }
}]);
console.log('makeOrder body ' + String(makeOrder[0].body));
console.log('order id =  ' + String(makeOrder[0].json(['id'])));
let orderId =String(makeOrder[0].json(['id']));

let acceptOrder = http.batch( [{
  "method": "post",
  "url": "http://localhost:8080/login",
  "body": "username=employee&password=test",
  "params": {
  "cookies": {"JSESSIONID": jsessionid},
  "headers": {
  "Host": "localhost:8080",
  "Connection": "keep-alive",
  "Accept": "application/json, text/plain, */*",
  "Sec-Fetch-Dest": "empty",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  "Origin": "http://localhost:8080",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Referer": "http://localhost:8080/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru,uk;q=0.9,en-GB;q=0.8,en;q=0.7"
    }
  }
},{
  "method": "put",
  "url": "http://localhost:8080/api/orders/"+orderId,
  "body": "{\"id\":\""+orderId+"\",\"status\":\"ACCEPTED\"}",
  "params": {
  "cookies": {"JSESSIONID": jsessionid},
  "headers": {
  "Host": "localhost:8080",
  "Connection": "keep-alive",
  "Accept": "application/json, text/plain, */*",
  "Sec-Fetch-Dest": "empty",
  "X-Requested-With": "XMLHttpRequest",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36",
  "Content-Type": "application/json;charset=UTF-8",
  "Origin": "http://localhost:8080",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "cors",
  "Referer": "http://localhost:8080/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "ru,uk;q=0.9,en-GB;q=0.8,en;q=0.7"
    }
  }
}]);
console.log('login by employee - body ' + String(acceptOrder[0].body));
console.log('update order status ' + String(acceptOrder[1].body));


}
