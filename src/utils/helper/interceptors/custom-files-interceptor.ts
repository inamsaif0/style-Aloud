import {
    FileInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../upload-files';



export class InterceptorHelper {
    static globalFileInterceptorForImage(fieldName: string, destination: string) {
        return FileInterceptor(fieldName, {
            storage: diskStorage({ destination, filename: editFileName }),
            fileFilter: imageFileFilter,
        });
    }


}