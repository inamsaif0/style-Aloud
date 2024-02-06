import { NestMiddleware } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
export declare class UniqueOnDatabaseExistConstraint implements ValidatorConstraintInterface, NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
    validate(value: any, args: ValidationArguments): Promise<any>;
}
export declare function UniqueOnDatabase(entity: Function, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
