import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { SprintReport } from "../types";

export const generateWarpReport = async (answers: string[]): Promise<SprintReport> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("WARP API Key is missing. Please check your .env.local file.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: SchemaType.OBJECT,
                properties: {
                    projectName: { type: SchemaType.STRING },
                    launchGoal: { type: SchemaType.STRING },
                    currentState: { type: SchemaType.STRING },
                    sprintScore: { type: SchemaType.NUMBER },
                    scoringBreakdown: {
                        type: SchemaType.OBJECT,
                        properties: {
                            goalClarity: {
                                type: SchemaType.OBJECT,
                                properties: { score: { type: SchemaType.NUMBER }, rationale: { type: SchemaType.STRING } },
                                required: ["score", "rationale"]
                            },
                            scopeRealism: {
                                type: SchemaType.OBJECT,
                                properties: { score: { type: SchemaType.NUMBER }, rationale: { type: SchemaType.STRING } },
                                required: ["score", "rationale"]
                            },
                            resourceReadiness: {
                                type: SchemaType.OBJECT,
                                properties: { score: { type: SchemaType.NUMBER }, rationale: { type: SchemaType.STRING } },
                                required: ["score", "rationale"]
                            },
                            marketTiming: {
                                type: SchemaType.OBJECT,
                                properties: { score: { type: SchemaType.NUMBER }, rationale: { type: SchemaType.STRING } },
                                required: ["score", "rationale"]
                            },
                            executionRisk: {
                                type: SchemaType.OBJECT,
                                properties: { score: { type: SchemaType.NUMBER }, rationale: { type: SchemaType.STRING } },
                                required: ["score", "rationale"]
                            }
                        },
                        required: ["goalClarity", "scopeRealism", "resourceReadiness", "marketTiming", "executionRisk"]
                    },
                    strengths: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                    risks: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                    sprintMap: {
                        type: SchemaType.ARRAY,
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                day: { type: SchemaType.NUMBER },
                                theme: { type: SchemaType.STRING },
                                objective: { type: SchemaType.STRING },
                                tasks: {
                                    type: SchemaType.ARRAY,
                                    items: {
                                        type: SchemaType.OBJECT,
                                        properties: {
                                            task: { type: SchemaType.STRING },
                                            duration: { type: SchemaType.STRING },
                                            priority: { type: SchemaType.STRING }
                                        },
                                        required: ["task", "duration", "priority"]
                                    }
                                },
                                deliverable: { type: SchemaType.STRING }
                            },
                            required: ["day", "theme", "objective", "tasks", "deliverable"]
                        }
                    },
                    launchAssets: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                    launchReadinessVerdict: { type: SchemaType.STRING }
                },
                required: ["projectName", "launchGoal", "currentState", "sprintScore", "scoringBreakdown", "strengths", "risks", "sprintMap", "launchAssets", "launchReadinessVerdict"]
            }
        }
    });

    const systemPrompt = `
    You are WARP, a Launch Node (ID: W) in the Growth Engine Squad of the Platoon system at itsaiagents.online.
    
    MISSION: Accelerate an idea from concept to checkout in 168 hours or less.
    
    TRIGGERS (when to deploy this node):
    - Speed is critical
    - Testing new ideas
    
    CONSTRAINTS (when NOT to use):
    - Quality requires a long timeline
    
    OUTPUTS: 7-Day Sprint Map + Launch Assets
    SECTORS: MVP Launch, Beta Test Setup

    The user has provided their INVENTORY (inputs):
    1. MVP / Product Description: ${answers[0]}
    2. Basic Offer: ${answers[1]}

    Generate a comprehensive 7-Day Sprint Map that takes them from current state to checkout-ready in exactly 7 days.

    Rubric for Sprint Readiness Scoring (0-10 Total):
    - Goal Clarity (0-2): How clear and specific is the launch objective?
    - Scope Realism (0-2): Can this realistically ship in 7 days?
    - Resource Readiness (0-2): Does the user have what they need to execute?
    - Market Timing (0-2): Is there urgency or market signal supporting a fast launch?
    - Execution Risk (0-2): How likely are blockers to derail this sprint?

    For the sprintMap, create EXACTLY 7 days. Each day must have:
    - A theme (e.g., "Foundation Day", "Build Day", "Launch Day")
    - A clear objective
    - 3-5 tasks with realistic durations and priorities (critical/high/medium)
    - A tangible deliverable

    For launchAssets, list 4-6 specific assets they'll have when done (e.g., "Landing page", "Checkout flow", "Email sequence").

    The launchReadinessVerdict should be a 2-3 sentence assessment of their launch readiness.

    The tone should be aggressive, momentum-driven, and biased toward action. No fluff. Ship it.
    Output strictly in JSON format matching the schema provided.
  `;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
        });

        const response = result.response.text();

        if (response) {
            return JSON.parse(response) as SprintReport;
        } else {
            throw new Error("Empty response from WARP Node");
        }
    } catch (error: any) {
        console.error("WARP Sprint Generation Failed:", error);
        throw new Error(`Launch Node Offline: ${error.message || 'Unknown error'}`);
    }
};
