#!/usr/bin/env ts-node
/// <reference types="express" />
declare module "commands/Command" {
    class Command implements AbstractCommandInterface {
        args: {
            [key: string]: any;
        };
        name: string;
        constructor();
        getName(): string;
        main(): void;
        set arguments(values: {
            [key: string]: string;
        });
        get arguments(): {
            [key: string]: string;
        };
    }
    export interface AbstractCommandInterface {
        name: string;
        main(): void;
        getName(): string;
        set arguments(values: {
            [key: string]: string;
        });
        get arguments(): {
            [key: string]: string;
        };
    }
    export interface CommandInterface extends AbstractCommandInterface {
        name: string;
        main(): void;
    }
    export default Command;
}
declare module "commands/Sample" {
    import Command from "commands/Command";
    class Sample extends Command {
        name: string;
        main(): void;
    }
    export default Sample;
}
declare module "runner" {
    class Runner {
        constructor();
        private subscriber;
        private commands;
        main(): void;
    }
    const _default: Runner;
    export default _default;
}
declare module "config/cors" {
    export const ALLOWED_ORIGINS: string[];
    export const ALLOWED_METHODS: string[];
    export const ALLOWED_HEADERS: string[];
}
declare module "config/jwt" {
    export const JWT_SECRET: string;
    export const JWT_LEEWAY: number;
    export const JWT_EXPIRATION: string | number;
}
declare module "src/types/JWT" {
    import { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken';
    export type verifyTokenParams = {
        token: string;
        withoutException?: boolean;
    };
    export type verifyTokenResponse = {
        errors?: VerifyErrors | undefined;
        decoded?: JwtPayload;
    };
    export type JwtPayloadType = Jwt['payload'] | string | undefined;
    export type JwtType = Jwt;
}
declare module "src/models/index" {
    import { Sequelize } from 'sequelize';
    const connection: Sequelize;
    export default connection;
}
declare module "src/helpers/common" {
    import { Request } from 'express';
    export function loadEnv(): void;
    export function random(length: number): string;
    export function getIpAddress(req: Request): string | undefined | null;
    export function mergeCustomizer(value: any, newValue: any): any;
    export function generatePassword(rawPassword?: string): {
        salt: string;
        password: any;
    };
    export function unixTimestamp(): number;
}
declare module "src/helpers/auth" {
    import { UserOutput } from "src/models/User";
    export const authenticate: (hashedPassword: string, nonce: string, user: UserOutput) => boolean;
    export const hashedPassword: (rawPassword: string) => {
        hash: string;
        nonce: string;
    };
}
declare module "src/models/UserRole" {
    import { Optional, Model } from 'sequelize';
    interface UserRoleAttributes {
        userRoleId: number;
        userId: number;
        roles: {
            [key: string]: string[];
        };
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }
    export interface UserRoleInput extends Optional<UserRoleAttributes, 'userRoleId'> {
    }
    export interface UserRoleOutput extends Required<UserRoleAttributes> {
    }
    class UserRole extends Model<UserRoleAttributes, UserRoleInput> implements UserRoleAttributes {
        userId: number;
        userRoleId: number;
        roles: {
            [ket: string]: string[];
        };
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        static associate(models: Model[]): void;
        transform(options?: string[]): Partial<UserRoleAttributes>;
    }
    export default UserRole;
}
declare module "src/models/GroupRole" {
    import { Optional, Model } from 'sequelize';
    interface GroupRoleAttributes {
        roles: object;
        groupRoleId: number;
        name: string;
        key: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }
    export interface GroupRoleInput extends Optional<GroupRoleAttributes, 'groupRoleId'> {
    }
    export interface GroupRoleOutput extends Required<GroupRoleAttributes> {
    }
    class GroupRole extends Model<GroupRoleAttributes, GroupRoleInput> implements GroupRoleAttributes {
        roles: object;
        groupRoleId: number;
        key: string;
        name: string;
        parentId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        static associate(models: Model[]): void;
        transform(options?: string[]): Partial<GroupRoleAttributes>;
    }
    export default GroupRole;
}
declare module "src/models/GroupUser" {
    import { Optional, Model } from 'sequelize';
    interface GroupUserAttributes {
        groupUserId: number;
        groupRoleId: number;
        userId: number;
        name: string;
        key: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }
    export interface GroupUserInput extends Optional<GroupUserAttributes, 'groupRoleId'> {
    }
    export interface GroupUserOutput extends Required<GroupUserAttributes> {
    }
    class GroupUser extends Model<GroupUserAttributes, GroupUserInput> implements GroupUserAttributes {
        groupUserId: number;
        groupRoleId: number;
        userId: number;
        name: string;
        key: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        static associate(models: Model[]): void;
        transform(options?: string[]): Partial<GroupUserAttributes>;
    }
    export default GroupUser;
}
declare module "src/types/sequelize" {
    export type Options = {
        raw?: boolean;
        attributes?: string[];
    };
}
declare module "src/repositories/GroupRroleRepository" {
    import { DestroyOptions } from 'sequelize';
    import { GroupRoleOutput } from "src/models/GroupRole";
    import { Options } from "src/types/sequelize";
    export const find: (id: number, options?: Options) => Promise<GroupRoleOutput | null>;
    export const findByKey: (key: string, options?: Options) => Promise<GroupRoleOutput | null>;
    export const all: (options?: Options) => Promise<GroupRoleOutput[] | null>;
    export const destroy: (options: DestroyOptions) => Promise<number>;
    const _default_1: {
        find: (id: number, options?: Options) => Promise<GroupRoleOutput | null>;
        all: (options?: Options) => Promise<GroupRoleOutput[] | null>;
        findByKey: (key: string, options?: Options) => Promise<GroupRoleOutput | null>;
        destroy: (options: DestroyOptions<any>) => Promise<number>;
    };
    export default _default_1;
}
declare module "src/models/User" {
    import { Optional, Model, HasManyAddAssociationMixin } from 'sequelize';
    import { UserRoleOutput } from "src/models/UserRole";
    import GroupRole, { GroupRoleOutput } from "src/models/GroupRole";
    export interface UserAttributes {
        userId: number;
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        email: string;
        salt: string;
        groupRoles?: GroupRoleOutput[];
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }
    export interface UserInput extends Optional<UserAttributes, 'userId'> {
    }
    export interface UserOutput extends Required<UserAttributes> {
    }
    class User extends Model<UserAttributes, UserInput> implements UserAttributes {
        userId: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        salt: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        role: UserRoleOutput;
        groupRoles: GroupRoleOutput[];
        static associate(models: Model[]): void;
        authenticate(rawPassword: string, nonce: string): boolean;
        addGroupRoles: HasManyAddAssociationMixin<GroupRole, number>;
        sign(): string;
        get permissions(): {
            [key: string]: string[];
        };
        transform(options?: string[]): Partial<UserAttributes>;
    }
    export default User;
}
declare module "src/repositories/UserRepository" {
    import User, { UserAttributes, UserInput, UserOutput } from "src/models/User";
    import { FindOptions } from 'sequelize';
    interface UserRepositoryInterface {
        find(id: number, options?: Omit<FindOptions<UserAttributes>, 'where'> | undefined): Promise<UserOutput | null>;
        findByEmail(email: string, returnAll: boolean): Promise<User | null> | null;
        createUser(payload: UserInput): Promise<User | null>;
    }
    class UserRepository implements UserRepositoryInterface {
        find(id: number, options?: Omit<FindOptions<UserAttributes>, 'where'> | undefined): Promise<UserOutput | null>;
        findByEmail(email: string, returnAll?: boolean): Promise<User | null>;
        deleteUserById(id: number): Promise<number | null>;
        createUser(payload: UserInput): Promise<User | null>;
    }
    const _default_2: UserRepository;
    export default _default_2;
}
declare module "src/helpers/JWT" {
    import { verifyTokenParams, verifyTokenResponse } from "src/types/JWT";
    export function sign(payload: any): string;
    export function verifyToken({ token }: verifyTokenParams): verifyTokenResponse;
    export function authBearer(): any;
}
declare module "src/utils/ErrorException" {
    export class ModelException extends Error {
        model?: string;
        constructor(message: string, model: string);
        get response(): object;
    }
    export class AuthException extends Error {
        constructor(message: string);
        get response(): object;
    }
    export class ErrorException extends Error {
        code?: number;
        constructor(message: string, code?: number);
        get response(): object;
    }
}
declare module "src/controllers/UsersController" {
    import { NextFunction, Request, Response } from 'express';
    export const login: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    export const verifyToken: ({ params }: Request, res: Response) => Response<any, Record<string, any>>;
    export function create(req: Request, res: Response, next: NextFunction): void;
}
declare module "src/middlewares/ValidatorMiddleware" {
    import { NextFunction, Request, Response } from 'express';
    import { ValidationChain } from 'express-validator';
    export default function validator(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}
declare module "src/validations/users/SignUpValidation" {
    const _default_3: import("express-validator").ValidationChain[] & {
        run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator/src/chain").ResultWithContext[]>;
    };
    export default _default_3;
}
declare module "src/validations/users/LoginValidation" {
    const _default_4: import("express-validator").ValidationChain[];
    export default _default_4;
}
declare module "src/models/Role" {
    import { Optional, Model } from 'sequelize';
    interface RoleAttributes {
        roleId: number;
        key: string;
        name: string;
        parentId: number;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
    }
    export interface RoleInput extends Optional<RoleAttributes, 'roleId'> {
    }
    export interface RoleOutput extends Required<RoleAttributes> {
    }
    class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
        roleId: number;
        name: string;
        key: string;
        parentId: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        static associate(models: Model[]): void;
        transform(options?: string[]): Partial<RoleAttributes>;
    }
    export default Role;
}
declare module "src/repositories/RoleRepository" {
    import { RoleOutput } from "src/models/Role";
    import { Options } from "src/types/sequelize";
    export const find: (id: number, options?: Options) => Promise<RoleOutput | null>;
    export const all: (options?: Options) => Promise<RoleOutput[] | null>;
}
declare module "src/routes/api" {
    const router: import("express-serve-static-core").Router;
    export default router;
}
declare module "src/types/HttpResponse" {
    import { Response } from 'express';
    export interface JsonResponse {
        message: string;
        data: any;
        errors?: {
            [key: string]: any;
        };
        code: number;
    }
    type Send<T = Response> = (body?: JsonResponse) => T;
    export interface HttpResponse extends Response {
        json: Send<this>;
    }
}
declare module "src/controllers/2022_12_19/users/UsersController" {
    import { Request, Response } from 'express';
    import { HttpResponse } from "src/types/HttpResponse";
    function createUser(req: Request, res: Response): Promise<HttpResponse>;
    function deleteUser(req: Request, res: Response): Promise<HttpResponse>;
    function getUser(req: Request, res: Response): Promise<HttpResponse>;
    const _default_5: {
        createUser: typeof createUser;
        deleteUser: typeof deleteUser;
        getUser: typeof getUser;
    };
    export default _default_5;
}
declare module "src/controllers/2022_12_19/index" {
    const _default_6: {
        users: {
            createUser: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<import("src/types/HttpResponse").HttpResponse>;
            deleteUser: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<import("src/types/HttpResponse").HttpResponse>;
            getUser: (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<import("src/types/HttpResponse").HttpResponse>;
        };
    };
    export default _default_6;
}
declare module "src/validations/users/CreateUserValidaiton" {
    const _default_7: import("express-validator").ValidationChain[] & {
        run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator/src/chain").ResultWithContext[]>;
    };
    export default _default_7;
}
declare module "src/utils/LodashMixins" {
    import _ from 'lodash';
    module 'lodash' {
        interface LoDashStatic {
            pascalCase: (value: string) => string;
        }
    }
    export default _;
}
declare module "src/middlewares/RbacMiddleware" {
    import { NextFunction, Request, Response } from 'express';
    export default function canAccess(string: string): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
}
declare module "src/routes/route_2022_12_19" {
    const router: import("express-serve-static-core").Router;
    export default router;
}
declare module "src/routes/index" {
    import { Express } from 'express';
    const _default_8: (app: Express) => void;
    export default _default_8;
}
declare module "src/types/Helpers" {
    import { ErrorRequestHandler } from 'express';
    export type errorHandlerParams = {
        code?: number;
        payload?: object | null;
    };
    export type ErrorExceptions = ErrorRequestHandler & {
        code?: number;
        message?: any;
        response?: object;
        model?: string;
    };
    export type ErrorHandlerOutput = {
        message?: string;
        data?: any;
        code?: number;
        errors?: any;
    };
}
declare module "src/helpers/ErrorHandler" {
    import { NextFunction, Request, Response } from 'express';
    import { ErrorExceptions } from "src/types/Helpers";
    export function errorHandler(err: ErrorExceptions, req: Request, res: Response, next: NextFunction): Response;
}
declare module "src/utils/File" {
    class File {
        protected baseDir: string;
        protected public: string;
        constructor();
        isFolderExists(location: string, isPublic?: boolean): boolean;
        exits(location: string, isPublic?: boolean): boolean;
        mkdir(location: string): void;
        write(filePath: string, message: string, isPublic?: boolean): void;
    }
    export default File;
}
declare module "src/middlewares/LoggerMiddleware" {
    import { NextFunction, Request, Response } from 'express';
    type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
    interface CustomResponse extends Omit<Response, 'end'> {
        end: (data: any, encoding: string) => void;
    }
    const _default_9: (req: Request, res: CustomResponse, next: NextFunction) => void;
    export default _default_9;
}
declare module "src/Server" {
    import { Express } from 'express';
    const app: Express;
    export default app;
}
declare module "src/repositories/UserRoleRepository" {
    import UserRole from "src/models/UserRole";
    import { Options } from "src/types/sequelize";
    export const find: (id: number, options?: Options) => Promise<UserRole | null>;
    export const all: (options?: Options) => Promise<UserRole[] | null>;
}
declare module "src/utils/RoleBasedAccess" {
    import User from "src/models/User";
    class RoleBasedAccess {
        protected localKey: string;
        protected user: User;
        constructor(user: User, localKey: string);
        denied(): boolean;
    }
    export default RoleBasedAccess;
}
declare module "src/utils/Server" {
    import { Express } from 'express';
    export function version(app: Express): string[];
}
declare module "src/utils/extensions/lodash-extension" {
    global {
        interface LoDashStatic {
            pascalCase: (string: string) => string;
        }
    }
}
declare module "src/validations/users/Index" {
    const _default_10: {
        loginValidation: import("express-validator").ValidationChain[];
    };
    export default _default_10;
}
//# sourceMappingURL=bundle.d.ts.map