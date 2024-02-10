export enum ResStatus {
	// Successful 2xx
	OK = 200,
	Created = 201,
	Accepted = 202,
	No_Content = 204,

	// Redirection 3xx

	Moved_Permanently = 301,
	Found = 302,

	// Add more status codes as needed
}

export enum ErrorStatus {
	// Client Errors 4xx
	Bad_Request = 400,
	Un_Authorized = 401,
	Payment_Required = 402,
	Forbidden = 403,
	Not_Found = 404,
	Method_Not_Allowed = 405,
	Not_Acceptable = 406,
	Conflict = 409,

	// Server Errors 5xx
	Internal_Server_Error = 500,
	Not_Implemented = 501,
	Bad_Gateway = 502,
}
