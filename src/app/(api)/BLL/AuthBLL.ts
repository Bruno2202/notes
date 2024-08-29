import { UserDAL } from "../DAL/UserDAL";
import { UserModel } from "../MODEL/UserModel";
import { UserBLL } from "./UserBLL";

export class AuthBLL {
    static async validateLogin(email: string, password: string): Promise<UserModel | null> {
        if (!UserBLL.isValidEmail(email)) {
            return null;
        }

        const user = await UserDAL.selectByEmail(email);
        if (user && user.getPassword === password) {
            return user;
        }
        return null;
    }
}