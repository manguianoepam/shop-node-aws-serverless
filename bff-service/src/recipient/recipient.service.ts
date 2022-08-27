import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig} from 'axios';
import {firstValueFrom} from "rxjs";
import {Cache} from 'cache-manager';


@Injectable()
export class RecipientService {
    private endpoint: string;
    private config: AxiosRequestConfig = {};


    constructor(private readonly axios: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    getRecipient = async (service: string, method: string, data: any, authorizer?: string): Promise<any> => {
        const host = process.env[`HOST_${service.toUpperCase()}`];
        const getListProducts = await this.cacheManager.get('getListProducts');

        console.log(getListProducts);

        if (!host) {
            return {
                status: 502,
                message: 'Service not found'
            };
        }

        this.endpoint = `${host}/${service}`;

        if (method === 'GET') {
            let param: string;
            param = data[`productId`] ? data[`productId`] : '';

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
        const isListProducts = this.isGetProducts(`${host}/${service}`, 'products');
        console.log(isListProducts);
        if (isListProducts && getListProducts) {
            return getListProducts;
        }

        const result = await this.makeApiCall().then(response => response);


        if(isListProducts) {
            await this.cacheManager.set('getListProducts', result);
        }

        return result;
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

    private isGetProducts(host: string, service: string): boolean {
        return host === this.endpoint && this.config.method === 'GET' && this.endpoint.includes(service);
    }

}
