import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RecipientModule} from './recipient/recipient.module';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), RecipientModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
