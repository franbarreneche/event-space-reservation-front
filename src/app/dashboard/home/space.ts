export class Space {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly type: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly capacity: number,
    public readonly images: string[],
  ) {}
}
