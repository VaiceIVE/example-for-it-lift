import { User } from '../user/entities/user.entity'
import { DataSource } from "typeorm";

export const userProvider = {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  }