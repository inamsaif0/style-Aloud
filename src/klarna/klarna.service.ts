// klarna.service.ts

import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
var dotenv = require('dotenv');
dotenv.config();
@Injectable()
export class KlarnaService {
  private readonly klarnaUsername: string;
  private readonly klarnaPassword: string;

  constructor() {
    // Initialize your Klarna API credentials here
    this.klarnaUsername = process.env.KLARNA_USERNAME;
    this.klarnaPassword = process.env.KLARNA_PASSWORD;
  }

  async createSession(): Promise<any> {
    const resp = await fetch(
      `https://api.klarna.com/payments/v1/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.klarnaUsername}:${this.klarnaPassword}`).toString('base64')}`
        },
        body: JSON.stringify({
          // Your request body here...
        })
      }
    );
    return await resp.json();
  }
}
