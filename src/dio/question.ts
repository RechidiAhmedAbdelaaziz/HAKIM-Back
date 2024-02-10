export interface CreateQuestionDio {
	question?: string;
	questioner: any;
}
export interface EditQuestionDio {
    id : any;
	question?: string;
	questioner?: any;
	pushAnswer? : any;
	pullAnswer? : any;
}

export interface CreateAnswerDio {
    question : any;
	answer: string;
	respondent: any;
}
export interface EditAnswerDio {
    id : any;
    answer : string;
    respondent: any;
}
