import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://localhost:3000', 'http://localhost:7000'];
  const customOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN?.replace(/^"|"$/g, '');
  if (customOrigin && !allowedOrigins.includes(customOrigin)) {
    allowedOrigins.push(customOrigin);
  }

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(null, allowedOrigins);
      }
    },
    credentials: true,
  });

  app.use(json({ limit: '1mb' }));
  app.use(cookieParser());

  const port = Number(process.env.PORT || 3333);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`aurion-core listening on http://localhost:${port}`);
}

void bootstrap();
