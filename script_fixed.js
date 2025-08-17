// Enhanced Dynamic Payment Reminder System with Fixed AI Integration

class AdvancedPaymentReminderSystem {
    constructor() {
        this.dueDate = new Date('2025-09-04T23:59:59'); // Updated to September 4th
        this.originalAmount = 26000;
        this.currentAmount = 32272;
        this.totalCalculatedAmount = 34188; // Higher amount for discount calculation
        this.discountAmount = this.totalCalculatedAmount - this.currentAmount; // 1916 discount
        this.customerName = 'Amit Arya';
        this.fatherName = 'Harish Chander';
        this.lenderName = 'Vicky Kumar';
        this.lenderPhone = '8383848219';
        this.accountGeneratedDate = new Date('2025-08-01'); // Account generated in August
        this.paymentDueDate = new Date('2025-08-04'); // Payment was due on 4th August
        this.firDeadline = new Date('2025-09-04'); // FIR deadline
        
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
        this.addAIChatInterface();
        this.adjustMobileLayout();
        this.showDiscountNotification();
    }

    showDiscountNotification() {
        setTimeout(() => {
            this.showToast(`🎉 Special Discount! Save ₹${this.discountAmount}! Pay ₹${this.currentAmount} instead of ₹${this.totalCalculatedAmount}!`, 'success');
        }, 3000);
    }

    initializeGeminiAI() {
        this.geminiAI = {
            conversationHistory: [],
            personality: 'strict_debt_collector'
        };
    }

    async queryGeminiAI(userMessage) {
        // Enhanced convincing responses with discount and FIR warnings
        const convincingResponses = [
            "Amit bhai! Special discount! Total amount ₹34,188 but pay only ₹32,272! Save ₹1,916! Limited time offer! 💰",
            "Brother, main tumhari family ka respect karta hun. Papa Harish ji ka naam hai - September 4th ke baad FIR hoga! 🚨",
            "URGENT! September 4th deadline! After that FIR + 5% extra + late fees! Abhi pay karo save money! ⏰",
            "Amit, special discount diya hai ₹1,916! Normal ₹34,188 but pay only ₹32,272! Friend rate hai! 🤝",
            "Dekho bhai, August 4th se overdue hai! September 4th ke baad legal action! Police case avoid karo! ⚖️",
            "Beta Amit, account August mein generate hua tha. Ab September deadline! FIR se bachna hai toh pay kar do! 📋",
            "Brother, discount de raha hun ₹1,916! Normal rate ₹34,188 but special price ₹32,272! Last chance! 💸",
            "Amit ji, September 4th ke baad additional 5% on ₹32,272 + ₹1,100 late fees + IGST! Abhi save karo! 💰",
            "Bhai mere bachche ka school admission hai! Discount diya hai tumko! ₹32,272 pay kar do September 4 tak! 🎓",
            "Brother Amit, discount offer: ₹34,188 → ₹32,272! Save ₹1,916! After deadline extra charges! ⚡",
            "LAST WARNING! September 4th ke baad FIR filing! Police case + court fees! Abhi settle kar lo! 👮‍♂️",
            "Brother, friendship ke liye discount! ₹1,916 save kar raha hun! But September 4 deadline fix hai! 🤝",
            "Dekho Amit, August account tha, August 4 payment due tha! Ab final deadline September 4! FIR ready hai! 📄",
            "Bhai special offer! ₹34,188 se ₹32,272! But September 4 ke baad no mercy! Legal action guaranteed! ⚖️"
        ];

        // Return a random convincing response
        const randomResponse = convincingResponses[Math.floor(Math.random() * convincingResponses.length)];
        
        this.geminiAI.conversationHistory.push({ user: userMessage, ai: randomResponse });
        return randomResponse;
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
                <div class="ai-message">
                    <img src="vicky_upi.jpg" alt="Vicky Kumar" class="vicky-image" style="width: 60px; height: 60px; border-radius: 50%; margin-bottom: 10px; border: 3px solid #4CAF50;">
                    <div><strong>Vicky:</strong> Namaste Amit bhai! Special discount offer! ₹34,188 se ₹32,272! Save ₹1,916! September 4 deadline! 💰🚨</div>
                </div>
                <div class="ai-message typing" id="initialMessage" style="display: none;">
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
    }

