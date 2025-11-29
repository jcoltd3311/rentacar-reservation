
'use client';

import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import styles from './ContractModal.module.css';

const ContractContent = ({ booking, signature }) => {
    const contractUrl = `https://your-domain.com/contracts/${booking.id}`;
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    QRCode.toDataURL(contractUrl, { width: 80 }, (err, url) => {
        if (err) console.error(err);
        setQrCodeUrl(url);
    });

    return (
        <div className={styles.contractSheet}>
            <header className={styles.contractHeader}>
                <h1>レンタカー契約書</h1>
                <div className={styles.headerInfo}>
                    <span>契約書番号: {booking.id}-C01</span>
                    <span>発行日: {new Date().toLocaleDateString('ja-JP')}</span>
                </div>
            </header>

            <section className={styles.customerInfo}>
                <h2 className={styles.sectionTitle}>お客様情報</h2>
                <p className={styles.paragraph}><strong>氏名:</strong> {booking.customerName}</p>
                <p className={styles.paragraph}><strong>連絡先:</strong> TEL: 090-XXXX-XXXX (仮)</p>
            </section>

            <section className={styles.bookingDetails}>
                <h2 className={styles.sectionTitle}>ご予約内容</h2>
                <p className={styles.paragraph}><strong>車両:</strong> {booking.vehicleName}</p>
                <p className={styles.paragraph}><strong>ご利用期間:</strong></p>
                <p className={`${styles.paragraph} ${styles.period}`}>{booking.startDate} 〜 {booking.endDate}</p>
                <p className={styles.paragraph}><strong>基本料金:</strong> {booking.totalPrice.toLocaleString()}円 (税込)</p>
            </section>

            <section className={styles.terms}>
                <h2 className={styles.sectionTitle}>主要な貸渡条件</h2>
                <ul>
                    <li>車両の運転は、許可された運転者のみに限られます。</li>
                    <li>車両は禁煙です。違反が確認された場合、清掃費用を申し受けます。</li>
                    <li>燃料は満タンでご返却ください。</li>
                    <li>契約時間を超過した場合は、別途延長料金が発生します。</li>
                </ul>
            </section>

            <footer className={styles.contractFooter}>
                <div className={styles.signatureArea}>
                    <h2 className={styles.sectionTitle}>電子署名</h2>
                    {signature ? (
                        <div className={styles.signatureBox}>
                            <p className={`${styles.paragraph} ${styles.signedText}`}>署名済み: {booking.customerName}</p>
                            <p className={`${styles.paragraph} ${styles.signatureDate}`}>署名日時: {new Date(signature).toLocaleString('ja-JP')}</p>
                        </div>
                    ) : (
                        <div className={styles.signaturePlaceholder}>
                            <p className={styles.paragraph}>上記内容に同意し、署名します。</p>
                            <div className={styles.placeholderBox}>署名欄</div>
                        </div>
                    )}
                </div>
                <div className={styles.companyInfo}>
                    <p className={styles.paragraph}><strong>株式会社 NextRent</strong></p>
                    <p className={styles.paragraph}>東京都新宿区XXXX-XX-XX</p>
                    <p className={styles.paragraph}>TEL: 03-XXXX-XXXX</p>
                </div>
                {qrCodeUrl && <img src={qrCodeUrl} alt="Contract QR Code" className={styles.qrCode} />}
            </footer>
        </div>
    );
};

export default function ContractModal({ booking, onClose }) {
    const pdfRef = useRef();
    const [signature, setSignature] = useState(null);
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = () => {
        setSignature(Date.now());
        setIsSigned(true);
    };

    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4'
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
            const canvasFinalWidth = canvasWidth * ratio;
            const canvasFinalHeight = canvasHeight * ratio;
            const marginX = (pdfWidth - canvasFinalWidth) / 2;
            const marginY = (pdfHeight - canvasFinalHeight) / 2;
            
            pdf.addImage(imgData, 'PNG', marginX, marginY, canvasFinalWidth, canvasFinalHeight);
            pdf.save(`契約書_${booking.id}.pdf`);
        });
    };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3>契約書プレビュー</h3>
                    <button onClick={onClose} className={styles.closeButton}>×</button>
                </div>

                <div className={styles.pdfPreview} ref={pdfRef}>
                    <ContractContent booking={booking} signature={signature} />
                </div>

                <div className={styles.modalActions}>
                    {!isSigned ? (
                        <button onClick={handleSign} className={styles.signButton}>電子署名する</button>
                    ) : (
                        <span className={styles.signedMessage}>✓ 署名が完了しました</span>
                    )}
                    <button onClick={downloadPdf} className={styles.downloadButton}>PDFダウンロード</button>
                </div>
            </div>
        </div>
    );
}
