import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';
import { JwtStrategy } from './jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Asegúrate de establecer esta variable en tus variables de entorno
      signOptions: { expiresIn: '60m' },
    }),
    // Incluye aquí otros módulos si son necesarios, como por ejemplo MongooseModule
  ],
  providers: [UsuarioResolver, UsuarioService, JwtStrategy], // Añade aquí JwtStrategy
  exports: [UsuarioService, JwtModule], // Exporta UsuarioService para poder usarlo en otros módulos
})
export class UsuarioModule {}
