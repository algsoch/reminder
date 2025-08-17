// Enhanced Dynamic Payment Reminder System with Gemini AI Integration

class AdvancedPaymentReminderSystem {
    constructor() {
        this.dueDate = new Date('2025-08-30T23:59:59');
        this.originalAmount = 26000;
        this.currentAmount = 32272;
        this.customerName = 'Amit Arya';
        this.fatherName = 'Harish Chander';
        this.lenderName = 'Vicky Kumar';
        this.lenderPhone = '8383848219';
        
        // PhonePe Integration Credentials
        this.phonePeConfig = {
            clientId: 'SU2507021512080209642344',
            clientVersion: '1',
            clientSecret: 'd4e02484-9594-4625-b125-1f82de0b022f',
            merchantId: 'VICKY_LOANS',
            saltKey: 'production-salt-key',
            environment: 'PRODUCTION',
            upiId: 'vicky@phonepe'
        };
        
        // Gemini Pro AI Configuration
        this.geminiConfig = {
            apiKey: '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',
            baseUrl: 'https://api-inference.huggingface.co/models/google/gemma-2b-it',
            model: 'gemma-2b-it'
        };
        
        // Sound System
        this.soundEnabled = true;
        this.audioContext = null;
        this.reminderInterval = null;
        this.speechSynthesis = window.speechSynthesis;
        this.autoReminderActive = true;
        this.hindiVoice = null;
        
        this.init();
    }

    init() {
        this.startCountdown();
        this.initializeAnimations();
        this.setupEventListeners();
        this.updateUrgencyIndicator();
        this.animateBreakdown();
        this.initializeSoundSystem();
        this.showProgressiveCalculation();
        this.initializeGeminiAI();
        
        // Auto-play reminder on website load
        this.playAutoReminder();
        
        // Start periodic updates
        setInterval(() => {
            this.updateUrgencyIndicator();
            if (this.autoReminderActive) {
                this.playReminderSound();
            }
        }, 300000); // Update every 5 minutes for reminders
        
        // Check for mobile responsive design
        this.handleResponsiveDesign();
    }

    calculateProgressive() {
        const may = 26000;
        const june = may * 1.05; // 27,300
        const july = june * 1.05; // 28,665
        const august = july * 1.05; // 30,098.25
        
        const lateFee = 1100;
        const gstOnLateFee = lateFee * 0.18; // 198
        const igstOnFinanceCharges = 311.74;
        const processingCharges = 564.01;
        
        return {
            may: may,
            june: june,
            july: july,
            august: august,
            lateFee: lateFee,
            gst: gstOnLateFee,
            igst: igstOnFinanceCharges,
            processing: processingCharges,
            total: august + lateFee + gstOnLateFee + igstOnFinanceCharges + processingCharges
        };
    }

