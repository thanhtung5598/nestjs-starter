import { PartialType } from '@nestjs/swagger';
import { CreateLazyDto } from './create-lazy.dto';

export class UpdateLazyDto extends PartialType(CreateLazyDto) {}