    showInitialAIMessage() {
        const chatBody = document.getElementById('aiChatBody');
        if (chatBody) {
            const initialMsg = document.createElement('div');
            initialMsg.className = 'ai-message';
            initialMsg.innerHTML = `
                <img src="vicky_upi.jpg" alt="Vicky Kumar" class="vicky-image" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 8px; border: 2px solid #4CAF50;">
                <div><strong>Vicky:</strong> Amit bhai! Urgent! September 4th deadline! FIR se bachna hai toh ₹32,272 pay kar do! Special discount already given! 🚨💰</div>
            `;
            chatBody.appendChild(initialMsg);
            
            this.speakHinglish('Amit bhai! September fourth deadline! FIR se bachna hai toh rupaye pay kar do! Special discount already given!');
        }
    }

    async handleAIChat(message) {
        const chatBody = document.getElementById('aiChatBody');
        if (!chatBody) return;
        
        const userMsg = document.createElement('div');
        userMsg.className = 'user-message';
        userMsg.innerHTML = `<strong>You:</strong> ${message}`;
        chatBody.appendChild(userMsg);
        
        const aiResponse = await this.queryGeminiAI(message);
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-message';
        
        // Add image randomly to some responses
        const shouldShowImage = Math.random() > 0.6;
        if (shouldShowImage) {
            aiMsg.innerHTML = `
                <img src="vicky_upi.jpg" alt="Vicky Kumar" class="vicky-image" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 8px; border: 2px solid #4CAF50;">
                <div><strong>Vicky:</strong> ${aiResponse}</div>
            `;
        } else {
            aiMsg.innerHTML = `<strong>Vicky:</strong> ${aiResponse}`;
        }
        
        chatBody.appendChild(aiMsg);
        
        // Speak the response with maximum volume
        this.speakHinglish(aiResponse);
        
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    startCountdown() {
        this.updateCountdown();
        setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.dueDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('urgencyText').textContent = '🚨 DEADLINE PASSED! FIR FILING IN PROGRESS! 🚨';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // Update urgency text based on time remaining
        if (days <= 1) {
            document.getElementById('urgencyText').textContent = '🚨 CRITICAL! FIR FILING TOMORROW! PAY NOW! 🚨';
        } else if (days <= 3) {
            document.getElementById('urgencyText').textContent = '⚠️ URGENT! FIR DEADLINE APPROACHING! ⚠️';
        } else {
            document.getElementById('urgencyText').textContent = 'FIR Filing Soon - Pay Now to Avoid Legal Action!';
        }
    }

    initializeSoundSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Set master gain to maximum
            if (this.audioContext) {
                const masterGain = this.audioContext.createGain();
                masterGain.gain.value = 3.0; // Boost master volume
                masterGain.connect(this.audioContext.destination);
            }
        } catch (e) {
            console.log('Web Audio API not supported');
        }
        
        this.setupHindiVoice();
        
        setTimeout(() => {
            this.playWelcomeMessage();
        }, 2000);
        
