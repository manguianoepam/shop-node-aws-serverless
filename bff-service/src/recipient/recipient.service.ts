import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig} from 'axios';
import {firstValueFrom} from "rxjs";

@Injectable()
export class RecipientService {
    private endpoint: string;
    private config: AxiosRequestConfig = {};


    constructor(private readonly axios: HttpService) {
    }

    getRecipient = async (service: string, method: string, data: any, authorizer?: string): Promise<any> => {
        const host = process.env[`HOST_${service.toUpperCase()}`];

        console.log(host);

        if (host) {
            this.endpoint = `${host}/${service}`;

            if (method === 'GET') {
                let param: string;
                param = data[`productId`] ? data[`productId`] : '';
                //if data[`name`] ==> set header and set param

                if (data[`name`]) {
                    param = data[`name`];
                }

                if (authorizer && authorizer !== '') {
                    this.config.headers = {
                        Authorization: authorizer
                    }
                }

                this.endpoint += param ? `/${param}` : '';
            } else if (method === 'POST') {
                this.config.data = data
            }

            this.config.method = method;
            this.config.url = this.endpoint;

            console.log(this.config);

            return this.makeApiCall().then(response => response);
        }

        return {
            status: 502,
            message: 'Service not found'
        };

    };

    private async makeApiCall(): Promise<any> {
        let result = await firstValueFrom(this.axios.request(this.config))
            .then(res => res)
            .catch(error => error);

        return {
            status: result.status !== 200 && result.status !== 201 ? result.response.status : result.status,
            data: result.status !== 200 && result.status !== 201 ? result.response.data : result.data
        }
    }

}
