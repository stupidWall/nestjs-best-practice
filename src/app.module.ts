import { Module } from '@nestjs/common';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      directiveResolvers:{
        isAuthenticated: (next, source, args, ctx) => {
          // if (role === user.role) return next();
          // throw new Error(`Must have role: ${role}, you have role: ${user.role}`);
          console.log({args});
          return next();
        },
        hasRole: (next, source, { role }, ctx) => {
          // console.log(role);
          // if (role === user.role) return next();
          // throw new Error(`Must have role: ${role}, you have role: ${user.role}`);
          console.log('hasRole');
          return next();
        },
      },
      context: async ({ req, res }) => {
        let currentUser;

        const { token } = req.headers;
        console.log('TCL: token', token);

        // add the user to the context
        return {
          req,
          res,
          // pubsub,
          currentUser,
        };
      },
      debug: false,
      subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
          console.log('🔗 Connected to websocket');
        },
      },
      persistedQueries: {
        cache: new MemcachedCache(
          ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
          { retries: 10, retry: 10000 }, // Options
        ),
      },
      introspection: true,
      playground: {
        settings: {
          'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.fontSize': 14,
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'editor.theme': 'dark', // possible values: 'dark', 'light'
          'general.betaUpdates': false,
          'queryPlan.hideQueryPlanResponse': false,
          'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
          'tracing.hideTracingResponse': true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lwzymhg.mongodb.net/?retryWrites=true&w=majority`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
