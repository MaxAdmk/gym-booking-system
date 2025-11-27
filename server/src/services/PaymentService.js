// This is a Mock class to simulate the payment process
class PaymentService {
    async processPayment(amount) {
        console.log(`Processing payment of ${amount} UAH`);

        return true;
    }
}

module.exports = new PaymentService();