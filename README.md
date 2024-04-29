Задание 1:
Что выводит данный код :
const arr = [10, 12, 15, 21];
for(var i = 0; i< arr.length; i++) {
 setTimeout(function() {
   console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
 }, 3000)
}

 Предложите 2 варианта модификации кода, чтобы ответ был следующим: Bad: 10, Bad: 12, Good: 15, Good: 2
