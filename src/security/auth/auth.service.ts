import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async encryption(text: string) {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const textToEncrypt = text;

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return {
      encryptedText: {
        iv: iv.toString('hex'), // Convert IV to hex for easy storage
        encryptedText: encryptedText.toString('hex'), // Convert ciphertext to hex
      },
      decryptedText: decryptedText.toString(),
    };
  }

  async hashingPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hash);

    return {
      hash,
      salt,
      isMatch,
    };
  }

  async signIn(userName: string, pass: string) {
    const user = await this.usersService.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      roles: user.roles,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
