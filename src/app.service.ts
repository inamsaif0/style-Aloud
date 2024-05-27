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
                background: linear-gradient(135deg, #ff7e5f, #feb47b);
                font-family: 'Arial', sans-serif;
                color: #fff;
                text-align: center;
            }
            .container {
                background: rgba(255, 255, 255, 0.2);
                padding: 50px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
            }
            h1 {
                margin-bottom: 20px;
                font-size: 2.5rem;
            }
            p {
                font-size: 1.2rem;
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
                  background: linear-gradient(135deg, #ff7e5f, #feb47b);
                  font-family: 'Arial', sans-serif;
                  color: #fff;
                  text-align: center;
              }
              .container {
                  background: rgba(255, 255, 255, 0.2);
                  padding: 50px;
                  border-radius: 15px;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  backdrop-filter: blur(10px);
              }
              h1 {
                  margin-bottom: 20px;
                  font-size: 2.5rem;
              }
              p {
                  font-size: 1.2rem;
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
