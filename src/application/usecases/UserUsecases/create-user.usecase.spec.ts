// // src/application/usecases/find-user.usecase.spec.ts
// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateUserUseCase } from './create_user.usecase';
// import { UserRepository } from '../../../domain/repositories/user.repository';
// import { UserNotFoundException } from '../../../shared/exceptions/user_not_found.exception';

// describe('CreateUserUseCase', () => {
//     let useCase: CreateUserUseCase;
//     let repository: UserRepository;

//     beforeEach(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 CreateUserUseCase,
//                 { provide: 'UserRepository', useValue: { findUserById: jest.fn() } },
//             ],
//         }).compile();

//         useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
//         repository = module.get<UserRepository>('UserRepository');
//     });

//     it('should return user if found', async () => {
//         const user = { id: '1', name: 'Test User', email: 'email test' };
//         jest.spyOn(repository, 'save').mockResolvedValue(user);

//         expect(await useCase.execute('1')).toEqual(user);
//     });

//     it('should throw UserNotFoundException if user not found', async () => {
//         jest.spyOn(repository, 'findUserById').mockResolvedValue(null);

//         await expect(useCase.execute('1')).rejects.toThrow(UserNotFoundException);
//     });
// });
