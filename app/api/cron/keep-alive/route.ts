import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  // Verify authorization header if CRON_SECRET is set
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey);

    // Perform a lightweight query to prevent auto-pause on Supabase Free Tier
    const startTime = Date.now();
    const { data, error } = await supabase.from('site_content').select('key').limit(1);
    const durationMs = Date.now() - startTime;

    if (error) {
      console.error('Supabase keep-alive ping error:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase ping keep-alive successful',
      durationMs,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Supabase keep-alive exception:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
