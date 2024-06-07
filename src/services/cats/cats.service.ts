import { Injectable } from '@nestjs/common';
import { Cat } from 'src/@types/interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  createCat(cat: Cat) {
    this.cats.push(cat);
  }

  findAllCats(): Cat[] {
    return this.cats;
  }

  findOne(id: string): Cat | undefined {
    return this.cats.find((cat) => cat.id === id);
  }
}
