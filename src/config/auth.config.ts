import { registerAs } from '@nestjs/config';
import ms from 'ms';

function seconds(msValue: string): number {
  try {
    return ms(msValue);
  } catch (error) {
    console.log('error', msValue,error, );
    return 0
  }
}

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expirationTime: seconds(process.env.ACCESS_TOKEN_EXPIRED ?? '1d'),
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET_KEY,
      expirationTime: seconds(process.env.REFRESH_TOKEN_EXPIRED ?? '7d'),
    },
  }),
);
