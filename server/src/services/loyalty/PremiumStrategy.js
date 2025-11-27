class PremiumStrategy{
    
    // 2 points for every 10 UAH spent
    calculate(amount) {
        return Math.floor((amount / 10) * 2);
    }

}

module.exports = new PremiumStrategy();