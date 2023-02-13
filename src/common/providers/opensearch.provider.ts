import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpensearchService {
  private client: Client;
  //private index: string;

  constructor(private configService: ConfigService) {
    //const index = this.configService.get<string>('OPENSEARCH_INDEX');
    const protocol = this.configService.get<string>('OPENSEARCH_PROTOCOL');
    const host = this.configService.get<string>('OPENSEARCH_HOST');
    const port = this.configService.get<string>('OPENSEARCH_PORT');
    const user = this.configService.get<string>('OPENSEARCH_USER');
    const pass = this.configService.get<string>('OPENSEARCH_PASS');
    const auth = user + ':' + pass;

    this.client = new Client({
      node: protocol + '://' + auth + '@' + host + ':' + port,
      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  async saveObject(object: object): Promise<void> {
    await this.client.index({
      index: 'todoapp',
      body: object,
      refresh: true,
    });
  }
}
