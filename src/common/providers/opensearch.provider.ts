import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpenSearchService {
  private client: Client;

  constructor(private configService: ConfigService) {
    const protocol = this.configService.get<string>('OPENSEARCH_PROTOCOL');
    const host = this.configService.get<string>('OPENSEARCH_HOST');
    const port = this.configService.get<string>('OPENSEARCH_PORT');
    const user = this.configService.get<string>('OPENSEARCH_USER');
    const pass = this.configService.get<string>('OPENSEARCH_PASS');
    const auth = user + ':' + pass;

    this.client = new Client({
      node: protocol + '://' + auth + '@' + host + ':' + port,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async saveObject(object: object): Promise<string | undefined> {
    try {
      const date = new Date()
        .toLocaleString('es-CL', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
        .split('-')
        .join('.');
      const dailyIndex = 'qa-cencodesk-log-' + date;
      await this.client.index({
        index: dailyIndex,
        body: object,
        refresh: true,
      });
    } catch (error) {
      return 'Error saving object in OpenSearch cluster';
    }
  }
}