        // Set system volume to maximum if possible
        try {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
                console.log('Audio permissions granted');
            });
        } catch (e) {
            console.log('Audio permissions not available');
        }
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
        // Prioritize Indian English male voices first, then Hindi voices
        this.hindiVoice = voices.find(voice => 
            (voice.lang.includes('en-IN') && voice.name.toLowerCase().includes('male')) ||
            (voice.lang.includes('en-IN') && voice.name.toLowerCase().includes('ravi')) ||
            (voice.lang.includes('en-IN') && voice.name.toLowerCase().includes('google'))
        ) || voices.find(voice => 
            voice.lang.includes('hi') || 
            voice.name.includes('Hindi') ||
            voice.name.includes('Google हिन्दी')
        ) || voices.find(voice => voice.lang.includes('en-IN')) || voices[0];
        
        console.log('Selected voice:', this.hindiVoice?.name || 'Default');
    }

    speakHinglish(text) {
        if (!this.soundEnabled) return;
        
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.hindiVoice;
        utterance.rate = 0.9; // Slightly slower for Indian accent
        utterance.pitch = 1.3; // Higher pitch for younger boy voice
        utterance.volume = 1.0; // Maximum volume
        
        speechSynthesis.speak(utterance);
        
        // Additional volume boost using Web Audio API
        if (this.audioContext && this.audioContext.state === 'running') {
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = 2.0; // Boost gain for maximum volume
            gainNode.connect(this.audioContext.destination);
        }
        
        this.animateSoundVisualization();
    }

    playWelcomeMessage() {
        this.speakHinglish('AMIT BHAI! URGENT! September fourth deadline! FIR se bachna hai toh pay kar do! Special discount offer!');
        
        setTimeout(() => {
            this.speakHinglish('Vicky Kumar ka loan rupaye thirty two thousand two seventy two pay karna hai! Discount already given!');
        }, 5000);
        
        setTimeout(() => {
            this.speakHinglish('September fourth ke baad police case! FIR filing! Court fees extra! Abhi pay kar do!');
        }, 10000);
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
            if (soundViz) soundViz.classList.add('active');
            this.playReminderSound();
        } else {
            soundToggle.classList.remove('active');
            soundToggle.querySelector('i').className = 'fas fa-volume-mute';
            if (soundViz) soundViz.classList.remove('active');
            speechSynthesis.cancel();
        }
    }

    playReminderSound() {
        this.speakHinglish('September fourth deadline! Pay kar do Amit bhai! FIR se bachna hai!');
    }

    async initiatePhonePePayment(type) {
        const amount = type === 'full' ? this.currentAmount : 0;
        
        const phonePeAmountElement = document.getElementById('phonePeAmount');
        const phonePeModalElement = document.getElementById('phonePeModal');
        
        if (!phonePeAmountElement || !phonePeModalElement) {
            console.error('Payment modal elements not found');
            this.showToast('Payment system not available', 'error');
            return;
        }
        
        phonePeAmountElement.value = amount > 0 ? amount : '';
        phonePeModalElement.style.display = 'flex';
        
        if (amount > 0) {
            setTimeout(() => {
                const customerMobileElement = document.getElementById('customerMobile');
                if (customerMobileElement) {
                    customerMobileElement.focus();
                }
            }, 300);
        } else {
            setTimeout(() => {
                phonePeAmountElement.focus();
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
        
        this.showToast('Redirecting to PhonePe...', 'info');
        
        setTimeout(() => {
            const phonepeUrl = `phonepe://pay?pa=${this.phonePeConfig.upiId}&pn=${encodeURIComponent(this.lenderName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Loan Payment - ${this.customerName}`)}`;
            window.location.href = phonepeUrl;
        }, 1000);
        
        this.closePhonePeModal();
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');
        
        toast.className = `toast ${type}`;
        toastMessage.textContent = message;
        
        switch(type) {
            case 'success':
                toastIcon.className = 'toast-icon fas fa-check-circle';
                break;
            case 'error':
                toastIcon.className = 'toast-icon fas fa-exclamation-circle';
                break;
            case 'warning':
                toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
                break;
            default:
                toastIcon.className = 'toast-icon fas fa-info-circle';
        }
        
        toast.style.display = 'flex';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000);
    }

    closePhonePeModal() {
        document.getElementById('phonePeModal').style.display = 'none';
    }

    validateMobile(mobile) {
        const mobileRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
        return mobileRegex.test(mobile);
    }

    initializeAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.adjustMobileLayout();
        });
    }

    updateUrgencyIndicator() {
        const now = new Date();
        const timeLeft = this.dueDate - now;
        const totalTime = this.dueDate - this.accountGeneratedDate;
        const progress = Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100));
        
        const urgencyFill = document.getElementById('urgencyFill');
        if (urgencyFill) {
            urgencyFill.style.width = progress + '%';
            
            if (progress > 90) {
                urgencyFill.style.background = '#dc3545';
            } else if (progress > 70) {
                urgencyFill.style.background = '#ffc107';
            } else {
                urgencyFill.style.background = '#28a745';
            }
        }
    }

    animateBreakdown() {
        const breakdownItems = document.querySelectorAll('.breakdown-item');
        breakdownItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    showProgressiveCalculation() {
        const steps = document.querySelectorAll('.calc-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'scale(1)';
            }, index * 300);
        });
    }

    adjustMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        
        const checkMobile = () => {
            if (isMobile) {
                this.adjustMobileLayout();
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
    }

    payWithSpecificUPI(app, amount) {
        let upiUrl = '';
        const upiId = this.phonePeConfig.upiId;
        const name = encodeURIComponent(this.lenderName);
        const note = encodeURIComponent(`Loan Payment - ${this.customerName}`);
        
        switch(app) {
            case 'phonepe':
                upiUrl = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
                break;
            case 'gpay':
                upiUrl = `tez://upi/pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
                break;
            case 'paytm':
                upiUrl = `paytmmp://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
                break;
            case 'bhim':
                upiUrl = `bhim://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
                break;
        }
        
        if (upiUrl) {
            window.location.href = upiUrl;
            this.showToast(`Opening ${app.toUpperCase()}...`, 'info');
        }
    }
}

// Global functions for HTML event handlers
let paymentSystem;

document.addEventListener('DOMContentLoaded', function() {
    paymentSystem = new AdvancedPaymentReminderSystem();
    
    // Add global reference for debugging
    window.paymentSystem = paymentSystem;
});

function toggleSound() {
    if (paymentSystem) {
        paymentSystem.toggleSound();
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
        const upiModalElement = document.getElementById('upiModal');
        if (upiModalElement) {
            upiModalElement.style.display = 'flex';
        } else {
            console.error('UPI Modal element not found');
            paymentSystem.showToast('UPI options not available', 'error');
        }
    }
}

function closeUPIModal() {
    const upiModal = document.getElementById('upiModal');
    if (upiModal) {
        upiModal.style.display = 'none';
    }
}

function closePhonePeModal() {
    const phonePeModal = document.getElementById('phonePeModal');
    if (phonePeModal) {
        phonePeModal.style.display = 'none';
    }
}

function payWithUPI(app) {
    const amount = document.getElementById('upiAmount').value || (paymentSystem ? paymentSystem.currentAmount : 32272);
    if (paymentSystem) {
        paymentSystem.payWithSpecificUPI(app, amount);
    }
    closeUPIModal();
}

function contactLender() {
    if (paymentSystem) {
        paymentSystem.speakHinglish('Calling Vicky Kumar for payment help! September fourth deadline!');
        setTimeout(() => {
            window.location.href = `tel:${paymentSystem.lenderPhone}`;
        }, 1000);
    }
}

function showPaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.style.display = 'flex';
    }
}

