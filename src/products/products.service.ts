import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import {ProductStatus } from './product-status.enum';
import { Product } from './product.entity';
import { ProductsRepository } from './products.repository';


@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(ProductsRepository)
        private productsRepository: ProductsRepository,
    ){}

    // private products: Product[] = [];

    // getAllProducts(): Product[]{
    //     return this.products;
    // }

    async getProductById(id: string): Promise<Product>{
        const found = await this.productsRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    createProduct(createProductDto:CreateProductDto): Promise<Product>{
       return this.productsRepository.createProduct(createProductDto);
    }

    async deleteProduct(id:string): Promise<void>{
        const result = await this.productsRepository.delete(id);
       
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

        getProducts(filterDto:GetProductFilterDto): Promise<Product[]> {
            return this.productsRepository.getProducts(filterDto);
        }
//    async updateProductStatus(id: string, status: ProductStatus) : Promise<Product> {
//        const product = await this.getProductById(id);

//        product.status = status;
//        await this.productsRepository.save(product);

//        return task;
//    }
}
