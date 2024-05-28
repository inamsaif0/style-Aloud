import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello () {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You Page</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #e0e0e0, #f0f0f0);
                font-family: 'Arial', sans-serif;
                color: #333;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.9);
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            h1 {
                margin-bottom: 20px;
                font-size: 2.5rem;
                color: #007BFF;
            }
            p {
                font-size: 1.2rem;
                color: #555;
            }
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            .message {
                animation: fadeIn 2s ease-in-out;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome!</h1>
            <p class="message">Thank You For Shopping :)</p>
        </div>
    </body>
    </html>
  `;
  }

  async getCancel() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cancel Page</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #e0e0e0, #f0f0f0);
                font-family: 'Arial', sans-serif;
                color: #333;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.9);
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            h1 {
                margin-bottom: 20px;
                font-size: 2.5rem;
                color: #dc3545;
            }
            p {
                font-size: 1.2rem;
                color: #555;
            }
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
            .message {
                animation: fadeIn 2s ease-in-out;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Sorry to see you go!</h1>
            <p class="message">Your order has been cancelled.</p>
        </div>
    </body>
    </html>
    `;
  }

}
