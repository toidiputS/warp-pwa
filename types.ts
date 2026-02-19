export interface SprintTask {
    task: string;
    duration: string;
    priority: 'critical' | 'high' | 'medium';
}

export interface SprintDay {
    day: number;
    theme: string;
    objective: string;
    tasks: SprintTask[];
    deliverable: string;
}

export interface SprintReport {
    projectName: string;
    launchGoal: string;
    currentState: string;
    sprintScore: number;
    scoringBreakdown: {
        goalClarity: { score: number; rationale: string };
        scopeRealism: { score: number; rationale: string };
        resourceReadiness: { score: number; rationale: string };
        marketTiming: { score: number; rationale: string };
        executionRisk: { score: number; rationale: string };
    };
    strengths: string[];
    risks: string[];
    sprintMap: SprintDay[];
    launchAssets: string[];
    launchReadinessVerdict: string;
}

export enum AppState {
    WELCOME,
    QUESTIONS,
    ANALYZING,
    REPORT,
    COMMITTING,
    FINISHED
}
