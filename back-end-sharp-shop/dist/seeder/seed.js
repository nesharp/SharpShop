"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const random_number_1 = require("../utils/random-number");
dotenv.config();
const prisma = new client_1.PrismaClient();
const createProducts = async (quantity) => {
    const products = [];
    console.log(`Created ${products.length} products`);
    for (let i = 0; i < quantity; i++) {
        const productName = faker_1.faker.commerce.productName();
        const categoryName = faker_1.faker.commerce.department();
        const product = await prisma.product.create({
            data: {
                name: productName,
                slug: faker_1.faker.helpers.slugify(productName).toLowerCase(),
                description: faker_1.faker.lorem.paragraph(),
                price: +faker_1.faker.commerce.price(),
                images: Array.from({
                    length: (0, random_number_1.getRandomNumber)(2, 6)
                }).map(() => faker_1.faker.image.url()),
                category: {
                    create: {
                        name: categoryName,
                        slug: faker_1.faker.helpers.slugify(categoryName).toLowerCase()
                    }
                },
                reviews: {
                    create: [
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        },
                        {
                            rating: 5,
                            text: faker_1.faker.lorem.paragraph(),
                            user: {
                                connect: {
                                    id: 1
                                }
                            }
                        }
                    ]
                }
            }
        });
        products.push(product);
    }
    console.log(`Created ${products.length} products)`);
};
async function main() {
    console.log('Start seeding ...');
    await createProducts(10);
}
main()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map