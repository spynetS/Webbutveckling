export type StrengthPoint = {
	date: Date;
	strength: number;
}

export type StrengthProgress = {
	muscleGroup: string;
	strengthPoints: StrengthPoint[]
	progress: number;
}

export type Stats = {
	sessions: number;
	weightProgress: number;
	strengthProgress: {
		strengthData: StrengthProgress[];
		totalStrength: number;
		totalStartStrength: number;
	}

};
