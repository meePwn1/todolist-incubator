export const enum TaskStatuses {
	New = 0,
	NewProgress = 1,
	Completed = 2,
	Draft = 3,
}
export const enum TaskPriorities {
	Low = 0,
	Middle = 1,
	High = 2,
	Urgently = 3,
	Later = 4,
}
export const ResultCode = {
	Success: 0,
	Error: 1,
	Captcha: 10,
} as const
