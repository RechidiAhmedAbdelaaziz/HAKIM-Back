import { FilterQuery } from "mongoose";

export function generateSearchQuery(
	searchFields: string[],
	keyword: string
): FilterQuery<any> {
	const orConditions: any = [];
	for (const field of searchFields) {
		orConditions.push({
			[field]: { $regex: keyword, $options: "i" },
		});
	}

	return { $or: orConditions };
}

function generateSearchQuerys(
	searchFields: string[],
	keyword: string
): FilterQuery<any> {
	const searchConditions = searchFields.map((field) => ({
		[field]: { $regex: keyword, $options: "i" },
	}));

	// Alternatively, if $text search is supported:
	// return { $text: { $search: keyword } };

	return { $or: searchConditions };
}

// Example usage
const searchFields = ["title", "description"];
const keyword = "example";

const searchQuery = generateSearchQuery(searchFields, keyword);
console.log(searchQuery);
