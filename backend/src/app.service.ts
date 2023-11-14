import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit  {

  private readonly logger = new Logger(AppService.name);
  
  onModuleInit() {
    this.logger.log('Conexión a la base de datos MongoDB establecida con éxito');
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
