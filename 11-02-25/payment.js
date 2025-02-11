/*
## Online Payment System

Create Payment class with amount, date.
Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
Abstraction: Hide sensitive details like #cardNumber.
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = cardNumber;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        return "Payment of Rs.".concat(this.amount, " done on ").concat(this.date.toDateString());
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, email) {
        var _this = _super.call(this, amount, date) || this;
        _this.email = email;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        return "Payment of Rs.".concat(this.amount, " from ").concat(this.email, " on ").concat(this.date.toDateString(), ".");
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        return "Payment of Rs.".concat(this.amount, " to wallet ").concat(this.walletAddress, " on ").concat(this.date.toDateString(), ".");
    };
    return CryptoPayment;
}(Payment));
var creditCardPay = new CreditCardPayment(2000, new Date(), 'BHU33');
console.log(creditCardPay.processPayment()); //Payment of Rs.2000 done on Tue Feb 11 2025
var paypalPayment = new PayPalPayment(200, new Date(), "bhus@example.com");
console.log(paypalPayment.processPayment()); //Payment of Rs.200 from bhus@example.com on Tue Feb 11 2025.
var cryptoPayment = new CryptoPayment(300, new Date(), "0xABCDEF123456789");
console.log(cryptoPayment.processPayment()); //Payment of Rs.300 to wallet 0xABCDEF123456789 on Tue Feb 11 2025.
