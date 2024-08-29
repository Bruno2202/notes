import CryptoJS from 'crypto-js';

export class TokenModel {
    static secretKey: any = process.env.EXPO_PUBLIC_SECRET_KEY;
    static userId: string = '12345';
    static timestamp: string = Date.now().toString();

    static teste(): string {
        console.log(this.secretKey)
        console.log(`${this.userId}.${this.timestamp}.${this.secretKey}`);
        console.log(CryptoJS.SHA256(`${this.userId}.${this.timestamp}.${this.secretKey}`).toString(CryptoJS.enc.Hex));
        console.log(`${CryptoJS.SHA256(`${this.userId}.${this.timestamp}.${this.secretKey}`).toString(CryptoJS.enc.Hex)}.${this.userId}`);

        return `${CryptoJS.SHA256(`${this.userId}.${this.timestamp}.${this.secretKey}`).toString(CryptoJS.enc.Hex)}.${this.userId}`;
    }

    static teste2(token: string) {
        const parts = token.split('.');
        const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;
        console.log(secretKey)

        if (parts.length === 2) {
            const userId = parts[1];
            console.log(userId);
        }
    }
}


