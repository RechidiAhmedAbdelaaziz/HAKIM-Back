import { Document, Model, Types, Query, FilterQuery } from "mongoose";
import { Applogger } from "../service";
import { generateSearchQuery } from "./search";

export interface Pagination {
	currentPage: number;
	length?: number;
	pagesNumber: number;
	next?: number;
	previous?: number;
}

type modelType<T> = Model<
	T,
	{},
	{},
	{},
	Document<unknown, {}, T> &
		T & {
			_id: Types.ObjectId;
		},
	any
>;

class ModelsGetter<T> {
	query: Query<T[], T>;
	queryString: any; // Change the type accordingly

	paginationResults: Pagination | undefined;

	constructor(monogosQuery: Query<T[], T>, queryString: any) {
		this.query = monogosQuery;
		this.queryString = queryString;
	}

	filter(): this {
		const queryStringObj = { ...this.queryString.filter };
		let queryStr = JSON.stringify(queryStringObj);
		queryStr = queryStr.replace(
			/\b(gte|lte|lt|gt)\b/g,
			(match) => `$${match}`
		);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	select(fliter: FilterQuery<T>): this {
		this.query = this.query.find(fliter);
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

	search(search: string[]): this {
		if (this.queryString.search) {
			const searchQuery = generateSearchQuery(
				search,
				this.queryString.search
			);
			Applogger.warn(searchQuery);

			this.query = this.query.find(searchQuery);
		}
		return this;
	}

	paginate(countDocuments: number): this {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;
		const endIndex = page * limit;

		const pagination: Pagination = {
			currentPage: page,
			pagesNumber: Math.ceil(countDocuments / limit),
		};

		if (endIndex < countDocuments) {
			pagination.next = page + 1;
			pagination.length = limit;
		} else pagination.length = countDocuments - endIndex;
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
	pagination?: Pagination;
}

export default ModelsGetter;