function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}

function processPayment() {
    const amount = document.getElementById('paymentAmount').value;
    const method = document.getElementById('paymentMethod').value;
    const notes = document.getElementById('paymentNotes').value;
    
    if (!amount || amount <= 0) {
        paymentSystem.showToast('Please enter a valid amount', 'error');
        return;
    }
    
    paymentSystem.showToast(`Processing payment of ₹${amount} via ${method}...`, 'info');
    closePaymentModal();
    
    setTimeout(() => {
        paymentSystem.showToast('Payment processing initiated!', 'success');
    }, 2000);
}

function addToCalendar() {
    const title = 'URGENT: Final Payment Deadline - FIR Filing';
    const details = 'Final deadline to pay ₹32,272 to avoid FIR and legal action. Special discount applied - Save ₹1,916!';
    const startDate = '20250904T235959Z';
    const endDate = '20250904T235959Z';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

function toggleAIChat() {
    const chatInterface = document.querySelector('.ai-chat-interface');
    if (chatInterface) {
        chatInterface.classList.toggle('open');
        
        if (chatInterface.classList.contains('open')) {
            if (paymentSystem) {
                paymentSystem.speakHinglish('Vicky Kumar live chat started! September fourth deadline! Pay kar do!');
            }
        }
    }
}

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (message && paymentSystem) {
        input.value = '';
        await paymentSystem.handleAIChat(message);
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendAIMessage();
    }
}
