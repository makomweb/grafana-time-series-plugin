export class Metrics extends Map<string, Measure[]> {}

export class Measure
{
  timeStamp: Date;
  value: number;

  constructor(timeStamp: Date, value: number) {
    this.timeStamp = timeStamp;
    this.value = value;
  }
}