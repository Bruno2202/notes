import { UserDAL } from "../DAL/UserDAL";
import { UserBLL } from "./UserBLL";

export class AuthBLL {
    static async validateLogin(email: string, password: string): Promise<boolean> {
        if (!UserBLL.isValidEmail(email)) {
            return false;
        }

        const user = await UserDAL.selectByEmail(email);
        if (user && user.getPassword === password) {
            return true;
        }
        return false;
    }
}