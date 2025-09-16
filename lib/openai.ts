import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// ──────────────────────────────────────────────────────────────────────────────
// 전역(싱글톤) OpenAI 클라이언트
// NOTE: 환경변수 이름은 OPENAI_API_KEY 입니다 (OPEN_API_KEY 아님)
// ──────────────────────────────────────────────────────────────────────────────
if (!process.env.OPENAI_API_KEY) {
  // 런타임에서 키가 비어 있으면 바로 발견되도록 에러를 던집니다.
  throw new Error("Missing OPENAI_API_KEY env variable");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// ──────────────────────────────────────────────────────────────────────────────
// 타입: Responses API 입력 메시지 형태
// 서브지침 / 유저의 input / ai의 이전대화 기억시켜 학습
// ──────────────────────────────────────────────────────────────────────────────
export type RoleMessage = ChatCompletionMessageParam;

// ──────────────────────────────────────────────────────────────────────────────
// 범용 헬퍼: responses.create() 래퍼
//  - input: 문자열 | role 배열 | (단일 role 객체도 허용하고 자동 배열화)
//  - 자주 쓰는 옵션을 한 곳에서 관리하려고 만듭니다.
// ──────────────────────────────────────────────────────────────────────────────
export interface CreateResponseOptions {
  model?: string;                 // 모델 (기본: gpt-4o-mini)
  instructions?: string;          // 지침(system) 메인지침입니다.
  input: string | RoleMessage[] | RoleMessage; // 유저 입력
  temperature?: number;           // 창의성 정도 (낮을수록 좋음)
  max_output_tokens?: number;     // 응답 토큰 상한
  top_p?: number;                 // 샘플링
  response_format?: any;          // JSON 스키마 강제 등 고급 포맷 옵션
  metadata?: Record<string, any>; // 추적용 메타데이터
}

//인풋이 잘못들어와도 AI를 이해시키기 위해 변환해주는 보호장치
function normalizeInput(input: CreateResponseOptions["input"]): ChatCompletionMessageParam[] {
  if (typeof input === "string") {
    return [{ role: "user", content: input }];
  }

  if (Array.isArray(input)) {
    return input;
  }

  if (typeof input === "object" && input !== null && "role" in input && "content" in input) {
    return [input as ChatCompletionMessageParam];
  }

  // fallback: convert unknown types to user message
  return [{ role: "user", content: String(input) }];
}

//opts를 통해 기본값을 지정해 input만 받아도 되게 설정
export async function createResponse(opts: CreateResponseOptions) {
  const {
    model = "gpt-4o-mini",
    instructions,
    input,
    temperature = 0.7,
    max_output_tokens,
    top_p = 0.8,
    response_format,
    metadata,
  } = opts;

  const res = await openai.chat.completions.create({
    model,
    messages: [
      ...(instructions ? [{ role: "system" as const, content: instructions }] : []),
      ...normalizeInput(input),
    ],
    temperature,
    top_p,
    max_tokens: max_output_tokens,
    response_format,
    metadata,
  });

  return res;
}