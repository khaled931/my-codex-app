import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, createAuthResponse } from '@/lib/auth';

// Import the in-memory storage (in production, use database)
// This is a workaround to share state - in production use proper DB
const getConsultationRequests = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/consultation`);
  return response.json();
};

export async function GET(request: NextRequest) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createAuthResponse();
  }

  try {
    const requests = await getConsultationRequests();
    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
