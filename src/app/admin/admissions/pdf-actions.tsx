'use server';

import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { createAdminClient } from '@/utils/supabase/admin';
import { OfferLetterPDF } from '@/components/admin/OfferLetterPDF';
import { format } from 'date-fns';
import path from 'path';
import fs from 'fs';

export async function generateAndStoreOfferLetter(applicationId: string) {
    const supabase = createAdminClient();

    // 1. Fetch all required data for the letter
    const { data: app, error: appError } = await supabase
        .from('applications')
        .select(`
            *,
            course:Course(*, school:School(name)),
            user:profiles(*),
            offer:admission_offers(*)
        `)
        .eq('id', applicationId)
        .single();

    if (appError || !app) {
        console.error('Error fetching app data for PDF:', appError);
        throw new Error('Failed to fetch application data');
    }

    const { user, course } = app;
    const personalInfo = app.personal_info || {};
    const currentOffer = app.offer?.[0]; // Get the latest offer

    // 2. Read images and convert to base64 (React-PDF requires base64 for server-side rendering)
    const logoPath = path.join(process.cwd(), 'public', 'images', 'sykli-logo-official.png');
    const signaturePath = path.join(process.cwd(), 'public', 'images', 'official-signature.png');

    const logoBuffer = fs.readFileSync(logoPath);
    const signatureBuffer = fs.readFileSync(signaturePath);

    const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
    const signatureBase64 = `data:image/png;base64,${signatureBuffer.toString('base64')}`;

    console.log('[PDF] Logo base64 created, length:', logoBase64.length);
    console.log('[PDF] Signature base64 created, length:', signatureBase64.length);

    const letterData = {
        full_name: `${user.first_name} ${user.last_name}`,
        student_id: user.student_id || 'N/A',
        date_of_birth: user.date_of_birth || personalInfo.dateOfBirth || '2000-01-01',
        program: course.title,
        school: course.school?.name || 'Academic Faculty',
        course: course.title,
        program_length: course.duration || '2 Years – Full-Time',
        total_ects: course.credits || 120,
        issue_date: format(new Date(), 'd MMMM yyyy'),
        tuition_fee: currentOffer?.tuition_fee,
        payment_deadline: currentOffer?.payment_deadline,
        offer_type: currentOffer?.offer_type,
        discount_amount: currentOffer?.discount_amount,
        logo_path: logoBase64,
        signature_path: signatureBase64
    };


    // 3. Generate PDF Buffer
    try {
        console.log('[PDF] Rendering PDF with React-PDF...');
        const buffer = await renderToBuffer(<OfferLetterPDF data={letterData} />);
        console.log('[PDF] PDF rendered, buffer size:', buffer.byteLength, 'bytes');

        // 3. Upload to Supabase Storage
        // Filename: {user_id}/{application_id}_offer_letter.pdf
        const filePath = `${user.id}/${applicationId}_offer_letter.pdf`;

        console.log('[PDF] Uploading to storage:', filePath);

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('offer-letters')
            .upload(filePath, buffer, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (uploadError) {
            console.error('Error uploading PDF:', uploadError);
            throw new Error(`Failed to upload offer letter: ${uploadError.message}`);
        }

        console.log('[PDF] Upload successful!', uploadData);

        // 4. Get Public URL with cache-busting timestamp
        const { data: { publicUrl } } = supabase.storage
            .from('offer-letters')
            .getPublicUrl(filePath);

        // Add timestamp to bust Supabase CDN cache
        const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;
        console.log('[PDF] Public URL with cache buster:', cacheBustedUrl);

        // 5. Create/Update record in 'admissions' table
        const { error: admissionError } = await supabase
            .from('admissions')
            .upsert({
                user_id: user.id,
                student_id: user.student_id || 'N/A',
                full_name: letterData.full_name,
                date_of_birth: letterData.date_of_birth,
                program: letterData.program,
                school: letterData.school,
                course: letterData.course,
                program_length: letterData.program_length,
                total_ects: letterData.total_ects,
                offer_letter_url: cacheBustedUrl,  // Use cache-busted URL
                decision_date: new Date().toISOString(),
                // SYNC FINANCIALS
                tuition_fee: currentOffer?.tuition_fee,
                payment_deadline: currentOffer?.payment_deadline,
                offer_type: currentOffer?.offer_type,
                discount_amount: currentOffer?.discount_amount || 0
            }, {
                onConflict: 'user_id, program'
            });

        if (admissionError) {
            console.error('Error updating admissions table:', admissionError);
            throw new Error(`Failed to update admissions record: ${admissionError.message}`);
        }

        return { success: true, url: publicUrl, path: filePath };
    } catch (error: any) {
        console.error('PDF Generation Error:', error);
        throw error;
    }
}
