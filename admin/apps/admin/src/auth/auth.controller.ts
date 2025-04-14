import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty } from 'class-validator';
import { AuthService } from './auth.service';

class LoginDto {
    @IsNotEmpty({
        message: '手机号码不能为空'
    })
    mobile: string;

    @IsNotEmpty({
        message: '验证码不能为空'
    })
    code: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    public async login(@Body() body: LoginDto) {
        const { mobile, code } = body;
        
        return await this.authService.login(mobile, Number(code))
    }

    
    @Post('test')
    public async test() {
        return 'yes'
    }
}
