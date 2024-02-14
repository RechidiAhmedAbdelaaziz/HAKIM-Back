interface Pagination {
	currentPage: number;
	limit: number;
	pagesNumber: number;
	next?: number;
	previous?: number;
}
interface skipInterface {
	skip: number;
	limit: number;
}
export const getSkip = (info: {
	page?: number;
	limit?: number;
}): skipInterface => {
	let { page, limit } = info;
	if (!page) page = 1;
	if (!limit) limit = 10;

	const result: skipInterface = {
		skip: (page - 1) * limit,
		limit,
	};
	return result;
};
