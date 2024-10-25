import { Assessment } from "./assessment";
import { Patient } from "./patient";

export interface CarePlanModel {
    patient: Patient;
    assessment: Assessment;
    caseName: string;
    caseAcuity: string;
    caseSource: string;
    caseType: string;
    description: string;
    note: string;
    primaryContact: string;
    mainDiagnosis: string;
    additionalDiagnosis: string;
    AdditionalOtherDiagnosis: string;

    problems: CarePlanProblem[];
}

export interface CarePlanProblem {
    problemId: number;
    name: string;
    status: string;
    startDate: Date;
    endDate: Date;

    goals: CarePlanGoal[];
}

export interface CarePlanGoal {
    goalId: number;
    name: string;
    status: string;
    priority: string;
    startDate: Date;
    endDate: Date;
    problemId: number;

    milestones: CarePlanMilestone[];
}

export interface CarePlanMilestone {
    milestoneId: number;
    name: string;
    status: string;
    actionType: string;
    startDate: Date;
    endDate: Date;
    goalId: number;
}
