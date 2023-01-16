export class PaymentUnpayed {
  payment_id: number;
  first: string;
  last: string;
  cost: number;
  date: string;
  title: string;
  status: string;
  pid: number;
  vid: string;
  constructor(payment) {
    {
      this.payment_id = payment.id || this.getRandomID();
      this.first = payment.first || '';
      this.last = payment.last || '';
      this.cost = payment.cost || '';
      this.date = payment.date || '';
      this.title =payment.title || '';
      this.status = payment.status || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
