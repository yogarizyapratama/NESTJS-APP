import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';;
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authservice : AuthService, private prismaservice: PrismaService){}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req:Request){
        return req.user
    }

    @Get('status')
    @UseGuards(JwtGuard)
    async status(@Req() req: Request){
        const user = await this.prismaservice.user.findMany()
        console.log(req.user)
        return user
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const user = await this.authservice.registerUser(registerDto);
        return user;
    }
} 
