import { UseGuards, applyDecorators } from "@nestjs/common";
import { UserRole } from "../utils/user.roles.enum";
import { UserRoles } from "./user-roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";

export function Authorize(...roles: UserRole[]) {

    return applyDecorators(
        UserRoles(...roles),
        UseGuards( AuthGuard(), UserRoleGuard),
    );
}