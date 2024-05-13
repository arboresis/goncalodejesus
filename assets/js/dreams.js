class DreamReader {
    constructor(filePath) {
        this.filePath = filePath;
        this.dreams = [];
        this.names = [];

        this.arboresis = "Gonçalo";
        this.arboresisDream = "But here's one of his favorites.";
    }

    readData(callback) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', this.filePath, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                this.dreams = data.dreams;
                this.names = data.names;
                callback();
            }
        };
        xhr.send(null);
    }

    getRandomElements(array, count) {
        const shuffled = array.slice(0);
        let i = array.length;
        const min = i - count;
        let temp;
        let index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    getDreamsAndNames(num) {
        const randomDreams = this.getRandomElements(this.dreams, num);
        const randomNames = this.getRandomElements(this.names, num);
        return { dreams: randomDreams, names: randomNames };
    }
}
