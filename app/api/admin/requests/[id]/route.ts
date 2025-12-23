import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, createAuthResponse } from '@/lib/auth';
import type { ConsultationRequest } from '@/types';

// Import the in-memory storage (workaround - use DB in production)
const getConsultationRequests = async (): Promise<ConsultationRequest[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/consultation`);
  return response.json();
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createAuthResponse();
  }

  try {
    const { id } = await params;
    const requests = await getConsultationRequests();
    const consultationRequest = requests.find((r: ConsultationRequest) => r.id === id);

    if (!consultationRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(consultationRequest);
  } catch (error) {
    console.error('Error fetching request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin authentication
  if (!verifyAdminAuth(request)) {
    return createAuthResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, admin_notes } = body;

    const requests = await getConsultationRequests();
    const requestIndex = requests.findIndex((r: ConsultationRequest) => r.id === id);

    if (requestIndex === -1) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    // Update the request
    if (status) {
      requests[requestIndex].status = status;
    }
    if (admin_notes !== undefined) {
      requests[requestIndex].admin_notes = admin_notes;
    }

    return NextResponse.json(requests[requestIndex]);
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Failed to update request' },
      { status: 500 }
    );
  }
}
