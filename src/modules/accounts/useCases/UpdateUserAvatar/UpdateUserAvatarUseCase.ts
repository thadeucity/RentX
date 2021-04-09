import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { deleteFile } from '@utils/file';

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}
  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.save(user);
  }
}

export { UpdateUserAvatarUseCase };
