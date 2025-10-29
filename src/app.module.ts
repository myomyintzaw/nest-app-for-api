import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsController } from './cats/cats.controller';
// import { UsersController } from './users/users.controller';
// import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_db', //db name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], //entity files(table)
      synchronize: true, //not use in production at real world is make false
    }),
    CatsModule,
    PostModule,
    UsersModule,
    ProfilesModule,
  ],
  // controllers: [AppController, UsersController],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
