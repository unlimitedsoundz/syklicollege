import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { formatDateToWords } from '@/utils/word-converter';

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '2pt solid #000',
        paddingBottom: 20,
        marginBottom: 30,
        marginLeft: 0,
        paddingLeft: 0,
    },
    logo: {
        width: 120,
    },
    collegeInfo: {
        textAlign: 'right',
        fontSize: 8,
        color: '#666',
    },
    collegeName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    dateIssue: {
        marginBottom: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        width: 120,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    content: {
        marginTop: 20,
        textAlign: 'justify',
    },
    offerStatement: {
        marginBottom: 15,
    },
    instructions: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderLeft: '3pt solid #000',
    },
    instructionTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform: 'uppercase',
        fontSize: 9,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        right: 50,
        borderTop: '1pt solid #eee',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 8,
        color: '#999',
    },
    signatureSection: {
        marginTop: 40,
    },
    signatureImage: {
        width: 150,
        marginBottom: 5,
    },
    signOff: {
        fontWeight: 'bold',
        marginTop: 10,
    }
});

interface OfferLetterProps {
    data: {
        full_name: string;
        student_id: string;
        date_of_birth: string;
        program: string;
        school: string;
        course: string;
        program_length: string;
        total_ects: number;
        issue_date: string;
        tuition_fee?: number;
        payment_deadline?: string;
        offer_type?: 'DEPOSIT' | 'FULL_TUITION' | 'FIRST_YEAR' | 'FULL_PROGRAM';
        discount_amount?: number;
        logo_path?: string;
        signature_path?: string;
    }
}

export const OfferLetterPDF = ({ data }: OfferLetterProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {data.logo_path && (
                        <Image
                            src={data.logo_path}
                            style={styles.logo}
                        />
                    )}
                </View>
                <View style={styles.collegeInfo}>
                    <Text style={styles.collegeName}>SYKLI College</Text>
                    <Text>Pohjoisesplanadi 51</Text>
                    <Text>00150 Helsinki, Uusimaa</Text>
                    <Text>Finland</Text>
                    <Text>admissions@syklicollege.fi</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Letter of Offer</Text>

            {/* Date of Issue */}
            <View style={styles.section}>
                <Text style={styles.dateIssue}>Date of Issue: {data.issue_date}</Text>
            </View>

            {/* Student Details */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Full Name:</Text>
                    <Text>{data.full_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Student ID:</Text>
                    <Text>{data.student_id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Date of Birth:</Text>
                    <Text>{formatDateToWords(data.date_of_birth)}</Text>
                </View>
            </View>

            {/* Programme Information */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Programme Title:</Text>
                    <Text>{data.program}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>School / Faculty:</Text>
                    <Text>{data.school}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Course:</Text>
                    <Text>{data.course}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Programme Duration:</Text>
                    <Text>{data.program_length}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Total Credits (ECTS):</Text>
                    <Text>{data.total_ects}</Text>
                </View>
            </View>

            {/* Financial Terms */}
            {data.tuition_fee && (
                <View style={[styles.section, { borderTop: '1pt solid #eee', paddingTop: 10, marginTop: 10 }]}>
                    <Text style={[styles.label, { marginBottom: 5, fontSize: 10, textTransform: 'uppercase' }]}>Financial Terms & Requirements</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tuition Payment Plan:</Text>
                        <Text>{data.offer_type === 'FULL_PROGRAM' ? 'Full Programme Degree (All Years)' : 'Initial Year Tuition'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Amount Due:</Text>
                        <Text>€{data.tuition_fee.toLocaleString()} EUR</Text>
                    </View>
                    {data.discount_amount && data.discount_amount > 0 ? (
                        <View style={styles.row}>
                            <Text style={styles.label}>Early Payment Discount:</Text>
                            <Text>€{data.discount_amount.toLocaleString()} EUR Applied</Text>
                        </View>
                    ) : null}
                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Deadline:</Text>
                        <Text>{data.payment_deadline ? formatDateToWords(data.payment_deadline) : 'As per portal'}</Text>
                    </View>
                </View>
            )}

            {/* Offer Statement */}
            <View style={styles.content}>
                <Text style={styles.offerStatement}>
                    We are pleased to inform you that, following a comprehensive review of your application, you have been offered admission to the above-mentioned programme at SYKLI College.
                </Text>
                <Text style={styles.offerStatement}>
                    This offer constitutes formal notification of your provisional acceptance into the programme, subject to your acceptance of this offer and compliance with all academic, administrative, and regulatory requirements of SYKLI College.
                </Text>
                <Text style={styles.offerStatement}>
                    The programme is designed to provide a rigorous academic and practical foundation aligned with industry and professional standards. Upon successful completion of the programme, you will be awarded the appropriate qualification in accordance with the academic regulations of SYKLI College and the relevant educational authorities.
                </Text>
                <Text style={styles.offerStatement}>
                    This offer is valid only for the specified intake and is conditional upon the accuracy and completeness of the information provided in your application.
                </Text>
            </View>

            {/* Acceptance Instructions */}
            <View style={styles.instructions}>
                <Text style={styles.instructionTitle}>Acceptance Instructions</Text>
                <Text>• The student must accept the offer via the student portal.</Text>
                <Text>• Students must adhere to the SYKLI College Code of Conduct.</Text>
                <Text>• Acceptance deadline applies.</Text>
                <Text>• Failure to accept results in automatic withdrawal.</Text>
                <Text>• Refund requests are subject to the official Refund & Withdrawal Policy.</Text>
                <Text>• Rejection permanently closes the application.</Text>
            </View>

            {/* Closing & Signature */}
            <View style={styles.signatureSection}>
                <Image
                    src={data.signature_path}
                    style={styles.signatureImage}
                />
                <Text style={styles.signOff}>Admissions Office</Text>
                <Text>SYKLI College</Text>
            </View>
        </Page>
    </Document>
);
