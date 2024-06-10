import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  getHello(): string {
    return 'Hello from Lazy Service!';
  }
}
