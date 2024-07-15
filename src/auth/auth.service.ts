import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private jwtservice : JwtService, private prismaservice : PrismaService){}

    async decryptPassword(encryptedPassword: string, plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, encryptedPassword);
    }

    async validateUser({email, password} : AuthDto){
         const findUser = await this.prismaservice.user.findFirst({where:{email}})

         console.log({findUser})
         if(!findUser) return null;

         const isPasswordValid = await this.decryptPassword(findUser.password, password);
         if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
         }
 
         if(isPasswordValid){
            const {password, ...user} = findUser;
            return {
                token : this.jwtservice.sign(user)
            }
         }
    }

    async registerUser(registerDto: RegisterDto) {
      try {
        const { email, username, password } = registerDto;

        const existingUser = await this.prismaservice.user.findUnique({
          where: { email },
        });
  
        if (existingUser) {
          throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const user = await this.prismaservice.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });
  
        delete user.password;
        return user;
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
}
