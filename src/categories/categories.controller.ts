import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException, Request, UseGuards
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/categories.dto.';


@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) { }


    @Get('/')
    async getcategories(@Res() res, @Request() req) {

        const categories = await this.categoryService.getCategories()

        if (categories.length == 0) {
            throw new NotFoundException('Do not exist any Category');
        }
        console.log('Enviando Categorias...');

        console.log(categories);
        return res.status(HttpStatus.OK).json({
            message: 'Categorias: ',
            categories
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('/mycategories')
    async getUserCategories(@Res() res, @Request() req) {

        const categories = await this.categoryService.getUserCategories(req.user.userId)

        if (categories.length == 0) {
            throw new NotFoundException('Do not exist any Category');
        }
        console.log('Enviando Categorias...');

        console.log(categories);
        return res.status(HttpStatus.OK).json({
            message: 'Categorias: ',
            categories
        })
    }

    @Post('/')
    async createCategory(@Res() res, @Body() createCategoryDto: CreateCategoryDto) {

        const category = await this.categoryService.createCategory(createCategoryDto);
        console.log(category);

        return res.status(HttpStatus.OK).json({
            message: 'Categoria creada: ',
            category
        })
    }
}
