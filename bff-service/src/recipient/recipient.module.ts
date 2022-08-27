import {CacheModule, Module} from '@nestjs/common';
import {RecipientController} from './recipient.controller';
import {RecipientService} from './recipient.service';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule, CacheModule.register({ttl: 120})],
    controllers: [RecipientController],
    providers: [RecipientService]
})
export class RecipientModule {
}
