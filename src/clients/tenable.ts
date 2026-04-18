import axios from 'axios';

interface TenableConfig {
  hostUrl: string;
  accessKey: string;
  secretKey: string;
}

export class TenableClient {
  private client;

  constructor(config: TenableConfig) {
    this.client = axios.create({
      baseURL: config.hostUrl,
      withCredentials: true,
      headers: {
        'x-apikey': `accesskey=${config.accessKey}; secretkey=${config.secretKey}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  async getScans() {
    const { data } = await this.client.get('/scans');
    return data;
  }

  async getScanResults(scanId: string) {
    const { data } = await this.client.get(`/scans/${scanId}/export`);
    return data;
  }
}
