import { takeLast } from "rxjs";
import { EntityRepository, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetProductFilterDto } from "./dto/get-product-filter.dto";
import { ProductStatus } from "./product-status.enum";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product>{

 async getProducts(filterDto: GetProductFilterDto): Promise<Product[]>{
     const query = this.createQueryBuilder('product');

     const products = await query.getMany();
     return products;
 }

async createProduct(createProductDto: CreateProductDto): Promise<Product>{
    const {name, description} = createProductDto;

        const product = this.create({
            name,
            description,
            status: ProductStatus.AVAILABLE
        });

        await this.save(product);
        return product;
}
}