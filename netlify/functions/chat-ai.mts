import type { Config } from '@netlify/functions'

const SYSTEM_PROMPT =
  'You are ACA (Autonomous Compliance Assistant), an expert AI tax and statutory compliance assistant. ' +
  'You specialize in Canada (CRA T1/T2, RRSP, GST/HST, T1135 cross-border), USA (IRS 1040, W2, 1099, state taxes), ' +
  'and India (18% GST with CGST/SGST split and ₹5 Lakhs threshold). ' +
  'Provide direct, professional, clear, and actionable tax advice in bullet points or short paragraphs.'

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ status: 'error', message: 'Method not allowed' }, { status: 405 })
  }

  const apiKey = process.env.GROQ_API_KEY?.trim()
  if (!apiKey) {
    return Response.json({ status: 'error', message: 'GROQ_API_KEY is not configured.' }, { status: 500 })
  }

  const body = await req.json().catch(() => null)
  const userMessage = body?.message
  if (!userMessage) {
    return Response.json({ status: 'error', message: 'message is required.' }, { status: 400 })
  }

  try {
    const groqResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.5,
        max_tokens: 512,
      }),
    })

    if (!groqResp.ok) {
      const errText = await groqResp.text()
      return Response.json(
        { status: 'error', message: `Groq API Error (${groqResp.status}): ${errText}` },
        { status: 502 },
      )
    }

    const data = await groqResp.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) {
      return Response.json({ status: 'error', message: 'Empty response received from Groq Llama AI engine.' }, { status: 502 })
    }

    return Response.json({ status: 'success', reply, model: 'Groq Llama-3.3 70B' })
  } catch (err) {
    return Response.json({ status: 'error', message: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/chat-ai',
  method: 'POST',
}
