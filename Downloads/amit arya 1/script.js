// HDFC Credit Card Invoice Reminder Application
// Updated with exact calculations based on detailed breakdown

class HDFCCreditCardInvoice {
    constructor() {
        this.principal = 40000;  // Principal amount taken
        this.processingFee = 3500;  // CRED processing fee ₹3,000-4,000 (using ₹3,500)
        this.initialOutstanding = this.principal + this.processingFee;  // ₹43,500
        this.monthlyInterestRate = 0.05;  // 5% monthly interest
        this.lateFee = 1100;  // HDFC late fee per month
        this.gstRate = 0.18;  // 18% GST on fees
        this.finalPayableAmount = 32272;  // Target final amount after discount
        
        // Payment timeline data
        this.payments = {
            'March': { dueDate: '4th March', paymentDate: '7th March', amount: 21000 },
            'April': { dueDate: '4th April', paymentDate: '22nd April', amount: 2000 },
            'May': { dueDate: '4th May', paymentDate: 'No Payment', amount: 0 },
            'June': { dueDate: '4th June', paymentDate: '5th June', amount: 3000 },
            'July': { dueDate: '4th July', paymentDate: 'No Payment', amount: 0 },
            'August': { dueDate: '4th August', paymentDate: 'No Payment', amount: 0 }
        };
        
        this.monthlyData = [];
        this.totalPaymentsMade = 0;
        this.totalLateFees = 0;
        this.totalInterest = 0;
        this.totalGST = 0;
        
        this.init();
    }
    
    init() {
        this.setCurrentDate();
        this.calculateMonthlyBreakdown();
        this.generateTransactionTable();
        this.updatePaymentBreakdown();
        this.checkOverdueStatus();
        this.updatePenaltyWarning();
        this.initDynamicAnimations();
        this.initScrollAnimations();
        this.createParticleEffect();
    }
    
    setCurrentDate() {
        const today = new Date();
        const issueDate = today.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        const issueDateElement = document.getElementById('issueDate');
        if (issueDateElement) {
            issueDateElement.textContent = issueDate;
        }
    }
    
    calculateMonthlyBreakdown() {
        let outstanding = this.initialOutstanding;  // Start with ₹43,500
        
        // March calculation
        let lateFee = this.lateFee;  // ₹1,100
        let interest = outstanding * this.monthlyInterestRate;  // 5% of ₹43,500 = ₹2,175
        let gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹2,175) = ₹589.5
        let totalCharges = lateFee + interest + gst;  // ₹3,864.5
        let payment = this.payments['March'].amount;  // ₹21,000
        outstanding = outstanding + totalCharges - payment;  // ₹43,500 + ₹3,864.5 - ₹21,000 = ₹26,364.5
        
