import * as dotenv from 'dotenv'
import { PrismaClient, Product } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { getRandomNumber } from '../utils/random-number'
dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
	const products: Product[] = []
	console.log(`Created ${products.length} products`)

	for (let i = 0; i < quantity; i++) {
		const productName = faker.commerce.productName()
		const categoryName = faker.commerce.department()

		const product = await prisma.product.create({
			data: {
				name: productName,
				slug: faker.helpers.slugify(productName).toLowerCase(),
				description: faker.lorem.paragraph(),
				price: +faker.commerce.price(),
				images: Array.from({
					length: getRandomNumber(2, 6)
				}).map(() => faker.image.url()),
				category: {
					create: {
						name: categoryName,
						slug: faker.helpers.slugify(categoryName).toLowerCase()
					}
				},
				reviews: {
					create: [
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						},
						{
							rating: 5,
							text: faker.lorem.paragraph(),
							user: {
								connect: {
									id: 1
								}
							}
						}
					]
				}
			}
		})
		products.push(product)
	}
	console.log(`Created ${products.length} products)`)
}

async function main() {
	console.log('Start seeding ...')
	await createProducts(10)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
