import { Document, Model, Types, Query } from "mongoose";

interface Pagination {
	currentPage: number;
	limit: number;
	pagesNumber: number;
	next?: number;
	previous?: number;
}

class ModelsGetter<T> {
	query: Query<T[], T>;
	queryString: any; // Change the type accordingly

	paginationResults: Pagination | undefined;

	constructor(monogosQuery: Query<T[], T>, queryString: any) {
		this.query = monogosQuery;
		this.queryString = queryString;
	}

	filter(): this {
		const queryStringObj = { ...this.queryString };
		let queryStr = JSON.stringify(queryStringObj);
		queryStr = queryStr.replace(
			/\b(gte|lte|lt|gt)\b/g,
			(match) => `$${match}`
		);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort(): this {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		}
		return this;
	}

	fields(): this {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		}
		return this;
	}

	search(): this {
		if (this.queryString.search) {
			const query: any = {};
			query.$or = [
				{ title: { $regex: this.queryString.keyword, $options: "i" } },
				{
					description: {
						$regex: this.queryString.keyword,
						$options: "i",
					},
				},
			];
			this.query = this.query.find(query);
		}
		return this;
	}

	paginate(countDocuments: number): this {
		const page = this.queryString.page * 1 || 1;
		const limit = 10;
		const skip = (page - 1) * limit;
		const endIndex = page * limit;

		const pagination: Pagination = {
			currentPage: page,
			limit,
			pagesNumber: Math.ceil(countDocuments / limit),
		};

		if (endIndex < countDocuments) {
			pagination.next = page + 1;
		}
		if (skip > 0) {
			pagination.previous = page - 1;
		}

		this.query = this.query.skip(skip).limit(limit);

		this.paginationResults = pagination;

		return this;
	}
}

export interface ModelsGetterReturn<T> {
	result: T;
	paginaation?: Pagination;
}

export default ModelsGetter;
