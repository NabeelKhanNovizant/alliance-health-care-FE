export interface ApiResponse {
    cases: Case[];
}
export interface Goal {
    name: string;   
    items: string[];
}
export interface Problem {
    name: string;
    goals: Goal[];
}
export interface Case {
    name: string;
    problems: Problem[];
}
