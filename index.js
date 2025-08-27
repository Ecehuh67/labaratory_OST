function serialize(numbers) {
    if (!numbers || numbers.length === 0) {
        return "";
    }

    // Фильтруем и подсчитываем
    const counts = new Map();
    let maxNumber = 0;
    
    numbers.forEach(num => {
        if (num >= 1 && num <= 300) {
            counts.set(num, (counts.get(num) || 0) + 1);
            maxNumber = Math.max(maxNumber, num);
        }
    });

    if (maxNumber === 0) return "";

    // Кодируем: maxNumber + "|" + простой RLE
    let result = maxNumber + "|";
    
    let pos = 1;
    while (pos <= maxNumber) {
        const count = counts.get(pos) || 0;
        
        if (count === 0) {
            // Считаем пропуски
            let skipCount = 0;
            while (pos <= maxNumber && (counts.get(pos) || 0) === 0) {
                skipCount++;
                pos++;
            }
            result += skipCount + "s"; // s = skip
        } else {
            // Записываем количество
            result += count + "c"; // c = count
            pos++;
        }
    }
    
    return result;
}

function deserialize(compressed) {
    if (!compressed) return [];
    
    const [maxNumStr, encoded] = compressed.split("|");
    const maxNumber = parseInt(maxNumStr);
    
    const numbers = [];
    let position = 1;
    
    // Простой и надежный парсинг
    const tokens = encoded.match(/\d+[sc]/g) || [];
    
    for (const token of tokens) {
        const num = parseInt(token.slice(0, -1));
        const type = token.slice(-1);
        
        if (type === 's') {
            position += num; // пропуск
        } else if (type === 'c') {
            // Добавляем числа
            for (let i = 0; i < num; i++) {
                numbers.push(position);
            }
            position++;
        }
    }
    
    return numbers;
}

module.exports = {
  serialize,
  deserialize
};
