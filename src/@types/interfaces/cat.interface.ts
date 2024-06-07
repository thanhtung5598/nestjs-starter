import { CreateCatDto } from '../dto/create-cat.dto';

export type Cat = {
  id: string;
} & CreateCatDto;
