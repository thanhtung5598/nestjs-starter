import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ default: 'john' })
  username: string;

  @ApiProperty({ default: '123123123' })
  password: string;
}
