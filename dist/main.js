"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./utils/helper/global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    serve_static_1.ServeStaticModule.forRoot({
        rootPath: (0, path_1.join)(__dirname, '..', 'public'),
    }),
        await app.listen(8078);
}
bootstrap();
//# sourceMappingURL=main.js.map