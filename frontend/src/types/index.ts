export interface PinyinChar {
  char: string;
  pinyin: string | null;
}

export interface AnalysisResult {
  pinyin: PinyinChar[];
  emotion: string;
  emotion_score: number;
}

export interface IdentityResult {
  motto: string;
}
