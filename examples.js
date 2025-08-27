const { serialize, deserialize } = require('./index.js');

// Примеры использования оптимизированного RLE алгоритма
// Алгоритм использует maxNumber + RLE с оптимизацией для одиночных чисел

// Функция для демонстрации сжатия
function demonstrateCompression(numbers, description) {
    console.log(`\n${description}`);
    console.log(`Исходный массив: [${numbers.join(', ')}]`);
    
    // Простейшая сериализация
    const simpleSerialized = numbers.join(',');
    const simpleLength = simpleSerialized.length;
    
    // Наш алгоритм сжатия
    const compressed = serialize(numbers);
    const compressedLength = compressed.length;
    const ratio = (simpleLength / compressedLength).toFixed(2);
    
    console.log(`Простейшая сериализация: ${simpleSerialized}`);
    console.log(`Длина простейшей: ${simpleLength}`);
    console.log(`\nОптимизированный RLE алгоритм:`);
    console.log(`  Сжатая строка: ${compressed}`);
    console.log(`  Длина сжатой: ${compressedLength}`);
    console.log(`  Коэффициент сжатия: ${ratio}x`);
    
    // Проверяем корректность (с учетом дубликатов)
    const decompressed = deserialize(compressed);
    const isCorrect = JSON.stringify([...numbers].sort((a, b) => a - b)) === 
                     JSON.stringify([...decompressed].sort((a, b) => a - b));
    
    console.log(`\nКорректность: ${isCorrect ? '✓' : '✗'}`);
    console.log(`Десериализация: [${[...decompressed].sort((a, b) => a - b).join(', ')}]`);
    
    console.log('---');
}

// Пример 1: Простые последовательные числа
const example1 = [1, 2, 3, 4, 5];
demonstrateCompression(example1, "Пример 1: Простые последовательные числа");

// Пример 2: Числа с пропусками
const example2 = [1, 3, 5, 7, 9, 11, 13];
demonstrateCompression(example2, "Пример 2: Числа с пропусками");

// Пример 3: Полный диапазон
const example3 = Array.from({length: 10}, (_, i) => i + 1);
demonstrateCompression(example3, "Пример 3: Полный диапазон");

// Пример 4: Смешанные числа разной длины
const example4 = [1, 2, 3, 10, 11, 12, 100, 101, 102];
demonstrateCompression(example4, "Пример 4: Смешанные числа разной длины");

// Пример 5: Все числа из 2-х знаков
const example5 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
demonstrateCompression(example5, "Пример 5: Все числа из 2-х знаков");

// Пример 6: Разреженные числа
const example6 = [1, 50, 100, 150, 200, 250, 300];
demonstrateCompression(example6, "Пример 6: Разреженные числа");

// Пример 7: Чередующийся паттерн
const example7 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
demonstrateCompression(example7, "Пример 7: Чередующийся паттерн");

// Пример 8: Большой набор случайных чисел
const largeExample = Array.from({length: 50}, () => Math.floor(Math.random() * 300) + 1);
demonstrateCompression(largeExample, "Пример 8: Большой набор случайных чисел (50 чисел)");

// Пример 9: Максимальный диапазон (1-300)
const maxRange = Array.from({length: 300}, (_, i) => i + 1);
demonstrateCompression(maxRange, "Пример 9: Максимальный диапазон (1-300)");

// Пример 10: Дубликаты чисел
const duplicatesExample = [1, 1, 1, 5, 5, 10, 10, 10, 10];
demonstrateCompression(duplicatesExample, "Пример 10: Дубликаты чисел");

// Пример 11: Каждого числа по 3 (900 чисел)
const repeatedNumbers = Array.from({length: 300}, (_, i) => i + 1).flatMap(n => [n, n, n]);
demonstrateCompression(repeatedNumbers, "Пример 11: Каждого числа по 3 (900 чисел)");

// Пример 12: Граничные случаи
const boundaryExample = [1, 150, 300];
demonstrateCompression(boundaryExample, "Пример 12: Граничные случаи (1, 150, 300)");

// Пример 13: Все однозначные числа
const singleDigitExample = [1, 2, 3, 4, 5, 6, 7, 8, 9];
demonstrateCompression(singleDigitExample, "Пример 13: Все однозначные числа");

// Пример 14: Все двузначные числа
const twoDigitExample = Array.from({length: 90}, (_, i) => i + 10);
demonstrateCompression(twoDigitExample, "Пример 14: Все двузначные числа (10-99)");

// Пример 15: Все трёхзначные числа
const threeDigitExample = Array.from({length: 201}, (_, i) => i + 100);
demonstrateCompression(threeDigitExample, "Пример 15: Все трёхзначные числа (100-300)");

// Пример 16: Случайные 50 чисел
const random50 = Array.from({length: 50}, () => Math.floor(Math.random() * 300) + 1);
demonstrateCompression(random50, "Пример 16: Случайные 50 чисел");

// Пример 17: Случайные 100 чисел
const random100 = Array.from({length: 100}, () => Math.floor(Math.random() * 300) + 1);
demonstrateCompression(random100, "Пример 17: Случайные 100 чисел");

// Пример 18: Случайные 500 чисел
const random500 = Array.from({length: 500}, () => Math.floor(Math.random() * 300) + 1);
demonstrateCompression(random500, "Пример 18: Случайные 500 чисел");

// Пример 19: Случайные 1000 чисел
const random1000 = Array.from({length: 1000}, () => Math.floor(Math.random() * 300) + 1);
demonstrateCompression(random1000, "Пример 19: Случайные 1000 чисел");

// Пример 20: Проблемный случай [300, 300, 300, 300]
const problematicExample = [300, 300, 300, 300];
demonstrateCompression(problematicExample, "Пример 20: Проблемный случай [300, 300, 300, 300]");