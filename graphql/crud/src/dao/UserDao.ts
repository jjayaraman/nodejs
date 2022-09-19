import { myDataSource } from "../app-data-source"
import { User } from "../entities/User"

export class UserDao {

    userRepository = myDataSource.getRepository(User)

    getUsers = async () => {
        const users = await this.userRepository.find()
        return users
    }

    getUser = async (id: number) => {
        const user = await this.userRepository.findOne({ where: { id: id } })
        return user
    }

    createUser = async (user: User) => {
        const created = await this.userRepository.save(user)
        return created
    }

    deleteUser = async (id: number) => {
        const deleted = await this.userRepository.delete(id)
        return deleted
    }

}