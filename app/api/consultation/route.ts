import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { checkRateLimit } from '@/lib/rate-limit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import type { ConsultationRequest } from '@/types';

// In-memory storage (replace with database in production)
const consultationRequests: ConsultationRequest[] = [];

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    
    // Honeypot check
    const honeypot = formData.get('honeypot');
    if (honeypot) {
      // Silent fail for bots
      return NextResponse.json({ id: 'fake-id' }, { status: 200 });
    }

    const fullName = formData.get('full_name') as string || null;
    const phone = formData.get('phone') as string || null;
    const email = formData.get('email') as string || null;
    const city = formData.get('city') as string || null;
    const message = formData.get('message') as string;
    const imageFile = formData.get('image') as File | null;

    // Validate required field
    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message is required and must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Handle image upload
    let imageUrl = null;
    if (imageFile) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads');
      
      // Create uploads directory if it doesn't exist
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const fileName = `${uuidv4()}-${imageFile.name}`;
      const filePath = join(uploadsDir, fileName);
      
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
      
      imageUrl = `/uploads/${fileName}`;
    }

    const consultationRequest: ConsultationRequest = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      full_name: fullName,
      phone,
      email,
      city,
      message: message.trim(),
      image_url: imageUrl,
      status: 'new' as const,
      admin_notes: null,
    };

    // Store in memory (in production, save to database)
    consultationRequests.push(consultationRequest);

    return NextResponse.json({ id: consultationRequest.id }, { status: 201 });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return all requests (for admin, should be protected)
  return NextResponse.json(consultationRequests);
}
