abstract class Payment {
    constructor(protected amount: number, protected date: Date) {}
    abstract processPayment(): string;
}

class CreditCardPayment extends Payment{
    private cardNumber: string;
    constructor(amount: number , date: Date , cardNumber: string){
        super(amount,date);
        this.cardNumber = cardNumber ; 
    }
    processPayment(): string {
        return `Payment of Rs.${this.amount} done on ${this.date.toDateString()}`;
    }
}

class PayPalPayment extends Payment {
    private email: string;
    constructor(amount: number, date: Date, email: string) {
        super(amount, date);
        this.email = email;
    }
    processPayment(): string {
        return `Payment of Rs.${this.amount} from ${this.email} on ${this.date.toDateString()}.`;
    }
}

class CryptoPayment extends Payment {
    private walletAddress: string;
    constructor(amount: number, date: Date, walletAddress: string) {
        super(amount, date);
        this.walletAddress = walletAddress;
    }
    processPayment(): string {
        return `Payment of Rs.${this.amount} to wallet ${this.walletAddress} on ${this.date.toDateString()}.`;
    }
}


const creditCardPay = new CreditCardPayment(2000 , new Date() , 'BHU33');
console.log(creditCardPay.processPayment()); //Payment of Rs.2000 done on Tue Feb 11 2025

const paypalPayment = new PayPalPayment(200, new Date(), "bhus@example.com");
console.log(paypalPayment.processPayment()); //Payment of Rs.200 from bhus@example.com on Tue Feb 11 2025.

const cryptoPayment = new CryptoPayment(300, new Date(), "0xABCDEF123456789");
console.log(cryptoPayment.processPayment()); //Payment of Rs.300 to wallet 0xABCDEF123456789 on Tue Feb 11 2025.

