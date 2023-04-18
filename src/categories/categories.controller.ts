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

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async createCategory(@Res() res, @Body() createCategoryDto: CreateCategoryDto, @Request() req) {

        const newCategory: CreateCategoryDto = {
            name: createCategoryDto.name,
            color: createCategoryDto.color,
            userId: req.user.userId
        }
        const category = await this.categoryService.createCategory(newCategory);
        console.log(category._id);
        const id = category._id;

        return res.status(HttpStatus.OK).json({
            message: 'Categoria creada: ',
            id
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/')
    async deleteCategory(@Res() res, @Headers('id') id: string) {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) { throw new NotAcceptableException('The id format is not correct') }
        const deleted = await this.categoryService.deleteCategory(id)
        if (!deleted) { throw new NotFoundException('Category does not exist'); }

        return res.status(HttpStatus.OK).json({
            message: 'Categoria eliminada: ',
            deleted
        })

    }
}