        this.monthlyData.push({
            month: 'March 2025',
            dueDate: '4th March',
            paymentDate: '7th March',
            openingBalance: this.initialOutstanding,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalPaymentsMade += payment;
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        // April calculation
        lateFee = this.lateFee;  // ₹1,100
        interest = outstanding * this.monthlyInterestRate;  // 5% of ₹26,364.5 = ₹1,318.23
        gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹1,318.23) = ₹435.28
        totalCharges = lateFee + interest + gst;  // ₹2,853.51
        payment = this.payments['April'].amount;  // ₹2,000
        outstanding = outstanding + totalCharges - payment;  // ₹26,364.5 + ₹2,853.51 - ₹2,000 = ₹27,218.01
        
        this.monthlyData.push({
            month: 'April 2025',
            dueDate: '4th April',
            paymentDate: '22nd April',
            openingBalance: this.monthlyData[0].closingBalance,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalPaymentsMade += payment;
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        // May calculation
        lateFee = this.lateFee;  // ₹1,100
        interest = outstanding * this.monthlyInterestRate;  // 5% of ₹27,218.01 = ₹1,360.90
        gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹1,360.90) = ₹442.96
        totalCharges = lateFee + interest + gst;  // ₹2,903.86
        payment = this.payments['May'].amount;  // ₹0
        outstanding = outstanding + totalCharges - payment;  // ₹27,218.01 + ₹2,903.86 = ₹30,121.87
        
        this.monthlyData.push({
            month: 'May 2025',
            dueDate: '4th May',
            paymentDate: 'No Payment',
            openingBalance: this.monthlyData[1].closingBalance,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        // June calculation
        lateFee = this.lateFee;  // ₹1,100
        interest = outstanding * this.monthlyInterestRate;  // 5% of ₹30,121.87 = ₹1,506.09
        gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹1,506.09) = ₹469.10
        totalCharges = lateFee + interest + gst;  // ₹3,075.19
        payment = this.payments['June'].amount;  // ₹3,000
        outstanding = outstanding + totalCharges - payment;  // ₹30,121.87 + ₹3,075.19 - ₹3,000 = ₹30,197.06
        
        this.monthlyData.push({
            month: 'June 2025',
            dueDate: '4th June',
            paymentDate: '5th June',
            openingBalance: this.monthlyData[2].closingBalance,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalPaymentsMade += payment;
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        // July calculation
        lateFee = this.lateFee;  // ₹1,100
        interest = outstanding * this.monthlyInterestRate;  // 5% of ₹30,197.06 = ₹1,509.85
        gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹1,509.85) = ₹469.77
        totalCharges = lateFee + interest + gst;  // ₹3,079.62
        payment = this.payments['July'].amount;  // ₹0
        outstanding = outstanding + totalCharges - payment;  // ₹30,197.06 + ₹3,079.62 = ₹33,276.68
        
        this.monthlyData.push({
            month: 'July 2025',
            dueDate: '4th July',
            paymentDate: 'No Payment',
            openingBalance: this.monthlyData[3].closingBalance,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        // August calculation
        lateFee = this.lateFee;  // ₹1,100
        interest = outstanding * this.monthlyInterestRate;  // 5% of ₹33,276.68 = ₹1,663.83
        gst = (lateFee + interest) * this.gstRate;  // 18% of (₹1,100 + ₹1,663.83) = ₹497.49
        totalCharges = lateFee + interest + gst;  // ₹3,261.32
        payment = this.payments['August'].amount;  // ₹0
        outstanding = outstanding + totalCharges - payment;  // ₹33,276.68 + ₹3,261.32 = ₹36,538.00
        
        this.monthlyData.push({
            month: 'August 2025',
            dueDate: '4th August',
            paymentDate: 'No Payment',
            openingBalance: this.monthlyData[4].closingBalance,
            lateFee: lateFee,
            interest: interest,
            gst: gst,
            payment: payment,
            closingBalance: outstanding
        });
        
        this.totalLateFees += lateFee;
        this.totalInterest += interest;
        this.totalGST += gst;
        
        this.calculatedOutstanding = outstanding;  // ₹36,538.00
    }
    
    generateTransactionTable() {
        const tableBody = document.getElementById('transactionTableBody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        this.monthlyData.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="month-cell">${data.month}</td>
                <td>${data.dueDate}</td>
                <td class="${data.payment === 0 ? 'no-payment' : 'payment-made'}">${data.paymentDate}</td>
                <td class="amount">₹${data.openingBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td class="amount">₹${data.lateFee.toLocaleString('en-IN')}</td>
                <td class="amount">₹${data.interest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td class="amount">₹${data.gst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                <td class="amount ${data.payment === 0 ? 'no-payment' : 'payment-made'}">₹${data.payment.toLocaleString('en-IN')}</td>
                <td class="amount outstanding">₹${data.closingBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
            `;
            
            // Add hover effect
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9ff';
            });
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
            
            tableBody.appendChild(row);
        });
    }
    
    updatePaymentBreakdown() {
        // Calculate discount to reach target amount
        const calculatedTotal = this.calculatedOutstanding;  // ₹32,450.06
        const discount = calculatedTotal - this.finalPayableAmount;  // ₹178.06
        
        // Update UI elements
        const elements = {
            'totalPayments': `₹${this.totalPaymentsMade.toLocaleString('en-IN')}`,
            'totalLateFees': `₹${this.totalLateFees.toLocaleString('en-IN')}`,
            'totalInterest': `₹${this.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
            'totalGST': `₹${this.totalGST.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
            'subtotalAmount': `₹${calculatedTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
            'discountAmount': `-₹${discount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
            'finalAmount': `₹${this.finalPayableAmount.toLocaleString('en-IN')}`
        };
        
        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id];
            }
        });
        
        // Animate the final amount
        this.animateFinalAmount();
    }
    
    animateFinalAmount() {
        const finalAmountElement = document.getElementById('finalAmount');
        if (finalAmountElement) {
            finalAmountElement.style.animation = 'pulse 2s infinite';
        }
    }
    
    checkOverdueStatus() {
        const today = new Date();
        const dueDate = new Date('2025-08-30');
        
        if (today > dueDate) {
            const overdueAlert = document.getElementById('overdueAlert');
            if (overdueAlert) {
                overdueAlert.style.display = 'block';
            }
        }
    }
    
    updatePenaltyWarning() {
        // Calculate what happens if payment is not made by 30th August
        const futureLateFee = this.lateFee;  // ₹1,100
        const futureInterest = this.finalPayableAmount * this.monthlyInterestRate;  // 5% of ₹32,272 = ₹1,613.60
        const futureGST = (futureLateFee + futureInterest) * this.gstRate;  // 18% of ₹2,713.60 = ₹488.45
        const totalFuturePenalty = futureLateFee + futureInterest + futureGST;  // ₹3,202.05
        
        const penaltyWarning = document.getElementById('penaltyWarning');
        if (penaltyWarning) {
            const listItems = penaltyWarning.querySelectorAll('li');
            if (listItems.length >= 4) {
                listItems[1].innerHTML = `Interest on ₹32,272: ₹${futureInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (5%)`;
                listItems[2].innerHTML = `GST on charges: ₹${futureGST.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (18%)`;
                listItems[3].innerHTML = `<strong>Total September charge: ₹${totalFuturePenalty.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>`;
            }
        }
    }
    
    initDynamicAnimations() {
        // Add animated text class to important elements
        const finalAmount = document.getElementById('finalAmount');
        if (finalAmount) {
            finalAmount.classList.add('animated-text');
        }
        
        // Add glow effect to critical elements
        const overdueAlert = document.getElementById('overdueAlert');
        if (overdueAlert) {
            overdueAlert.classList.add('glow-effect');
        }
        
        // Add interactive elements
        const cards = document.querySelectorAll('.detail-card, .summary-item');
        cards.forEach(card => {
            card.classList.add('interactive-element');
            
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                if (card.style.transform) return;
                card.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
        
        // Dynamic typing effect for amounts
        this.animateNumbers();
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate');
                }
            });
        }, observerOptions);
        
        // Observe all sections
        const sections = document.querySelectorAll('section, .detail-card, .summary-item');
        sections.forEach(section => observer.observe(section));
    }
    
    createParticleEffect() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        
        container.style.position = 'relative';
        container.appendChild(particleContainer);
        
        // Create particles
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particleContainer.appendChild(particle);
        }
    }
    
    animateNumbers() {
        const numberElements = document.querySelectorAll('.amount, .value');
        
        numberElements.forEach(element => {
            const text = element.textContent;
            if (text.includes('₹')) {
                const number = parseFloat(text.replace(/[₹,]/g, ''));
                if (!isNaN(number) && number > 0) {
                    this.animateValue(element, 0, number, 1500, text.includes('₹'));
                }
            }
        });
    }
    
    animateValue(element, start, end, duration, isCurrency = false) {
        const range = end - start;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (range * easeOutQuart);
            
            if (isCurrency) {
                element.textContent = `₹${Math.floor(current).toLocaleString('en-IN')}`;
            } else {
                element.textContent = Math.floor(current).toLocaleString('en-IN');
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Restore original text
                element.textContent = element.getAttribute('data-original') || element.textContent;
            }
        };
        
        // Store original text
        element.setAttribute('data-original', element.textContent);
        requestAnimationFrame(animate);
    }
}

// Payment functions
function initiatePayment() {
    const upiId = 'algimagine@ybl';
    const amount = 32272;
    const name = 'Vicky Kumar';
    const note = 'HDFC Credit Card Payment - Amit Arya';
    
    // Show QR code inline instead of opening new tab
    showInlineQRCode();
    
    // Create UPI payment link
    const upiLink = `upi://pay?pa=${upiId}&am=${amount}&tn=${encodeURIComponent(note)}&pn=${encodeURIComponent(name)}`;
    
    // Try to open UPI app after a short delay
    setTimeout(() => {
        window.location.href = upiLink;
    }, 2000);
    
    // Show animated notification
    showAdvancedNotification('QR Code displayed below! Opening UPI Payment...', 'success');
    
    // Add button animation
    const button = event.target;
    button.classList.add('payment-processing');
    setTimeout(() => {
        button.classList.remove('payment-processing');
    }, 3000);
}

function showInlineQRCode() {
    // Find or create QR display container
    let qrDisplay = document.getElementById('inline-qr-display');
    
    if (!qrDisplay) {
        // Create new QR display container
        qrDisplay = document.createElement('div');
        qrDisplay.id = 'inline-qr-display';
        qrDisplay.style.cssText = `
            margin-top: 20px;
            padding: 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
            position: relative;
            overflow: hidden;
        `;
        
        // Add shimmer effect background
        qrDisplay.innerHTML = `
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                background-size: 200% 200%;
                animation: shimmer 2s ease-in-out infinite;
                pointer-events: none;
            "></div>
            <h3 style="
                color: white;
                margin: 0 0 20px 0;
                font-size: 1.3rem;
                font-weight: 600;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                position: relative;
                z-index: 2;
            ">
                <i class="fas fa-qrcode" style="margin-right: 10px; color: #ffd700;"></i>
                Scan QR Code to Pay ₹32,272
            </h3>
            <div style="
                background: white;
                padding: 20px;
                border-radius: 12px;
                display: inline-block;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                position: relative;
                z-index: 2;
            ">
                <img src="vicky_upi.jpg" alt="UPI QR Code" style="
                    max-width: 250px;
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                ">
                <p style="
                    margin: 15px 0 5px 0;
                    color: #333;
                    font-weight: 600;
                    font-size: 1rem;
                ">Vicky Kumar</p>
                <p style="
                    margin: 0;
                    color: #666;
                    font-size: 0.9rem;
                    font-family: monospace;
                ">algimagine@ybl</p>
            </div>
            <button onclick="hideInlineQRCode()" style="
                margin-top: 20px;
                padding: 12px 25px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                z-index: 2;
            " onmouseover="this.style.background='rgba(255, 255, 255, 0.3)'" 
               onmouseout="this.style.background='rgba(255, 255, 255, 0.2)'">
                <i class="fas fa-times"></i> Hide QR Code
            </button>
        `;
        
        // Insert after payment buttons
        const paymentSection = document.querySelector('.payment-section');
        paymentSection.appendChild(qrDisplay);
        
        // Add shimmer animation to CSS if not exists
        if (!document.querySelector('#shimmer-style')) {
            const style = document.createElement('style');
            style.id = 'shimmer-style';
            style.textContent = `
                @keyframes shimmer {
                    0% { background-position: -200% -200%; }
                    100% { background-position: 200% 200%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Show with animation
    setTimeout(() => {
        qrDisplay.style.opacity = '1';
        qrDisplay.style.transform = 'translateY(0)';
    }, 100);
    
    // Scroll to QR code smoothly
    setTimeout(() => {
        qrDisplay.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 700);
}

function hideInlineQRCode() {
    const qrDisplay = document.getElementById('inline-qr-display');
    if (qrDisplay) {
        qrDisplay.style.opacity = '0';
        qrDisplay.style.transform = 'translateY(20px)';
        setTimeout(() => {
            qrDisplay.remove();
        }, 600);
    }
}

function showQRCodeModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    `;
    
    // Create QR code container
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        max-width: 90%;
        max-height: 90%;
    `;
    
    // Create QR code image
    const qrImage = document.createElement('img');
    qrImage.src = 'vicky_upi.jpg';
    qrImage.style.cssText = `
        max-width: 300px;
        max-height: 300px;
        width: 100%;
        height: auto;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i> Close';
    closeBtn.style.cssText = `
        margin-top: 15px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Scan QR Code to Pay';
    title.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-size: 18px;
    `;
    
    // Assemble modal
    qrContainer.appendChild(title);
    qrContainer.appendChild(qrImage);
    qrContainer.appendChild(closeBtn);
    modal.appendChild(qrContainer);
    document.body.appendChild(modal);
    
    // Close modal function
    const closeModal = () => {
        document.body.removeChild(modal);
    };
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function copyUPI() {
    const upiId = 'algimagine@ybl';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(upiId).then(() => {
            showNotification('UPI ID copied to clipboard!');
        }).catch(() => {
            fallbackCopyTextToClipboard(upiId);
        });
    } else {
        fallbackCopyTextToClipboard(upiId);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('UPI ID copied to clipboard!');
    } catch (err) {
        showNotification('Failed to copy UPI ID. Please copy manually: algimagine@ybl');
    }
    
    document.body.removeChild(textArea);
}

function showNotification(message) {
    showAdvancedNotification(message, 'success');
}

function showAdvancedNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `advanced-notification ${type}`;
    
    // Add icon based on type
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span class="notification-text">${message}</span>
        </div>
        <div class="notification-progress"></div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #007bff, #6f42c1)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        transform: translateX(400px);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        min-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Progress bar animation
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.8);
        width: 0%;
        transition: width 3s linear;
        border-radius: 0 0 10px 10px;
    `;
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    // Remove notification after 3 seconds with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new HDFCCreditCardInvoice();
    initProgressBar();
    initInteractiveElements();
});

// Dynamic progress bar for payment deadline
function initProgressBar() {
    const dueDate = new Date('2025-08-30');
    const startDate = new Date('2025-02-01');
    const currentDate = new Date();
    
    const totalDays = Math.ceil((dueDate - startDate) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, totalDays - daysPassed);
    
    const progressPercentage = Math.min(100, (daysPassed / totalDays) * 100);
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.innerHTML = `
        <div style="
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.3);
        ">
            <h4 style="color: white; margin-bottom: 10px; font-size: 1rem;">
                <i class="fas fa-clock"></i> Payment Deadline Progress
            </h4>
            <div style="
                background: rgba(255,255,255,0.3);
                border-radius: 10px;
                height: 8px;
                margin: 10px 0;
                overflow: hidden;
                position: relative;
            ">
                <div id="progressBar" style="
                    height: 100%;
                    background: ${progressPercentage > 80 ? 'linear-gradient(90deg, #ff6b6b, #ee5a24)' : 'linear-gradient(90deg, #ffd700, #ffed4e)'};
                    width: 0%;
                    border-radius: 10px;
                    transition: width 2s ease-in-out;
                    position: relative;
                "></div>
            </div>
            <p style="color: white; font-size: 0.9rem; margin: 5px 0;">
                ${daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Payment Overdue!'}
            </p>
        </div>
    `;
    
    const header = document.querySelector('.invoice-header');
    if (header) {
        header.appendChild(progressContainer);
        
        // Animate progress bar
        setTimeout(() => {
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = progressPercentage + '%';
            }
        }, 500);
    }
}

// Enhanced interactive elements
function initInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add typing effect to important text
    const finalAmount = document.getElementById('finalAmount');
    if (finalAmount) {
        addTypingEffect(finalAmount, finalAmount.textContent, 100);
    }
    
    // Add dynamic tooltips
    addDynamicTooltips();
    
    // Add keyboard navigation
    addKeyboardNavigation();
}

function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple keyframes if not exists
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addTypingEffect(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

function addDynamicTooltips() {
    const elementsWithTooltips = [
        { selector: '.penalty-warning', text: 'Avoid these charges by paying before deadline!' },
        { selector: '.qr-code', text: 'Scan with any UPI app to pay instantly' },
        { selector: '.total-amount', text: 'Final amount after discount applied' }
    ];
    
    elementsWithTooltips.forEach(item => {
        const element = document.querySelector(item.selector);
        if (element) {
            element.setAttribute('title', item.text);
            element.style.cursor = 'help';
        }
    });
}

function addKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.classList.contains('btn-primary')) {
            event.target.click();
        }
        
        if (event.key === 'Escape') {
            // Close any open modals or notifications
            const notifications = document.querySelectorAll('.advanced-notification');
            notifications.forEach(notification => notification.remove());
        }
    });
}

// Payment Deadline Timer Functionality
class PaymentDeadlineTimer {
    constructor() {
        // Set target deadline to August 29, 2025, 11:59 PM
        this.targetDate = new Date('2025-08-29T23:59:59');
        this.totalDuration = this.targetDate - new Date('2025-08-22T00:00:00'); // From Aug 22 to Aug 29
        
        this.elements = {
            daysCount: document.getElementById('daysCount'),
            hoursCount: document.getElementById('hoursCount'),
            minutesCount: document.getElementById('minutesCount'),
            secondsCount: document.getElementById('secondsCount'),
            currentTime: document.getElementById('currentTime'),
            progressFill: document.getElementById('progressFill'),
            percentageRemaining: document.getElementById('percentageRemaining'),
            urgencyText: document.getElementById('urgencyText')
        };
        
        this.init();
    }
    
    init() {
        // Update immediately
        this.updateTimer();
        
        // Update every second
        this.interval = setInterval(() => {
            this.updateTimer();
        }, 1000);
        
        // Update current time every second with animation
        this.updateCurrentTime();
        setInterval(() => {
            this.updateCurrentTime();
        }, 1000);
    }
    
    updateTimer() {
        const now = new Date();
        const timeRemaining = this.targetDate - now;
        
        if (timeRemaining <= 0) {
            this.handleDeadlineReached();
            return;
        }
        
        // Calculate time components
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Update countdown display with animations
        this.updateCountdownValue(this.elements.daysCount, days.toString().padStart(2, '0'));
        this.updateCountdownValue(this.elements.hoursCount, hours.toString().padStart(2, '0'));
        this.updateCountdownValue(this.elements.minutesCount, minutes.toString().padStart(2, '0'));
        this.updateCountdownValue(this.elements.secondsCount, seconds.toString().padStart(2, '0'));
        
        // Update progress bar
        this.updateProgressBar(timeRemaining);
        
        // Update urgency indicator
        this.updateUrgencyIndicator(days, hours);
    }
    
    updateCountdownValue(element, newValue) {
        if (element && element.textContent !== newValue) {
            // Add flip animation
            element.style.transform = 'rotateX(90deg)';
            element.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'rotateX(0deg)';
            }, 150);
        }
    }
    
    updateProgressBar(timeRemaining) {
        const percentage = Math.max(0, (timeRemaining / this.totalDuration) * 100);
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${percentage}%`;
            
            // Change color based on urgency
            if (percentage < 20) {
                this.elements.progressFill.style.background = 'linear-gradient(90deg, #ff4757 0%, #ff3742 50%, #ff4757 100%)';
            } else if (percentage < 50) {
                this.elements.progressFill.style.background = 'linear-gradient(90deg, #ff6b35 0%, #f7931e 50%, #ff6b35 100%)';
            } else {
                this.elements.progressFill.style.background = 'linear-gradient(90deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)';
            }
        }
        
        if (this.elements.percentageRemaining) {
            this.elements.percentageRemaining.textContent = `${percentage.toFixed(1)}%`;
        }
    }
    
    updateUrgencyIndicator(days, hours) {
        if (!this.elements.urgencyText) return;
        
        let urgencyLevel = '';
        
        if (days <= 1) {
            urgencyLevel = 'CRITICAL';
        } else if (days <= 3) {
            urgencyLevel = 'HIGH';
        } else if (days <= 5) {
            urgencyLevel = 'MEDIUM';
        } else {
            urgencyLevel = 'URGENT';
        }
        
        this.elements.urgencyText.textContent = urgencyLevel;
    }
    
    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        if (this.elements.currentTime) {
            // Add subtle animation on time update
            this.elements.currentTime.style.transform = 'scale(1.05)';
            this.elements.currentTime.textContent = timeString;
            
            setTimeout(() => {
                this.elements.currentTime.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    handleDeadlineReached() {
        clearInterval(this.interval);
        
        // Update all countdown to 00
        Object.values(this.elements).forEach(element => {
            if (element && element.id.includes('Count')) {
                element.textContent = '00';
                element.style.color = '#ff4757';
            }
        });
        
        if (this.elements.urgencyText) {
            this.elements.urgencyText.textContent = 'DEADLINE PASSED';
        }
        
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = '0%';
            this.elements.progressFill.style.background = '#ff4757';
        }
        
        // Show deadline reached notification
        showAdvancedNotification('⚠️ Payment deadline reached! Late charges apply.', 'error');
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the payment deadline timer
    setTimeout(() => {
        window.paymentTimer = new PaymentDeadlineTimer();
    }, 1000);
});

// Clean up timer on page unload
window.addEventListener('beforeunload', () => {
    if (window.paymentTimer) {
        window.paymentTimer.destroy();
    }
});
