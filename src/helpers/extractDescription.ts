interface EditorOutput {
  blocks: EditorBlock[];
}

interface EditorBlock {
  id: string;
  type: string;
  data: {
    text: string;
  };
}

const isEditorOutput = (value: unknown): value is EditorOutput =>
  typeof value === "object" &&
  value !== null &&
  "blocks" in value &&
  Array.isArray(value.blocks);

export function extractDescription(raw: string): string | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    const description = isEditorOutput(parsed)
      ? parsed.blocks[0]?.data?.text
      : null;
    return description || null;
  } catch {
    return null;
  }
}
