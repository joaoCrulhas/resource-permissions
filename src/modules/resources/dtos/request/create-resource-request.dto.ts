export class CreateResourceRequestDto {
  name: string;
  description?: string;
  constructor(data: Partial<CreateResourceRequestDto> = {}) {
    Object.assign(this, data);
  }
}
