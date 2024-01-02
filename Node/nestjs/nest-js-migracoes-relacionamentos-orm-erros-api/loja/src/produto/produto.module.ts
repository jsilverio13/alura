import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModel } from './produto.model';
import { ProdutoService } from './produto.service';

@Module({
	imports: [TypeOrmModule.forFeature([ProdutoModel])],
	controllers: [ProdutoController],
	providers: [ProdutoService],
})
export class ProdutoModule {}
