import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  
  // @Get()
  // getAllProducts(): Product[] {
  //   return this.productsService.getAllProducts();
  // }

  @Get('/:id')
  getproductById(@Param('id') id:string): Promise<Product>{
    return this.productsService.getProductById(id);
  }


  @Get()
  getProducts(@Query() filterDto: GetProductFilterDto): Promise<Product[]> {
    return this.productsService.getProducts(filterDto);
  }


  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
   return this.productsService.createProduct(createProductDto);
  }
   
  @Delete('/:id')
  deleteProduct(@Param('id') id:string): Promise<void>{
    return this.productsService.deleteProduct(id);
  }

  
  // @Patch('/:id/status')#
  // updateProductStatus(
  //   @Param('id') id: string,
  //   @Body() updateProductStatusDto: updatepro


  // @Delete('/:id')
  // deleteProduct(@Param('id') id:string): void{
  //     return this.productsService.deleteProduct(id);
  // }
}
