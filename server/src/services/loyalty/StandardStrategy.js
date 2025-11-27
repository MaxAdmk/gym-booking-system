class StandartStrategy{

    // 1 point for every 10 UAH spent
    calculate(amount) {
        return Math.floor(amount / 10);
    }

}

module.exports = new StandartStrategy();