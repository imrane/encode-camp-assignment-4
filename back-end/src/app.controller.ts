import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService, RequestTokensDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('token-address')
  getTokenAddress(){
    return { result: this.appService.getTokenAddress() };
  }

  @Post('request-tokens')
  requestTokens(@Body() body: RequestTokensDto): Promise<any> {
    return this.appService.requestTokens(body.address, body.amount);
  }

}
