import {
    Controller, Post, Get, Put, Delete, Patch, Res,
    HttpStatus, Body, Query, Param, NotFoundException, Headers,
    NotAcceptableException
} from '@nestjs/common';
import { CategoriesService } from './categories.service';


@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) { }


}
