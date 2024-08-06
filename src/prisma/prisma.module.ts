import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


@Global() //this module is used Global
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
