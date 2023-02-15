import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { Client } from '@opensearch-project/opensearch';

import { IJSONLoggerMessage } from './interfaces/json-logger-message.interface';

@Injectable()
export class OpenSearchService {
  private client: Client;
  private index: string;

  constructor(private configService: ConfigService) {
    const index =
      this.configService.get<string>('OPENSEARCH_INDEX') || 'default';
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
    this.index = index;
  }

  async saveObject(object: IJSONLoggerMessage): Promise<void> {
    try {
      const date = new Date(object['timestamp'])
        .toLocaleString('es-CL', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
        .split('-')
        .join('.');
      const dailyIndex = this.index + date;
      await this.client.index({
        index: dailyIndex,
        body: object,
        refresh: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error saving document to OpenSearch',
      );
    }
  }
}
