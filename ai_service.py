# backend/ai_service.py
from transformers import pipeline
import torch
device = 0 if torch.cuda.is_available() else (-1 if not torch.backends.mps.is_available() else "mps")
# Use 'text-generation' since it's confirmed available in your error log
summarizer = pipeline("text-generation", model="facebook/bart-large-cnn", device=device)


def summarize_text(text: str) -> str:
    if len(text) < 50:
        return text

    # We provide a clear instruction for the "text-generation" task
    prompt = f"Summarize this developer note in one short sentence: {text}\n\nSummary:"

    result = summarizer(
        prompt,
        max_new_tokens=50,
        do_sample=False,
        num_return_sequences=1,
        truncation=True,
    )

    # Text generation returns the whole prompt + the new text,
    # so we split it to get just the summary part.
    generated_text = result[0]["generated_text"]
    summary = generated_text.split("Summary:")[-1].strip()

    return summary