    showProgressiveCalculation() {
        const timeline = document.querySelectorAll('.timeline-item[data-month]');
        timeline.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInFromLeft 0.8s ease forwards';
                
                item.addEventListener('click', () => {
                    this.showCalculationDetails(item.dataset.month);
                });
            }, index * 300);
        });
    }

    showCalculationDetails(month) {
        const details = {
            may: 'Base amount without any interest',
            june: '₹26,000 + 5% = ₹27,300 (First month interest)',
            july: '₹27,300 + 5% = ₹28,665 (Compound interest)',
            august: '₹28,665 + 5% + Late fees + GST + IGST = ₹32,272'
        };
        
        this.showToast(`${month.toUpperCase()}: ${details[month]}`, 'info', 4000);
    }

    playAutoReminder() {
        setTimeout(() => {
            this.speakHinglish('Amit paise pay kar! Payment pending hai bhai!');
        }, 2000);
    }

    async initializeGeminiAI() {
        this.geminiAI = {
            isActive: true,
            conversationHistory: [],
            personality: 'strict_debt_collector'
        };
        
        this.addAIChatInterface();
    }

    async queryGeminiAI(userMessage) {
        try {
            const systemPrompt = `You are Vicky Kumar, a firm but polite debt collector. You are collecting money from Amit Arya (son of Harish Chander) who owes ₹32,272 for a loan that was originally ₹26,000 in May 2025. The amount has grown due to progressive interest (5% per month) and late fees. You speak in Hinglish (Hindi-English mix) and are serious about collecting the payment. Be firm but respectful. Current date is August 18, 2025. Payment due date is August 30, 2025.`;
            
            const response = await fetch(this.geminiConfig.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.geminiConfig.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: `${systemPrompt}\n\nUser: ${userMessage}\n\nVicky Kumar:`,
                    parameters: {
                        max_length: 200,
                        temperature: 0.7,
                        return_full_text: false
                    }
                })
            });

            const data = await response.json();
            let aiResponse = data[0]?.generated_text || "Amit bhai, please payment kar do na! Time ho gaya hai.";
            
            aiResponse = aiResponse.replace(systemPrompt, '').replace('User:', '').replace('Vicky Kumar:', '').trim();
            
            this.geminiAI.conversationHistory.push({ user: userMessage, ai: aiResponse });
            return aiResponse;
        } catch (error) {
            console.error('Gemini AI Error:', error);
            return "Amit bhai, technical problem hai. But payment toh karna padega na!";
        }
    }

    addAIChatInterface() {
        const chatInterface = document.createElement('div');
        chatInterface.className = 'ai-chat-interface';
        chatInterface.innerHTML = `
            <div class="ai-chat-header">
                <i class="fas fa-robot"></i>
                <span>Vicky Kumar (Live AI Agent)</span>
                <div class="chat-status">
                    <span class="status-dot online"></span>
                    <span>Online</span>
                </div>
                <button class="chat-toggle" onclick="toggleAIChat()">
                    <i class="fas fa-comment-dots"></i>
                </button>
            </div>
            <div class="ai-chat-body" id="aiChatBody">
                <div class="ai-message typing" id="initialMessage">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div class="ai-chat-input">
                <input type="text" id="aiChatInput" placeholder="Ask Vicky about payment..." onkeypress="handleChatEnter(event)">
                <button onclick="sendAIMessage()" id="sendBtn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(chatInterface);
        
        setTimeout(() => {
            this.showInitialAIMessage();
        }, 2000);
        
        this.startDynamicUpdates();
    }

    showInitialAIMessage() {
        const initialMsg = document.getElementById('initialMessage');
        const currentHour = new Date().getHours();
        let greeting = '';
        
        if (currentHour < 12) {
            greeting = 'Good morning';
        } else if (currentHour < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        const daysOverdue = Math.floor((new Date() - new Date('2025-05-30')) / (1000 * 60 * 60 * 24));
        
        initialMsg.innerHTML = `
            <strong>Vicky:</strong> ${greeting} Amit bhai! Main Vicky Kumar hun. 
            Aapka payment ₹32,272 already ${daysOverdue} days overdue hai. 
            Kya aap abhi payment kar sakte hain?
        `;
        initialMsg.classList.remove('typing');
        
        this.speakHinglish(`${greeting} Amit bhai! Payment pending hai ${daysOverdue} days se!`);
    }

    startDynamicUpdates() {
        setInterval(() => {
            this.updateDynamicContent();
        }, 30000);
        
        setInterval(() => {
            this.showDynamicReminder();
        }, 300000);
        
        setInterval(() => {
            this.updateDynamicInterest();
        }, 60000);
    }

    updateDynamicContent() {
        const now = new Date();
        const timeLeft = this.dueDate - now;
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        
        let urgencyMessage = '';
        if (hoursLeft <= 24) {
            urgencyMessage = `🚨 CRITICAL: Only ${hoursLeft} hours left!`;
        } else if (hoursLeft <= 72) {
            urgencyMessage = `⚠️ URGENT: ${Math.floor(hoursLeft/24)} days remaining!`;
        } else {
            urgencyMessage = `📅 ${Math.floor(hoursLeft/24)} days to payment deadline`;
        }
        
        const urgencyText = document.getElementById('urgencyText');
        if (urgencyText) {
            urgencyText.textContent = urgencyMessage;
            urgencyText.className = hoursLeft <= 24 ? 'urgency-text critical' : 'urgency-text';
        }
        
        this.updatePaymentStatus();
    }

    showDynamicReminder() {
        const reminders = [
            'Amit bhai, payment time ho gaya hai! ₹32,272 pending hai.',
            'Hello Amit! Vicky here. Payment reminder - ₹32,272 due today.',
            'Urgent: Your loan payment ₹32,272 is overdue. Please pay now.',
            'Amit bhai, interest badh raha hai daily. Please payment kar do.',
            'Emergency: Late fees add ho rahe hain. Pay ₹32,272 now!'
        ];
        
        const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
        
        this.addDynamicAIMessage(randomReminder);
        this.speakHinglish(randomReminder);
        this.showToast('💰 Payment Reminder: ' + randomReminder, 'warning', 5000);
    }

    addDynamicAIMessage(message) {
        const chatBody = document.getElementById('aiChatBody');
        if (chatBody) {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'ai-message dynamic';
            aiMsg.innerHTML = `
                <div class="message-meta">
                    <strong>Vicky (Auto-Reminder)</strong>
                    <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="message-content">${message}</div>
            `;
            chatBody.appendChild(aiMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
            
            this.showChatNotification();
        }
    }

    showChatNotification() {
        const chatToggle = document.querySelector('.ai-chat-toggle');
        if (chatToggle && !document.querySelector('.ai-chat-interface.open')) {
            chatToggle.classList.add('has-notification');
            
            setTimeout(() => {
                chatToggle.classList.remove('has-notification');
            }, 10000);
        }
    }

    updateDynamicInterest() {
        const startDate = new Date('2025-05-30');
        const currentDate = new Date();
        const daysOverdue = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        
        const dailyRate = Math.pow(1.05, 1/30) - 1;
        const currentAmount = 26000 * Math.pow(1 + dailyRate, daysOverdue);
        
        const lateFees = Math.max(0, (daysOverdue - 30) * 50);
        const totalCurrent = currentAmount + lateFees + 1100 + 198 + 311.74 + 564.01;
        
        if (Math.abs(totalCurrent - this.currentAmount) > 1) {
            this.currentAmount = totalCurrent;
            this.updateAmountDisplays();
            
            if (daysOverdue > 0 && daysOverdue % 7 === 0) {
                this.speakHinglish(`Interest badh gaya hai! Now total ₹${Math.round(totalCurrent)} ho gaya hai.`);
            }
        }
    }

    updateAmountDisplays() {
        const currentAmountElement = document.querySelector('.timeline-item.current .amount');
        if (currentAmountElement) {
            currentAmountElement.textContent = `₹${Math.round(this.currentAmount).toLocaleString()}`;
        }
        
        const totalElement = document.querySelector('.breakdown-item.total .value');
        if (totalElement) {
            totalElement.textContent = `₹${Math.round(this.currentAmount).toLocaleString()}`;
        }
        
        const fullPaymentBtn = document.querySelector('.payment-btn.full-payment span');
        if (fullPaymentBtn) {
            fullPaymentBtn.textContent = `₹${Math.round(this.currentAmount).toLocaleString()}`;
        }
    }

    updatePaymentStatus() {
        const statusDot = document.querySelector('.status-dot');
        const statusText = statusDot?.nextElementSibling;
        const now = new Date();
        const hoursLeft = Math.floor((this.dueDate - now) / (1000 * 60 * 60));
        
        if (hoursLeft <= 0) {
            statusDot?.setAttribute('class', 'status-dot overdue');
            if (statusText) statusText.textContent = 'Payment Overdue';
        } else if (hoursLeft <= 24) {
            statusDot?.setAttribute('class', 'status-dot critical');
            if (statusText) statusText.textContent = 'Payment Due Today';
        } else if (hoursLeft <= 72) {
            statusDot?.setAttribute('class', 'status-dot urgent');
            if (statusText) statusText.textContent = 'Payment Due Soon';
        }
    }

    handleResponsiveDesign() {
        const checkMobile = () => {
            const isMobile = window.innerWidth <= 768;
            document.body.classList.toggle('mobile-view', isMobile);
            
            if (isMobile) {
                this.adjustMobileLayout();
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
    }

    adjustMobileLayout() {
        const paymentButtons = document.querySelectorAll('.payment-btn');
        paymentButtons.forEach(btn => {
            btn.style.fontSize = '14px';
            btn.style.padding = '12px 16px';
        });
        
        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach(item => {
            item.style.minWidth = '60px';
        });
    }

    initializeSoundSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
        
        this.setupHindiVoice();
        
        setTimeout(() => {
            this.playWelcomeMessage();
        }, 2000);
    }

    setupHindiVoice() {
        if (speechSynthesis.getVoices().length === 0) {
            speechSynthesis.addEventListener('voiceschanged', () => {
                this.selectHindiVoice();
            });
        } else {
            this.selectHindiVoice();
        }
    }

    selectHindiVoice() {
        const voices = speechSynthesis.getVoices();
        this.hindiVoice = voices.find(voice => 
            voice.lang.includes('hi') || 
            voice.name.includes('Hindi') ||
            voice.name.includes('Google हिन्दी')
        ) || voices.find(voice => voice.lang.includes('en-IN')) || voices[0];
    }

    speakHinglish(text) {
        if (!this.soundEnabled) return;
        
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.hindiVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        
        speechSynthesis.speak(utterance);
        
        this.animateSoundVisualization();
    }

    playWelcomeMessage() {
        this.speakHinglish('Amit paise pay kar! Payment pending hai bhai!');
        
        setTimeout(() => {
            this.speakHinglish('Vicky Kumar ka loan ₹32,272 pay karna hai August 30 tak!');
        }, 4000);
    }

    animateSoundVisualization() {
        const soundViz = document.getElementById('soundViz');
        if (soundViz) {
            soundViz.classList.add('speaking');
            setTimeout(() => {
                soundViz.classList.remove('speaking');
            }, 2000);
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundToggle = document.getElementById('soundToggle');
        const soundViz = document.getElementById('soundViz');
        
        if (this.soundEnabled) {
            soundToggle.classList.add('active');
            soundToggle.querySelector('i').className = 'fas fa-volume-up';
            soundViz.classList.add('active');
            this.playReminderSound();
        } else {
            soundToggle.classList.remove('active');
            soundToggle.querySelector('i').className = 'fas fa-volume-mute';
            soundViz.classList.remove('active');
            speechSynthesis.cancel();
        }
    }

    playReminderSound() {
        if (this.soundEnabled) {
            this.speakHinglish('Amit bhai payment kardo! ₹32,272 pending hai!');
        }
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.dueDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(Math.max(0, days)).padStart(2, '0');
            document.getElementById('hours').textContent = String(Math.max(0, hours)).padStart(2, '0');
            document.getElementById('minutes').textContent = String(Math.max(0, minutes)).padStart(2, '0');
            document.getElementById('seconds').textContent = String(Math.max(0, seconds)).padStart(2, '0');
            
            const totalHours = Math.floor(distance / (1000 * 60 * 60));
            this.updateUrgencyLevel(totalHours);
            
            if (distance < 0) {
                this.showToast('Payment is overdue! Please pay immediately.', 'error', 5000);
                this.speakHinglish('Payment overdue ho gaya hai! Abhi pay karo!');
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    updateUrgencyLevel(totalHours) {
        const urgencyFill = document.getElementById('urgencyFill');
        const maxHours = 24 * 30; // 30 days max
        
        let urgencyPercentage = Math.max(0, 100 - (totalHours / maxHours * 100));
        urgencyFill.style.width = urgencyPercentage + '%';
        
        if (totalHours <= 24) {
            urgencyFill.style.background = 'linear-gradient(90deg, #ff4757, #ff3742)';
        } else if (totalHours <= 72) {
            urgencyFill.style.background = 'linear-gradient(90deg, #ffa502, #ff6348)';
        } else {
            urgencyFill.style.background = 'linear-gradient(90deg, #2ed573, #1e90ff)';
        }
    }

    updateUrgencyIndicator() {
        const now = new Date();
        const timeLeft = this.dueDate - now;
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
        
        const urgencyText = document.getElementById('urgencyText');
        
        if (timeLeft <= 0) {
            urgencyText.textContent = '🚨 PAYMENT OVERDUE!';
            urgencyText.className = 'urgency-text overdue';
        } else if (daysLeft <= 1) {
            urgencyText.textContent = `⚠️ URGENT: ${hoursLeft} hours remaining!`;
            urgencyText.className = 'urgency-text critical';
        } else if (daysLeft <= 3) {
            urgencyText.textContent = `⏰ ${daysLeft} days left to pay!`;
            urgencyText.className = 'urgency-text urgent';
        } else {
            urgencyText.textContent = `📅 ${daysLeft} days until payment due`;
            urgencyText.className = 'urgency-text normal';
        }
    }

    initializeAnimations() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('slide-in');
        });
        
        setTimeout(() => {
            this.animateNumbers();
        }, 1000);
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.amount, .countdown-number, .value');
        numbers.forEach(number => {
            const finalValue = number.textContent.replace(/[₹,]/g, '');
            if (!isNaN(finalValue) && finalValue !== '') {
                let currentValue = 0;
                const increment = finalValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    
                    if (number.textContent.includes('₹')) {
                        number.textContent = `₹${Math.floor(currentValue).toLocaleString()}`;
                    } else {
                        number.textContent = Math.floor(currentValue);
                    }
                }, 20);
            }
        });
    }

    animateBreakdown() {
        const breakdownItems = document.querySelectorAll('.breakdown-item, .calc-step');
        breakdownItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'slideInFromLeft 0.6s ease forwards';
            }, index * 100);
        });
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.modal[style*="flex"]');
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
            }
        });
        
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            timeline.addEventListener('click', (e) => {
                if (e.target.closest('.timeline-item')) {
                    const month = e.target.closest('.timeline-item').dataset.month;
                    if (month) {
                        this.showCalculationDetails(month);
                    }
                }
            });
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');
        
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
        
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
        }, duration);
    }

    async handleAIChat(message) {
        const chatBody = document.getElementById('aiChatBody');
        
        const userMsg = document.createElement('div');
        userMsg.className = 'user-message';
        userMsg.innerHTML = `<strong>You:</strong> ${message}`;
        chatBody.appendChild(userMsg);
        
        const aiResponse = await this.queryGeminiAI(message);
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message';
        aiMsg.innerHTML = `<strong>Vicky:</strong> ${aiResponse}`;
        chatBody.appendChild(aiMsg);
        
        this.speakHinglish(aiResponse);
        
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    async initiatePhonePePayment(type) {
        const amount = type === 'full' ? this.currentAmount : 0;
        
        document.getElementById('phonePeAmount').value = amount > 0 ? amount : '';
        document.getElementById('phonePeModal').style.display = 'flex';
        
        if (amount > 0) {
            setTimeout(() => {
                document.getElementById('customerMobile').focus();
            }, 300);
        } else {
            setTimeout(() => {
                document.getElementById('phonePeAmount').focus();
            }, 300);
        }
    }

    async processPhonePePayment() {
        const amount = parseFloat(document.getElementById('phonePeAmount').value);
        const mobile = document.getElementById('customerMobile').value;
        
        if (!amount || amount <= 0) {
            this.showToast('Please enter a valid amount', 'error');
            return;
        }
        
        if (!mobile || !this.validateMobile(mobile)) {
            this.showToast('Please enter a valid mobile number', 'error');
            return;
        }
        
        if (amount > this.currentAmount) {
            this.showToast('Amount cannot exceed the current due amount', 'error');
            return;
        }
        
        this.showToast('Initiating PhonePe payment...', 'info');
        
        const upiUrl = this.createUPIPaymentUrl(amount, mobile);
        
        try {
            this.closePhonePeModal();
            
            if (this.isMobileDevice()) {
                window.location.href = upiUrl;
                
                setTimeout(() => {
                    this.showUPIPaymentOptions(amount);
                }, 3000);
            } else {
                this.showDesktopPaymentOptions(amount);
            }
            
            this.speakHinglish(`Payment of ₹${amount} initiated. Please complete the payment.`);
        } catch (error) {
            console.error('Payment error:', error);
            this.showToast('Payment initiation failed. Please try UPI payment.', 'error');
            this.showUPIPaymentOptions(amount);
        }
    }

    createUPIPaymentUrl(amount, mobile = '') {
        const upiId = this.phonePeConfig.upiId;
        const merchantName = encodeURIComponent(this.lenderName);
        const transactionNote = encodeURIComponent(`Loan payment by ${this.customerName}`);
        
        return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    validateMobile(mobile) {
        const mobileRegex = /^(\+91|91)?[6789]\d{9}$/;
        return mobileRegex.test(mobile.replace(/\s+/g, ''));
    }

    showDesktopPaymentOptions(amount) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'desktopPaymentModal';
        modal.style.display = 'flex';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Complete Payment - ₹${amount}</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="payment-options-desktop">
                        <div class="qr-payment">
                            <h3>Scan QR Code</h3>
                            <div class="qr-container">
                                <img src="vicky_upi.jpg" alt="Payment QR Code" class="payment-qr-large">
                                <div class="qr-details">
                                    <p><strong>UPI ID:</strong> ${this.phonePeConfig.upiId}</p>
                                    <p><strong>Amount:</strong> ₹${amount}</p>
                                    <p><strong>Payee:</strong> ${this.lenderName}</p>
                                    <p><strong>Phone:</strong> ${this.lenderPhone}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="manual-payment">
                            <h3>Manual Payment Details</h3>
                            <div class="payment-details-box">
                                <div class="detail-row">
                                    <span class="detail-label">UPI ID:</span>
                                    <span class="detail-value selectable">${this.phonePeConfig.upiId}</span>
                                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${this.phonePeConfig.upiId}'); paymentSystem.showToast('UPI ID copied!', 'success')" title="Copy UPI ID">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Phone:</span>
                                    <span class="detail-value selectable">${this.lenderPhone}</span>
                                    <button class="copy-btn" onclick="navigator.clipboard.writeText('${this.lenderPhone}'); paymentSystem.showToast('Phone copied!', 'success')" title="Copy phone number">
                                        <i class="fas fa-copy"></i>
                                    </button>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Amount:</span>
                                    <span class="detail-value selectable amount-highlight">₹${amount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Close</button>
                    <button class="btn-primary" onclick="paymentSystem.confirmPaymentDone(${amount})">
                        <i class="fas fa-check"></i> I've Made the Payment
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    payWithSpecificUPI(app, amount) {
        const upiUrl = this.createUPIPaymentUrl(amount);
        
        const appUrls = {
            phonepe: `phonepe://pay?${upiUrl.split('?')[1]}`,
            gpay: `tez://upi/pay?${upiUrl.split('?')[1]}`,
            paytm: `paytmmp://pay?${upiUrl.split('?')[1]}`,
            bhim: `bhim://pay?${upiUrl.split('?')[1]}`
        };
        
        const specificUrl = appUrls[app] || upiUrl;
        
        try {
            window.location.href = specificUrl;
            this.speakHinglish(`Opening ${app} for payment of ₹${amount}`);
        } catch (error) {
            window.location.href = upiUrl;
        }
    }

    showUPIPaymentOptions(amount) {
        document.getElementById('upiModal').style.display = 'flex';
        document.getElementById('upiAmount').value = amount;
    }

    confirmPaymentDone(amount) {
        this.showToast('Thank you! Payment confirmation received.', 'success');
        this.speakHinglish(`Thank you Amit bhai! ₹${amount} payment received confirmation.`);
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.remove();
        });
        
        this.showPaymentSuccessAnimation(amount);
    }

    showPaymentSuccessAnimation(amount) {
        const successOverlay = document.createElement('div');
        successOverlay.className = 'payment-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-animation">
                <i class="fas fa-check-circle"></i>
                <h2>Payment Initiated!</h2>
                <p>₹${amount} payment request sent</p>
                <p>Complete the payment in your UPI app</p>
            </div>
        `;
        
        document.body.appendChild(successOverlay);
        
        setTimeout(() => {
            successOverlay.remove();
        }, 5000);
    }

    closePhonePeModal() {
        document.getElementById('phonePeModal').style.display = 'none';
    }

    addToCalendar() {
        const title = encodeURIComponent('Payment Reminder - Amit Arya Loan');
        const details = encodeURIComponent(`Payment of ₹${Math.round(this.currentAmount)} due to ${this.lenderName}. Phone: ${this.lenderPhone}`);
        const startDate = this.formatDateForCalendar(this.dueDate);
        
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${startDate}&details=${details}`;
        
        window.open(googleUrl, '_blank');
        this.speakHinglish('Calendar reminder added successfully!');
    }

    formatDateForCalendar(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
}

