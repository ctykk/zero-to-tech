export interface AnalysisResult {
  origin_text: string;
  pin_yin: string[];
  emotion: string;
  emotion_score: number;
}

export interface IdentityResult {
  motto: string;
}
