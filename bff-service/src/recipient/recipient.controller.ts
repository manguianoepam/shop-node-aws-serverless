import {Controller, Get, Post, Param, Query, Req} from '@nestjs/common';

import {RecipientService} from "./recipient.service";

@Controller('recipient')
export class RecipientController {

    constructor(private recipient: RecipientService) {

    }

    @Get(':service')
    async useGetMethod(@Param('service') service: string, @Query() query, @Req() req): Promise<any> {
        console.log(req);
        return this.recipient.getRecipient(service, 'GET', query, req.headers.authorization)
            .then(data => data)
            .catch(error => error);
    }

    @Post(':service')
    async usePostMethod(@Param('service') service: string, @Query() query): Promise<any> {
        //validate that contains product as an object
        return this.recipient.getRecipient(service, 'POST', JSON.parse(query[`product`]))
            .then(data => data)
            .catch(error => error);
    }
}
