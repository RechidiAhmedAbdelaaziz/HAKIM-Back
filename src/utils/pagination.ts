import { Pagination } from "./model.getter";

export function paginate(
	countDocuments: number,
	page: number,
	limit: number
): Pagination {
	const skip = (page - 1) * limit;
	const endIndex = page * limit;

	const pagination: Pagination = {
		currentPage: page,
		pagesNumber: Math.ceil(countDocuments / limit),
	};

	if (endIndex < countDocuments) {
		pagination.next = page + 1;
		pagination.length = limit;
	} else {
		pagination.length = countDocuments - endIndex;
		if (pagination.length < 0) pagination.length = countDocuments;
	}
	if (skip > 0) {
		pagination.previous = page - 1;
	}

	return pagination;
}
