import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  createCat(cat: Cat) {
    this.cats.push(cat);
  }

  findAllCats(): Cat[] {
    return this.cats;
  }
}
