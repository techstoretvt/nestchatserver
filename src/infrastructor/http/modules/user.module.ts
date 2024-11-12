import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserRepositoryImpl } from '../../database/repositories/user.repository.impl';
import { CreateUserUseCase } from '../../../application/usecases/UserUsecases/create-user.usecase';
import { LoggerMiddleware } from '../middleware/logger.middleware';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        {
            provide: 'UserRepository',
            useClass: UserRepositoryImpl,
        },
    ],
    exports: ['UserRepository', CreateUserUseCase],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')
    }

}
