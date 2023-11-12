import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUserDto } from './dto/create-usuario.input';
import { LoginUserDto } from './dto/login-user.input';

@Resolver(of => Usuario)
export class UsuarioResolver {
  constructor(private usuarioService: UsuarioService) {}

  @Query(returns => [Usuario])
  async users() {
    return this.usuarioService.findAll();
  }

  @Query(returns => Usuario, { nullable: true })
  async userById(@Args('id', { type: () => String }) id: string) {
    return this.usuarioService.findOneById(id);
  }

  @Query(returns => Usuario, { nullable: true })
  async userByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usuarioService.findOneByEmail(email);
  }
  
  @Mutation(returns => Usuario)
  async registerUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.usuarioService.create(createUserDto);
  }

  @Mutation(returns => String) // Retorna un token JWT
  async loginUser(@Args('loginUserDto') loginUserDto: LoginUserDto) {
    const user = await this.usuarioService.validateUser(loginUserDto);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    return user.token; // El token JWT
  }

  @Mutation(returns => Usuario)
  async updateEmail(
    @Args('userId') userId: string,
    @Args('newEmail') newEmail: string,
  ) {
    return this.usuarioService.updateEmail(userId, newEmail);
  }

  @Mutation(returns => Usuario)
  async updatePassword(
    @Args('userId') userId: string,
    @Args('newPassword') newPassword: string,
  ) {
    return this.usuarioService.updatePassword(userId, newPassword);
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args('id', { type: () => String }) id: string) {
    const result = await this.usuarioService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar el usuario.');
    }
    return result.deleted;
  }

  @Mutation(returns => Usuario)
  async updateUserActive(
    @Args('id', { type: () => String }) id: string,
    @Args('active', { type: () => Boolean }) active: boolean,
  ) {
    return this.usuarioService.updateActive(id, active);
  }
}
