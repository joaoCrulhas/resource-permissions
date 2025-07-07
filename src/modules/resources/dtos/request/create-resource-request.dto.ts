export class CreateResourceRequestDto {
  constructor(
    public name: string,
    public description?: string
  ) {}
}
