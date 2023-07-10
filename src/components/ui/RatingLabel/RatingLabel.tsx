import style from './RatingLabel.module.scss'
import { IProductDetails } from '@/interfaces/product.interface'
import ReviewService from '@/services/review/review.service'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FC } from 'react'
import { AiFillStar, AiOutlineMinus } from 'react-icons/ai'

const RatingLabel: FC<IProductDetails> = ({ product }) => {
	const { isLoading, data } = useQuery<any, { rating: number }>(
		['reviews', product.id],
		() => ReviewService.getAverageRating(26),
		{ select: ({ data }) => data }
	)

	return (
		<div className={style.rating}>
			<AiFillStar />
			<p>
				{data?.rating && !isLoading ? (
					data.rating
				) : (
					<AiOutlineMinus color='red' />
				)}
			</p>
		</div>
	)
}

export default RatingLabel
