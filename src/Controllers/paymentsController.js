// Mock data for payments
let payments = [];

exports.createPayment = (req, res) => {
    const newPayment = req.body;
    payments.push(newPayment);
    res.status(201).json(newPayment);
};

exports.getPayments = (req, res) => {
    res.status(200).json(payments);
};
