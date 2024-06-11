import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Cat } from 'src/@types/interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  private readonly cats: Cat[] = [];

  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }

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
