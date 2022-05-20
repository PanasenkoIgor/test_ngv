// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

// Функция фильтрации

// Функциия filterRange выполняет фильтрацию таким образом, что заданный фильтром интервал,
// например, от 100 до 200 вернет в том числе курсы с дипазоном цен 0-100 и 200-300 и 0-300 и т.д.

// Функция принимает параметрами массив и фильтры
let filterRange = function(arr, requiredRange) {
    // Здесь и далее явно приводим значения к числовым, т.к. null некорректно работает с нестрогими равенствами
    let priceFrom = Number(requiredRange[0]);
    let priceTo = Number(requiredRange[1]);

// Сначала работаем с фильтром [null, null]
    if (requiredRange[0] === null && requiredRange[1] === null){
        // Здесь и далее используем встроенный метод filter, который возращает массив элементов, подходящих под условия
        return arr.filter(item => ( (item.prices[0] === null) && (item.prices[1] === null) ));
    // Теперь, пишем фильтр, когда известна верхняя граница фильтра
        } else if (priceTo >= priceFrom) {
        return arr.filter(item => (
                ((+item.prices[1]) > 0) && (priceTo >= (+item.prices[0])) && (priceFrom <= (+item.prices[1])) ||
                (((+item.prices[1]) == 0) && ((+item.prices[0]) >= 0) && (priceTo >= (+item.prices[0])))
            )
        )
    // Фильтр, когда известна только нижняя граница
    } else {
        return arr.filter(item => (
                ((+item.prices[1]) > 0) && (priceFrom <= (+item.prices[1])) ||
                ((+item.prices[1]) == 0) && (+item.prices[0]) > 0)
        )
    }
}


// Функция сортировки массива по цене по возрастанию минимальной цены
// Функция sortByPrice принимает массив
let sortByPrice = function(arr) {
    // Используем встроенный метод sort
    return arr.sort(function(a, b) {
        // Функция сравнения вернет -1 если минимальная цена курса a меньше минимальной цены курса b. Если больше то вернет 1
        // Если функция сравнения возвращает -1, то поставит a по меньшему индексу, чем b и наоборот
        return ((b.prices[0] < a.prices[0]) - (a.prices[0] < b.prices[0])) ||
            // Если минимальные цены a и b равны, то сортируем по максимальной цене
            ((b.prices[1] < a.prices[1]) - (a.prices[1] < b.prices[1]));
    })
}


console.log( filterRange(courses, requiredRange1) );
console.log( sortByPrice(courses) );