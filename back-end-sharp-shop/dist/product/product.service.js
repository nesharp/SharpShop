"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const faker_1 = require("@faker-js/faker");
const return_product_object_1 = require("./return-product.object");
const get_all_product_dto_1 = require("./dto/get-all-product.dto");
const pagination_service_1 = require("../pagination/pagination.service");
let ProductService = exports.ProductService = class ProductService {
    constructor(prisma, paginationService) {
        this.prisma = prisma;
        this.paginationService = paginationService;
    }
    async getAll(dto) {
        const { searchTerm, sort } = dto;
        const prismaSort = [];
        if (sort === get_all_product_dto_1.EnumProductSort.LOWEST_PRICE) {
            prismaSort.push({
                price: 'asc'
            });
        }
        else if (sort === get_all_product_dto_1.EnumProductSort.HIGHEST_PRICE) {
            prismaSort.push({
                price: 'desc'
            });
        }
        else if (sort === get_all_product_dto_1.EnumProductSort.NEWEST) {
            prismaSort.push({
                createdAt: 'desc'
            });
        }
        else {
            prismaSort.push({
                createdAt: 'asc'
            });
        }
        const prismaSearchTermFilter = searchTerm
            ? {
                OR: [
                    {
                        category: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        },
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
            : {};
        const { perPage, skip } = this.paginationService.getPagination(dto);
        const products = await this.prisma.product.findMany({
            where: prismaSearchTermFilter,
            orderBy: prismaSort,
            skip: skip,
            take: perPage,
            select: return_product_object_1.productReturnObject
        });
        return {
            products,
            length: await this.prisma.product.count({
                where: prismaSearchTermFilter
            })
        };
    }
    async byId(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: id
            },
            select: return_product_object_1.productReturnObjectFull
        });
        if (!product) {
            throw new Error('Category not found');
        }
        return product;
    }
    async getSimilar(id) {
        const category = await this.prisma.product.findUnique({
            where: {
                id: id
            },
            select: {
                categoryId: true
            }
        });
        if (!category.categoryId) {
            return new Error('Category not found');
        }
        const similarProducts = await this.prisma.product.findMany({
            where: {
                categoryId: category.categoryId
            },
            select: return_product_object_1.productReturnObject
        });
        return similarProducts;
    }
    async update(id, dto) {
        const { name, description, price, images, categoryId } = dto;
        return this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                description: description,
                name: name,
                price: price,
                images: images,
                slug: faker_1.faker.helpers.slugify(name).toLowerCase(),
                category: {
                    connect: {
                        id: categoryId
                    }
                }
            }
        });
    }
    async delete(id) {
        return this.prisma.product.delete({
            where: {
                id: id
            }
        });
    }
    async create() {
        return this.prisma.product.create({
            data: {
                name: '',
                slug: '',
                description: '',
                price: 0
            }
        });
    }
    async bySlug(slug) {
        const product = await this.prisma.product.findUnique({
            where: {
                slug
            },
            select: return_product_object_1.productReturnObjectFull
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async byCategory(category) {
        const products = await this.prisma.product.findMany({
            where: {
                category: {
                    slug: category
                }
            },
            select: return_product_object_1.productReturnObject
        });
        return products;
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pagination_service_1.PaginationService])
], ProductService);
//# sourceMappingURL=product.service.js.map