import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { ReportingModule } from './reporting/reporting.module';
import { SocketsModule } from './socket/sockets.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { NotificationsModule } from './notifications/notifications.module';
// import { WalletModule } from './wallet/wallet.module';


import { ShopifyModule } from './shopify/shopify.module';

@Module({
  controllers: [AppController, UsersController, ],
  providers: [AppService],
  imports: [
    MulterModule.register({ dest: './public/' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
      serveRoot: '/public/'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),

    AuthModule, UsersModule, SocketsModule, FriendsModule, NotificationsModule, ShopifyModule ],
})
export class AppModule { }
