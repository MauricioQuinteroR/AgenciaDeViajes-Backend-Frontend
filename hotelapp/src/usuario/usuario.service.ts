import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-usuario.input';
import { LoginUserDto } from './dto/login-user.input';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const usuario = new this.usuarioModel({ ...createUserDto, password: hashedPassword });
    return usuario.save();
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findOneById(id: string): Promise<Usuario | null> {
    return this.usuarioModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<Usuario | undefined> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<{ userId: string; token: string }> {
    const usuario = await this.findOneByEmail(loginUserDto.email);
    if (usuario && await bcrypt.compare(loginUserDto.password, usuario.password)) {
      const payload = { email: usuario.email, sub: usuario.id };
      return { userId:  usuario.id.toString(), token: this.jwtService.sign(payload) };
    }
    return null;
  }

  async updateEmail(userId: string, newEmail: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(userId);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    usuario.email = newEmail;
    return usuario.save();
  }

  async updatePassword(userId: string, newPassword: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(userId);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    usuario.password = hashedPassword;
    return usuario.save();
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      const result = await this.usuarioModel.findByIdAndDelete(id);
      if (result) {
        return { deleted: true };
      } else {
        return { deleted: false, message: 'Usuario no encontrado' };
      }
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }

  async updateActive(id: string, active: boolean): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    usuario.active = active;
    return usuario.save();
  }
  
}
