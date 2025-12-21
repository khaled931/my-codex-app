import { sql } from '@vercel/postgres';
import { ConsultationRequest } from '@/types';

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS consultation_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        full_name TEXT,
        phone TEXT,
        email TEXT,
        city TEXT,
        message TEXT NOT NULL,
        image_url TEXT,
        status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'replied', 'closed')),
        admin_notes TEXT
      )
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at 
      ON consultation_requests(created_at DESC)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_consultation_requests_status 
      ON consultation_requests(status)
    `;
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export async function createConsultationRequest(
  data: Omit<ConsultationRequest, 'id' | 'created_at' | 'status' | 'admin_notes'>
): Promise<ConsultationRequest> {
  const result = await sql`
    INSERT INTO consultation_requests (full_name, phone, email, city, message, image_url)
    VALUES (${data.full_name}, ${data.phone}, ${data.email}, ${data.city}, ${data.message}, ${data.image_url})
    RETURNING *
  `;
  return result.rows[0] as ConsultationRequest;
}

export async function getAllConsultationRequests(): Promise<ConsultationRequest[]> {
  const result = await sql`
    SELECT * FROM consultation_requests
    ORDER BY created_at DESC
  `;
  return result.rows as ConsultationRequest[];
}

export async function getConsultationRequestById(id: string): Promise<ConsultationRequest | null> {
  const result = await sql`
    SELECT * FROM consultation_requests
    WHERE id = ${id}
  `;
  return result.rows[0] as ConsultationRequest || null;
}

export async function updateConsultationRequest(
  id: string,
  data: Partial<Pick<ConsultationRequest, 'status' | 'admin_notes'>>
): Promise<ConsultationRequest> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (data.status !== undefined) {
    updates.push(`status = $${paramIndex++}`);
    values.push(data.status);
  }
  if (data.admin_notes !== undefined) {
    updates.push(`admin_notes = $${paramIndex++}`);
    values.push(data.admin_notes);
  }

  values.push(id);
  const result = await sql.query(
    `UPDATE consultation_requests SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  
  return result.rows[0] as ConsultationRequest;
}
