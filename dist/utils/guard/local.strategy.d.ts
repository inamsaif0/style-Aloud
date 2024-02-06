import { AuthService } from '../../auth/auth.service';
declare const LocalStrategy_base: any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request, email: string, password: string): Promise<any>;
}
export {};