// Global Functions for HTML Compatibility
let paymentSystem;

function toggleSound() {
    if (paymentSystem) {
        paymentSystem.toggleSound();
    }
}

function addToCalendar() {
    if (paymentSystem) {
        paymentSystem.addToCalendar();
    }
}

function initiatePhonePePayment(type) {
    if (paymentSystem) {
        paymentSystem.initiatePhonePePayment(type);
    }
}

function processPhonePePayment() {
    if (paymentSystem) {
        paymentSystem.processPhonePePayment();
    }
}

function showUPIModal() {
    if (paymentSystem) {
        document.getElementById('upiModal').style.display = 'flex';
    }
}

function closeUPIModal() {
    document.getElementById('upiModal').style.display = 'none';
}

function closePhonePeModal() {
    document.getElementById('phonePeModal').style.display = 'none';
}

function payWithUPI(app) {
    const amount = document.getElementById('upiAmount').value || paymentSystem.currentAmount;
    if (paymentSystem) {
        paymentSystem.payWithSpecificUPI(app, amount);
    }
    closeUPIModal();
}

function contactLender() {
    if (paymentSystem) {
        paymentSystem.speakHinglish('Calling Vicky Kumar for payment help!');
        setTimeout(() => {
            window.location.href = `tel:${paymentSystem.lenderPhone}`;
        }, 1000);
    }
}

function showPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const method = document.getElementById('paymentMethod').value;
    
    if (!amount || amount <= 0) {
        paymentSystem.showToast('Please enter a valid amount', 'error');
        return;
    }

    if (amount > paymentSystem.currentAmount) {
        paymentSystem.showToast('Amount cannot exceed the current due amount', 'error');
        return;
    }

    paymentSystem.showToast(`Processing ${method} payment of ₹${amount}...`, 'info');
    
    setTimeout(() => {
        if (method === 'upi') {
            paymentSystem.showDesktopPaymentOptions(amount);
        } else {
            paymentSystem.showToast(`${method} payment of ₹${amount} initiated successfully!`, 'success');
        }
        closePaymentModal();
    }, 2000);
}

function toggleAIChat() {
    const chatInterface = document.querySelector('.ai-chat-interface');
    if (chatInterface) {
        chatInterface.classList.toggle('open');
        
        const chatToggle = document.querySelector('.ai-chat-toggle');
        if (chatToggle && chatInterface.classList.contains('open')) {
            chatToggle.classList.remove('has-notification');
        }
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const sendBtn = document.getElementById('sendBtn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    input.value = '';
    
    if (paymentSystem) {
        await paymentSystem.handleAIChat(message);
    }
    
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
}

function payWithSpecificApp(app, amount = null) {
    if (paymentSystem) {
        const finalAmount = amount || paymentSystem.currentAmount;
        paymentSystem.payWithSpecificUPI(app, finalAmount);
    }
}

function calculateLiveInterest() {
    if (paymentSystem) {
        paymentSystem.updateDynamicInterest();
    }
}

function emergencyPayment() {
    if (paymentSystem) {
        paymentSystem.speakHinglish('Emergency payment mode activated! Please pay immediately!');
        paymentSystem.showDesktopPaymentOptions(paymentSystem.currentAmount);
    }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    try {
        paymentSystem = new AdvancedPaymentReminderSystem();
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePaymentModal();
                closePhonePeModal();
                closeUPIModal();
                
                const chatInterface = document.querySelector('.ai-chat-interface');
                if (chatInterface && chatInterface.classList.contains('open')) {
                    toggleAIChat();
                }
                
                const calendarModal = document.getElementById('calendarModal');
                if (calendarModal) {
                    calendarModal.remove();
                }
            }
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                showPaymentModal();
            }
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                toggleSound();
            }
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                toggleAIChat();
            }
        });
        
        ['paymentModal', 'phonePeModal', 'upiModal'].forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        if (modalId === 'paymentModal') closePaymentModal();
                        else if (modalId === 'phonePeModal') closePhonePeModal();
                        else if (modalId === 'upiModal') closeUPIModal();
                    }
                });
            }
        });
        
        setTimeout(() => {
            if (paymentSystem) {
                paymentSystem.showToast('🚀 Dynamic Payment System Ready! AI Assistant Active.', 'success', 4000);
            }
        }, 3000);
        
        console.log('✅ Enhanced Payment Reminder System initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing payment system:', error);
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Error loading payment system. Please refresh the page.</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
});
