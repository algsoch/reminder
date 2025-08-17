// Enhanced Dynamic Payment Reminder System with Fixed AI Integration

class AdvancedPaymentReminderSystem {
    constructor() {
        this.dueDate = new Date('2025-08-30T23:59:59'); // Updated to August 30th current due date
        this.originalAmount = 26000;
        this.currentAmount = 32272;
        this.totalCalculatedAmount = 34188; // Higher amount for discount calculation
        this.discountAmount = this.totalCalculatedAmount - this.currentAmount; // 1916 discount
        this.customerName = 'Amit Arya';
        this.customerPhone = '8287217710'; // Amit's phone number
        this.fatherName = 'Harish Chander';
        this.lenderName = 'Vicky Kumar';
        this.lenderPhone = '8383848219'; // Updated Vicky's phone number
        this.lenderUpiId = 'algimagine@ybl'; // Updated UPI ID
        this.payUGatewayUrl = 'https://u.payu.in/aI2M9cqc5ui6'; // PayU Gateway URL
        this.currentLanguage = 'hinglish'; // Default language
        this.chatMessages = []; // Store chat messages
        this.geminiApiKey = 'YOUR_HUGGING_FACE_API_KEY_HERE'; // Replace with your actual Hugging Face API key
        this.isVickyLoggedIn = false; // Track if Vicky is logged in
        this.accountGeneratedDate = new Date('2025-02-01'); // Account generated in February
        this.paymentDueDate = new Date('2025-08-04'); // Payment was due on 4th August
        this.firDeadline = new Date('2025-09-04'); // FIR deadline
        
        // Enhanced loan context for AI chatbot
        this.loanContext = {
            originalLoan: 40000, // Amit took 40k in February 2025
            loanDate: 'February 2025',
            totalPaidSoFar: 26000, // Paid 26k in April only
            lastPaymentDate: 'April 2025',
            monthsOverdue: 7, // 7 months from February to now (August)
            totalCalculatedAmount: 33000, // After interest, fees, etc.
            discountedAmount: 32272, // What Vicky actually wants
            savingsOffered: 728, // 33000 - 32272
            lateFees: 1100,
            igst: 311,
            gst: 100,
            monthlyInterestRate: 5, // 5% per month
            paymentHistory: [
                { date: 'February 2025', amount: 40000, type: 'loan_disbursed' },
                { date: 'April 2025', amount: 26000, type: 'payment_received' },
                { date: 'May-August 2025', amount: 0, type: 'no_payment' }
            ]
        };
        
        // Auto sound toggle interval
        this.autoSoundInterval = null;
        
        // PhonePe Integration Credentials
        this.phonePeConfig = {
            clientId: 'SU2507021512080209642344',
            clientVersion: '1',
            clientSecret: 'd4e02484-9594-4625-b125-1f82de0b022f',
            merchantId: 'VICKY_LOANS',
            saltKey: 'production-salt-key',
            environment: 'PRODUCTION',
            upiId: 'algimagine@ybl' // Updated UPI ID
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

    // Copy UPI ID to clipboard
    copyUPIID() {
        const upiId = 'algimagine@ybl';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(upiId).then(() => {
                this.showToast('success', 'UPI ID copied to clipboard!');
                this.speakMessage('UPI ID copied successfully! Paste it in your payment app.');
            }).catch(err => {
                console.error('Failed to copy UPI ID:', err);
                this.fallbackCopyUPIID(upiId);
            });
        } else {
            this.fallbackCopyUPIID(upiId);
        }
    }

    // Fallback copy method for older browsers
    fallbackCopyUPIID(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showToast('success', 'UPI ID copied to clipboard!');
                this.speakMessage('UPI ID copied successfully! Paste it in your payment app.');
            } else {
                this.showToast('error', 'Failed to copy UPI ID');
            }
        } catch (err) {
            this.showToast('error', 'Copy not supported on this browser');
        }
        document.body.removeChild(textArea);
    }
    
    // Handle quick question responses
    handleQuickQuestion(type) {
        console.log('handleQuickQuestion called with type:', type);
        const responses = {
            'qr': {
                hinglish: `📱 QR CODE DETAILS:

🔍 Location: Payment section mein QR code hai (vicky_upi.jpg)
💰 Amount: ₹32,272 (auto-fill ho jayega scan ke baad)
📱 UPI ID: algimagine@ybl

📲 COMPATIBLE WITH ALL UPI APPS:
✅ Google Pay ✅ PhonePe ✅ Paytm ✅ BHIM
✅ Amazon Pay ✅ Cred ✅ FreeCharge

🚀 QR scan karo aur instant payment karo! Neeche scroll karo payment section dekho! 📲`,
                
                english: `📱 QR CODE DETAILS:

🔍 Location: QR code available in payment section (vicky_upi.jpg)
💰 Amount: ₹32,272 (auto-fills after scanning)
📱 UPI ID: algimagine@ybl

📲 COMPATIBLE WITH ALL UPI APPS:
✅ Google Pay ✅ PhonePe ✅ Paytm ✅ BHIM
✅ Amazon Pay ✅ Cred ✅ FreeCharge

🚀 Scan QR and make instant payment! Scroll down to see payment section! 📲`
            },
            
            'amount': {
                hinglish: `💰 AMOUNT BREAKDOWN:

🎯 Final Amount: ₹32,272 (Discounted!)
💸 Original calculation: ₹33,000+
🎉 Your savings: ₹728

📊 HOW WE CALCULATED:
💰 Outstanding principal: ₹14,000 (40k - 26k paid)
📈 Interest (7 months @ 5%): ₹8,000+
💸 Late fee: ₹1,100
🧾 IGST: ₹311 | GST: ₹100

⏰ Special discount valid only till September 4!`,
                
                english: `💰 AMOUNT BREAKDOWN:

🎯 Final Amount: ₹32,272 (Discounted!)
💸 Original calculation: ₹33,000+
🎉 Your savings: ₹728

📊 HOW WE CALCULATED:
💰 Outstanding principal: ₹14,000 (40k - 26k paid)
📈 Interest (7 months @ 5%): ₹8,000+
💸 Late fee: ₹1,100
🧾 IGST: ₹311 | GST: ₹100

⏰ Special discount valid only till September 4!`
            },
            
            'upi': {
                hinglish: `📱 UPI PAYMENT DETAILS:

🏦 UPI ID: algimagine@ybl
📞 Phone: 8383848219
👨‍💼 Payee: Vicky Kumar
🎯 Amount: ₹32,272

💳 STEP-BY-STEP PAYMENT:
1️⃣ UPI app open karo (GPay/PhonePe/Paytm)
2️⃣ "Send Money" ya "Pay" select karo
3️⃣ UPI ID enter karo: algimagine@ybl
4️⃣ Amount daalo: 32272
5️⃣ Pay button dabao!

🚀 Ya QR code scan karo - bahut easy hai!`,
                
                english: `📱 UPI PAYMENT DETAILS:

🏦 UPI ID: algimagine@ybl
📞 Phone: 8383848219
👨‍💼 Payee: Vicky Kumar
🎯 Amount: ₹32,272

💳 STEP-BY-STEP PAYMENT:
1️⃣ Open UPI app (GPay/PhonePe/Paytm)
2️⃣ Select "Send Money" or "Pay"
3️⃣ Enter UPI ID: algimagine@ybl
4️⃣ Enter amount: 32272
5️⃣ Press Pay button!

🚀 Or scan QR code - much easier!`
            },
            
            'deadline': {
                hinglish: `⏰ CRITICAL TIMELINE:

📅 Today: August 18, 2025
❌ Missed deadline: August 30, 2025
🚨 FINAL DEADLINE: September 4, 2025

🏛️ September 4 ke baad CONSEQUENCES:
⚖️ Police FIR filing hogi
👮‍♂️ Criminal case start
💰 Court fees add honge
📈 Amount ₹35,500+ ho jayega
🏠 Asset seizure possible

⚡ Sirf 17 din bache hain! Emergency payment karo!`,
                
                english: `⏰ CRITICAL TIMELINE:

📅 Today: August 18, 2025
❌ Missed deadline: August 30, 2025  
🚨 FINAL DEADLINE: September 4, 2025

🏛️ After September 4 CONSEQUENCES:
⚖️ Police FIR will be filed
👮‍♂️ Criminal case proceedings
💰 Court fees will be added
📈 Amount will increase to ₹35,500+
🏠 Asset seizure possible

⚡ Only 17 days left! Make emergency payment!`
            },
            
            'history': {
                hinglish: `📋 COMPLETE LOAN & PAYMENT HISTORY:

📅 FEBRUARY 2025:
💰 Loan amount: ₹40,000 disbursed

📅 APRIL 2025:
💵 Payment received: ₹26,000 (LAST payment)

📅 MAY-AUGUST 2025:
❌ ZERO PAYMENTS for 4 continuous months!

📊 CURRENT SITUATION:
💸 Outstanding: ₹14,000 + accumulated interest
📈 Total due: ₹32,272 (after generous discount)
⏰ Overdue period: 7 months total

Amit bhai, April ke baad bilkul payment nahi kiya! 😤`,
                
                english: `📋 COMPLETE LOAN & PAYMENT HISTORY:

📅 FEBRUARY 2025:
💰 Loan amount: ₹40,000 disbursed

📅 APRIL 2025:
💵 Payment received: ₹26,000 (LAST payment)

📅 MAY-AUGUST 2025:
❌ ZERO PAYMENTS for 4 continuous months!

📊 CURRENT SITUATION:
💸 Outstanding: ₹14,000 + accumulated interest
📈 Total due: ₹32,272 (after generous discount)
⏰ Overdue period: 7 months total

Clear pattern - no payment since April! 😤`
            },
            
            'contact': {
                hinglish: `📞 VICKY KUMAR - CONTACT DETAILS:

👨‍💼 Name: Vicky Kumar
📱 Mobile: 8383848219
📧 UPI ID: algimagine@ybl
🏢 Role: AI Engineer & Collection Agent

⏰ SUPPORT AVAILABILITY:
🕐 24/7 payment assistance
📞 Instant call support
💬 Real-time chat (yahan)
🚀 Technical help available

🔧 PAYMENT SUPPORT SERVICES:
✅ QR code scanning issues
✅ UPI payment problems
✅ PayU gateway assistance
✅ Bank transfer guidance

Emergency hai toh abhi call karo! 📞`,
                
                english: `📞 VICKY KUMAR - CONTACT DETAILS:

👨‍💼 Name: Vicky Kumar
📱 Mobile: 8383848219
📧 UPI ID: algimagine@ybl
🏢 Role: AI Engineer & Collection Agent

⏰ SUPPORT AVAILABILITY:
🕐 24/7 payment assistance
📞 Instant call support
💬 Real-time chat (here)
🚀 Technical help available

🔧 PAYMENT SUPPORT SERVICES:
✅ QR code scanning issues
✅ UPI payment problems
✅ PayU gateway assistance
✅ Bank transfer guidance

Emergency? Call immediately! 📞`
            }
        };
        
        const response = responses[type] ? responses[type][this.currentLanguage] || responses[type]['hinglish'] : 'Information not available. Please contact 8383848219.';
        
        // Add the response to chat using the global function
        addAIMessage(response);
        
        // Special action for QR code - highlight and scroll to QR section
        if (type === 'qr') {
            setTimeout(() => {
                const qrSection = document.querySelector('.qr-code-premium-section');
                if (qrSection) {
                    qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Add highlight effect
                    qrSection.style.border = '4px solid #ffc107';
                    qrSection.style.boxShadow = '0 0 25px rgba(255, 193, 7, 0.8)';
                    qrSection.style.transform = 'scale(1.02)';
                    qrSection.style.transition = 'all 0.3s ease';
                    
                    // Remove highlight after 3 seconds
                    setTimeout(() => {
                        qrSection.style.border = '3px solid #28a745';
                        qrSection.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.15)';
                        qrSection.style.transform = 'scale(1)';
                    }, 3000);
                }
            }, 1000);
        }
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
        this.setupAutoSoundReminder(); // Start auto sound reminder every 3 minutes
        this.initializeChatContext(); // Initialize enhanced chat context
        this.addQuickQuestionButtons(); // Add quick question functionality
        this.showDiscountNotification();
    }

    showDiscountNotification() {
        setTimeout(() => {
            this.showToast(`🎉 Special Discount! Save ₹${this.discountAmount}! Pay ₹${this.currentAmount} instead of ₹${this.totalCalculatedAmount}!`, 'success');
        }, 3000);
    }
    
    // Setup automatic sound reminder every 3 minutes
    setupAutoSoundReminder() {
        // Clear any existing interval
        if (this.autoSoundInterval) {
            clearInterval(this.autoSoundInterval);
        }
        
        this.autoSoundInterval = setInterval(() => {
            if (this.soundEnabled) {
                this.playUrgentReminder();
                this.speakMessage('Amit bhai, payment reminder! Please pay ₹32,272 urgently. Contact Vicky at 8383848219.');
            }
        }, 180000); // 3 minutes = 180,000 milliseconds
        
        console.log('Auto sound reminder set for every 3 minutes');
    }
    
    // Initialize enhanced chat context with loan details
    initializeChatContext() {
        this.loanContextForAI = `
        ENHANCED LOAN CONTEXT FOR AI ASSISTANT:
        
        CUSTOMER DETAILS:
        - Name: Amit Arya (Son of Harish Chander)
        - Phone: 8287217710
        - Account ID: #AA-2025-001
        
        LOAN HISTORY:
        - Original Loan Amount: ₹40,000 (taken in February 2025)
        - Only Payment Made: ₹26,000 (paid in April 2025)
        - Outstanding Principal: ₹14,000
        - Months Since Last Payment: 4 months (May-August 2025)
        - Total Overdue Period: 7 months from loan date
        
        CURRENT FINANCIAL CALCULATION:
        - Principal Outstanding: ₹14,000
        - Monthly Interest (5%): Applied for 7 months
        - Late Fees: ₹1,100
        - IGST: ₹311
        - GST: ₹100
        - Total Calculated Amount: ₹33,000+
        - SPECIAL DISCOUNT OFFER: ₹32,272 (Save ₹728)
        
        DEADLINES & CONSEQUENCES:
        - Current Overdue: August 30, 2025
        - Final Deadline: September 4, 2025
        - After September 4: FIR filing, court case, legal fees
        
        PAYMENT DETAILS:
        - Lender: Vicky Kumar (AI Engineer & Collection Agent)
        - Phone: 8383848219
        - UPI ID: algimagine@ybl
        - Preferred Amount: ₹32,272 (discounted from ₹33,000+)
        
        CONTEXT FOR RESPONSES:
        - Be firm but professional
        - Emphasize the discount being offered
        - Mention legal consequences after September 4
        - Always provide payment options (UPI, QR code, bank details)
        - Show payment history to demonstrate non-payment pattern
        `;
        
        console.log('Enhanced AI Chatbot Context Initialized');
    }
    
    // Add quick question buttons to chatbot
    addQuickQuestionButtons() {
        // This will be called after the chat interface is ready
        setTimeout(() => {
            const chatMessagesDiv = document.getElementById('chatMessages');
            if (chatMessagesDiv) {
                const quickQuestionsHTML = `
                    <div class="quick-questions" style="margin: 15px 0; padding: 15px; background: linear-gradient(135deg, #f0f8ff, #e6f3ff); border-radius: 12px; border: 2px solid #667eea; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);">
                        <h4 style="margin: 0 0 12px 0; color: #667eea; font-size: 14px; text-align: center; font-weight: 600;">
                            <i class="fas fa-bolt" style="margin-right: 5px;"></i> Quick Questions
                        </h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button onclick="askQuickQuestion('qr')" style="background: linear-gradient(135deg, #28a745, #20c997); color: white; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);">
                                <i class="fas fa-qrcode"></i> Show QR Code
                            </button>
                            <button onclick="askQuickQuestion('amount')" style="background: linear-gradient(135deg, #ffc107, #ffb300); color: #333; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(255, 193, 7, 0.3);">
                                <i class="fas fa-rupee-sign"></i> Amount Due
                            </button>
                            <button onclick="askQuickQuestion('upi')" style="background: linear-gradient(135deg, #17a2b8, #138496); color: white; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(23, 162, 184, 0.3);">
                                <i class="fab fa-google-pay"></i> UPI Details
                            </button>
                            <button onclick="askQuickQuestion('deadline')" style="background: linear-gradient(135deg, #dc3545, #c82333); color: white; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);">
                                <i class="fas fa-clock"></i> Deadline
                            </button>
                            <button onclick="askQuickQuestion('history')" style="background: linear-gradient(135deg, #6f42c1, #5a32a3); color: white; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(111, 66, 193, 0.3);">
                                <i class="fas fa-history"></i> Payment History
                            </button>
                            <button onclick="askQuickQuestion('contact')" style="background: linear-gradient(135deg, #fd7e14, #e8590c); color: white; border: none; padding: 8px 12px; border-radius: 20px; font-size: 11px; cursor: pointer; transition: all 0.3s; box-shadow: 0 2px 6px rgba(253, 126, 20, 0.3);">
                                <i class="fas fa-phone"></i> Contact Info
                            </button>
                        </div>
                    </div>
                `;
                chatMessagesDiv.insertAdjacentHTML('beforeend', quickQuestionsHTML);
            }
        }, 2000);
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
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang}) - ${v.gender || 'unknown gender'}`));
        
        // Prioritize Indian English MALE voices first with specific male voice names
        this.hindiVoice = voices.find(voice => 
            (voice.lang.includes('en-IN') && (
                voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('ravi') ||
                voice.name.toLowerCase().includes('kiran') ||
                voice.name.toLowerCase().includes('hemant') ||
                voice.name.toLowerCase().includes('google') ||
                voice.name.toLowerCase().includes('microsoft david') ||
                voice.name.toLowerCase().includes('david')
            ))
        ) || 
        // Then try Hindi male voices
        voices.find(voice => 
            (voice.lang.includes('hi') && (
                voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('google')
            ))
        ) ||
        // Then try any English male voice
        voices.find(voice => 
            voice.lang.includes('en') && (
                voice.name.toLowerCase().includes('male') ||
                voice.name.toLowerCase().includes('david') ||
                voice.name.toLowerCase().includes('mark') ||
                voice.name.toLowerCase().includes('james') ||
                voice.name.toLowerCase().includes('google') && !voice.name.toLowerCase().includes('female')
            )
        ) ||
        // Fallback to Indian English
        voices.find(voice => voice.lang.includes('en-IN')) || 
        voices[0];
        
        console.log('Selected voice for male speech:', this.hindiVoice?.name || 'Default');
    }

    speakHinglish(text) {
        if (!this.soundEnabled) return;
        
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.hindiVoice;
        utterance.rate = 0.95; // Slightly faster for energetic young boy
        utterance.pitch = 1.4; // Higher pitch for young boy voice
        utterance.volume = 1.0; // Maximum volume
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
        const upiId = this.lenderUpiId; // Updated to use new UPI ID
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
            this.showToast(`Opening ${app.toUpperCase()}... UPI ID: ${upiId}`, 'info');
        }
    }

    showUPIModal() {
        const upiModalElement = document.getElementById('upiModal');
        if (upiModalElement) {
            upiModalElement.style.display = 'flex';
        } else {
            console.error('UPI Modal element not found');
            this.showToast('UPI options not available', 'error');
        }
    }

    initiateAdvancedUPI(type) {
        const amount = type === 'full' ? this.currentAmount : null;
        
        if (amount) {
            // Direct payment with full amount
            this.showToast(`Preparing payment of ₹${amount} to ${this.lenderUpiId}`, 'info');
            setTimeout(() => {
                this.payWithSpecificUPI('gpay', amount); // Default to Google Pay
            }, 1000);
        } else {
            // Show modal for custom amount
            this.showUPIModal();
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

function initiateAdvancedUPI(type) {
    if (paymentSystem) {
        paymentSystem.initiateAdvancedUPI(type);
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

// PayU Gateway Integration
function openPayUGateway() {
    // Open PayU gateway in a new window
    const payuUrl = 'https://u.payu.in/aI2M9cqc5ui6';
    window.open(payuUrl, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    // Show confirmation dialog
    setTimeout(() => {
        if (confirm('PayU Gateway opened in new window. Click OK when payment is completed to update status.')) {
            paymentSystem.showPaymentSuccess();
        }
    }, 2000);
}

// Intelligent AI Chatbot Functions
let currentLanguage = 'hinglish';
let chatContext = {
    customerName: 'Amit',
    amount: '₹32,272',
    dueDate: 'August 30',
    nextInstallment: 'September 4',
    savings: '₹1,916'
};

function toggleAIChat() {
    const chatInterface = document.getElementById('aiChatInterface');
    if (chatInterface.style.display === 'none' || !chatInterface.style.display) {
        chatInterface.style.display = 'block';
        // Add initial message if none exist
        const messages = document.getElementById('chatMessages');
        if (messages.children.length === 1) {
            const initialMessage = getContextualResponse('initial');
            addAIMessage(initialMessage);
        }
        
        // Welcome speech when chat opens
        setTimeout(() => {
            speakBankingMessage("Namaste Amit bhai! Main Vicky hun aapka collection agent. Aapka payment pending hai, urgent hai baat!", true);
        }, 1000);
    } else {
        chatInterface.style.display = 'none';
        // Stop any ongoing speech
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
}

// Gemini AI Integration
async function getGeminiResponse(userMessage) {
    try {
        const apiKey = 'YOUR_HUGGING_FACE_API_KEY_HERE'; // Replace with your actual API key
        const apiUrl = 'https://api-inference.huggingface.co/models/google/gemma-2b-it';
        
        const context = `You are Vicky Kumar, an AI lending agent. Customer Amit Arya owes ₹32,272 (discounted from ₹34,188). Payment was due August 30, next deadline September 4. Respond in Hinglish (Hindi-English mix) naturally. Be helpful but urgent about payment.`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: `${context}\n\nUser: ${userMessage}\nVicky Kumar:`,
                parameters: {
                    max_new_tokens: 100,
                    temperature: 0.7,
                    return_full_text: false
                }
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0].generated_text) {
                return data[0].generated_text.trim();
            }
        }
    } catch (error) {
        console.log('Gemini API error, using fallback:', error);
    }
    
    // Fallback to local responses
    return getAIResponse(userMessage);
}

// Update sendMessage to use Gemini API
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addUserMessage(message);
        input.value = '';
        input.focus(); // Keep focus on input
        
        // Show typing indicator
        showTypingIndicator();
        
        // Get AI response (try Gemini first, fallback to local)
        try {
            const response = await getGeminiResponse(message);
            hideTypingIndicator();
            addAIMessage(response);
        } catch (error) {
            hideTypingIndicator();
            const fallbackResponse = getAIResponse(message);
            addAIMessage(fallbackResponse);
        }
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typingIndicator';
    typingDiv.className = 'message agent-message typing';
    typingDiv.style.marginBottom = '15px';
    
    typingDiv.innerHTML = `
        <div class="message-content" style="background: #667eea; color: white; padding: 10px 15px; border-radius: 15px 15px 15px 5px; max-width: 80%; display: inline-block;">
            <p style="margin: 0; font-size: 14px;">
                <span class="typing-dots">Vicky typing</span>
                <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
            </p>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.textAlign = 'right';
    
    messageDiv.innerHTML = `
        <div class="message-content" style="background: #e3f2fd; color: #1976d2; padding: 10px 15px; border-radius: 15px 15px 5px 15px; max-width: 80%; display: inline-block;">
            <p style="margin: 0; font-size: 14px;">${message}</p>
            <span style="font-size: 11px; opacity: 0.8;">Just now</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addAIMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message agent-message';
    messageDiv.style.marginBottom = '15px';
    
    // Generate unique ID for this message
    const messageId = 'msg-' + Date.now();
    
    messageDiv.innerHTML = `
        <div class="message-content" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 16px; border-radius: 18px 18px 18px 6px; max-width: 85%; display: inline-block; box-shadow: 0 3px 12px rgba(102, 126, 234, 0.3);">
            <p style="margin: 0; font-size: 14px; line-height: 1.4;" data-original="${message.replace(/"/g, '&quot;')}">${message}</p>
            <span style="font-size: 11px; opacity: 0.9; display: block; margin-top: 5px;">Just now</span>
        </div>
        <div class="message-actions" style="display: flex; gap: 5px; margin-top: 5px; opacity: 0; transition: opacity 0.3s ease;">
            <button class="translate-btn" onclick="translateMessage(this, 'english')" title="Translate to English">
                <i class="fas fa-language"></i> English
            </button>
            <button class="speak-btn" onclick="speakMessage(this)" title="Speak this message">
                <i class="fas fa-volume-up"></i> Speak
            </button>
            <button class="copy-btn" onclick="copyMessage(this)" title="Copy message">
                <i class="fas fa-copy"></i> Copy
            </button>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add hover effect to show actions
    messageDiv.addEventListener('mouseenter', () => {
        const actions = messageDiv.querySelector('.message-actions');
        if (actions) actions.style.opacity = '1';
    });
    
    messageDiv.addEventListener('mouseleave', () => {
        const actions = messageDiv.querySelector('.message-actions');
        if (actions) actions.style.opacity = '0';
    });
    
    // Auto-speak if sound is enabled and it's not a quick question response
    if (window.paymentSystem && window.paymentSystem.soundEnabled && !message.includes('📱 QR CODE DETAILS')) {
        setTimeout(() => {
            if (window.paymentSystem) {
                window.paymentSystem.speakHinglish(message);
            }
        }, 500);
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.textAlign = 'right';
    
    messageDiv.innerHTML = `
        <div class="message-content" style="background: #e3f2fd; color: #333; padding: 10px 15px; border-radius: 15px 15px 5px 15px; max-width: 80%; display: inline-block; margin-left: auto;">
            <p style="margin: 0; font-size: 14px;">${message}</p>
            <span style="font-size: 11px; opacity: 0.6;">Just now</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Enhanced loan context
    const loanContext = {
        originalLoan: 40000,
        paidAmount: 26000,
        lastPaymentDate: 'April 2025',
        monthsOverdue: 7,
        currentDue: 32272,
        originalCalculation: 33000,
        savings: 728,
        lateFees: 1100,
        igst: 311,
        gst: 100
    };
    
    // Check if Vicky Kumar is identifying himself
    if (message.includes('vicky kumar') || message.includes('i am vicky') || message.includes('main vicky hun')) {
        currentLanguage = 'hinglish';
        return `🎉 Welcome boss Vicky Kumar! Aap login ho gaye! Admin access activated. 
        
📊 AMIT'S COMPLETE LOAN DETAILS:
💰 Original Loan: ₹40,000 (Feb 2025)
💵 Amount Paid: ₹26,000 (April 2025 only)
⏰ Overdue Period: 7 months
💸 Current Due: ₹32,272 (Discounted from ₹33,000)
📅 Deadline: September 4, 2025
⚠️ Status: CRITICAL - Legal action pending

Kya update karna hai boss? 👨‍💼`;
    }
    
    if (currentLanguage === 'hinglish') {
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return `Namaste Amit bhai! Main Vicky hun, aapka AI collection agent. 
            
📊 AAPKA LOAN STATUS:
💰 February mein ₹40,000 loan liya tha
💵 Sirf April mein ₹26,000 pay kiya
⏰ 7 mahine se koi payment nahi
💸 Current due: ₹32,272 (₹728 discount diya hai)
📅 Final deadline: September 4, 2025

Jaldi payment kar dijiye bhai! 💰`;
        }
        
        else if (message.includes('history') || message.includes('payment history') || message.includes('details')) {
            return `📋 COMPLETE PAYMENT HISTORY:

📅 February 2025: ₹40,000 loan disbursed
💵 April 2025: ₹26,000 received (only payment till date)
❌ May-August 2025: NO PAYMENTS (4 months)

📊 CALCULATION BREAKDOWN:
💰 Outstanding: ₹14,000 (principal)
📈 Interest (5% x 7 months): ₹8,000+
💸 Late fees: ₹1,100
🧾 IGST: ₹311, GST: ₹100
Total: ₹33,000+ ➡️ Discounted to ₹32,272

Pattern dekho Amit bhai - April ke baad koi payment nahi! �`;
        }
        
        else if (message.includes('pay') || message.includes('payment') || message.includes('amount')) {
            return `💰 PAYMENT DETAILS:

🎯 Pay karna hai: ₹32,272 (Special discount!)
💵 Original calculation: ₹33,000+
🎉 Aapko ₹728 ki saving ho rahi hai!

💳 PAYMENT OPTIONS:
📱 UPI: algimagine@ybl
📱 Phone: 8383848219
📲 QR Code: Scan karo instant payment ke liye
💻 PayU Gateway: All cards, net banking

Amit bhai, 7 months se wait kar rahe hain. Jaldi action lo! 🚀`;
        }
        
        else if (message.includes('time') || message.includes('date') || message.includes('deadline')) {
            return `⏰ IMPORTANT DEADLINES:

📅 Today: August 18, 2025
❌ Missed deadline: August 30, 2025
🚨 FINAL DEADLINE: September 4, 2025

🏛️ September 4 ke baad:
⚖️ FIR filing
👮‍♂️ Police case
💰 Court fees
📈 Amount increase to ₹35,500+

Sirf 17 din bache hain bhai! Legal mess mein mat padiye! ⚠️`;
        }
        
        else if (message.includes('why') || message.includes('kitna') || message.includes('calculation')) {
            return `🧮 DETAILED CALCULATION:

📊 February 2025: ₹40,000 loan liya
💵 April 2025: ₹26,000 pay kiya
💰 Outstanding: ₹14,000

📈 INTEREST CALCULATION (7 months @ 5%):
💸 May: ₹700, June: ₹735, July: ₹772
💸 August: ₹810, Sept: ₹850... Total: ₹8,000+

📋 ADDITIONAL CHARGES:
💸 Late fee: ₹1,100
🧾 IGST: ₹311
🧾 GST: ₹100

🎯 Total: ₹33,000+ ➡️ Discount diya ₹32,272
Samjh gaya calculation? 🤔`;
        }
        
        else {
            return `Samjha Amit bhai! 7 months ka pending payment hai. ₹40,000 liya tha February mein, sirf ₹26,000 April mein diya. Ab ₹32,272 pay karo - discount mil raha hai! QR scan karo ya PayU use karo. September 4 ke baad legal action! 🤖`;
        }
    } else {
        // English responses with enhanced context
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return `Hello Amit! I'm Vicky, your AI collection agent.
            
📊 YOUR LOAN STATUS:
💰 Loan taken: ₹40,000 (February 2025)
💵 Amount paid: ₹26,000 (April 2025 only)
⏰ Overdue: 7 months with no payment
💸 Current due: ₹32,272 (₹728 discount given)
📅 Final deadline: September 4, 2025

Please make payment urgently! 💰`;
        }
        
        else if (message.includes('history') || message.includes('payment history') || message.includes('details')) {
            return `📋 COMPLETE PAYMENT HISTORY:

📅 February 2025: ₹40,000 loan disbursed
💵 April 2025: ₹26,000 received (only payment to date)
❌ May-August 2025: NO PAYMENTS (4 months)

📊 CALCULATION BREAKDOWN:
💰 Outstanding: ₹14,000 (principal)
📈 Interest (5% x 7 months): ₹8,000+
💸 Late fees: ₹1,100
🧾 IGST: ₹311, GST: ₹100
Total: ₹33,000+ ➡️ Discounted to ₹32,272

Notice the pattern - no payment since April! 😤`;
        }
        
        else {
            return `Understood Amit! 7 months pending payment. Took ₹40,000 in February, paid only ₹26,000 in April. Now pay ₹32,272 - discount offered! Scan QR or use PayU. Legal action after September 4! 🤖`;
        }
    }
}

function getContextualResponse(type) {
    if (currentLanguage === 'hinglish') {
        switch (type) {
            case 'initial':
                return `Amit bhai! Urgent message! August 30 ka payment miss ho gaya hai. Abhi ${chatContext.amount} pay karo aur ${chatContext.savings} save karo! September 4 ke baad legal action! 🚨`;
            default:
                return `Namaste! Main Vicky hun, aapka payment agent. Kya help chahiye? 😊`;
        }
    } else {
        switch (type) {
            case 'initial':
                return `${chatContext.customerName}! Urgent message! August 30 payment was missed. Pay ${chatContext.amount} now and save ${chatContext.savings}! Legal action after September 4! 🚨`;
            default:
                return `Hello! I'm Vicky, your payment agent. How can I help? 😊`;
        }
    }
}

function translateMessage(button) {
    const messageContent = button.previousElementSibling.querySelector('p');
    const currentText = messageContent.textContent;
    
    // Simple translation logic (in real app, use translation API)
    if (button.textContent.includes('English')) {
        // Translate to English
        const translatedText = translateToEnglish(currentText);
        messageContent.textContent = translatedText;
        button.textContent = 'Hindi mein padhiye';
    } else {
        // Translate to Hindi/Hinglish
        const translatedText = translateToHinglish(currentText);
        messageContent.textContent = translatedText;
        button.textContent = 'English me padhiye';
    }
}

function translateToEnglish(text) {
    // Basic translation mapping
    const translations = {
        'Namaste Amit bhai! Mai Vicky hun, aapka AI lending agent. Aapka payment ka status dekhte hain...': 'Hello Amit! I am Vicky, your AI lending agent. Let me check your payment status...',
        'Amit bhai! Urgent message! August 30 ka payment miss ho gaya hai.': 'Amit! Urgent message! August 30 payment was missed.',
        'jaldi kar dijiye': 'please do it quickly',
        'bachenge': 'will be saved',
        'samjha nahi': 'did not understand'
    };
    
    for (let [hindi, english] of Object.entries(translations)) {
        if (text.includes(hindi)) {
            return text.replace(hindi, english);
        }
    }
    
    return text; // Return original if no translation found
}

function translateToHinglish(text) {
    // Basic reverse translation
    const translations = {
        'Hello Amit! I am Vicky, your AI lending agent.': 'Namaste Amit bhai! Mai Vicky hun, aapka AI lending agent.',
        'please do it quickly': 'jaldi kar dijiye',
        'will be saved': 'bachenge',
        'did not understand': 'samjha nahi'
    };
    
    for (let [english, hindi] of Object.entries(translations)) {
        if (text.includes(english)) {
            return text.replace(english, hindi);
        }
    }
    
    return text;
}

// Text-to-Speech Function for Bank Agent Voice
function speakMessage(message, language) {
    if ('speechSynthesis' in window) {
        // Cancel any previous speech
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance();
        
        // Clean message for better speech
        let speechText = message.replace(/🤖|💰|⏰|🎉|🚀|📞|⚡|🔊|😊|💡|✅/g, '');
        speechText = speechText.replace(/₹/g, 'rupaye ');
        speechText = speechText.replace(/32,272/g, 'battis hazar do sau bahattar');
        speechText = speechText.replace(/1,916/g, 'ek hazar nau sau solah');
        speechText = speechText.replace(/August 30/g, 'August tees');
        speechText = speechText.replace(/September 4/g, 'September char');
        
        utterance.text = speechText;
        
        // Configure voice for Indian English/Hindi mix
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.1; // Slightly higher pitch for urgency
        utterance.volume = 0.8;
        
        // Try to find an Indian English voice
        const voices = speechSynthesis.getVoices();
        const indianVoice = voices.find(voice => 
            voice.lang.includes('en-IN') || 
            voice.name.includes('Indian') || 
            voice.name.includes('India') ||
            voice.lang.includes('hi-IN')
        );
        
        if (indianVoice) {
            utterance.voice = indianVoice;
        } else {
            // Fallback to any English voice
            const englishVoice = voices.find(voice => voice.lang.includes('en'));
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
        }
        
        // Add urgency to the voice based on content
        if (message.includes('URGENT') || message.includes('urgent') || message.includes('deadline')) {
            utterance.rate = 1.1;
            utterance.pitch = 1.2;
        }
        
        // Add speaking indicator
        const speakingIndicator = document.createElement('div');
        speakingIndicator.id = 'speakingIndicator';
        speakingIndicator.style.cssText = `
            position: fixed; bottom: 140px; right: 20px; background: #667eea; color: white; 
            padding: 10px 15px; border-radius: 20px; font-size: 12px; z-index: 1001;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3); animation: pulse 1.5s infinite;
        `;
        speakingIndicator.innerHTML = '<i class="fas fa-volume-up"></i> Vicky speaking...';
        document.body.appendChild(speakingIndicator);
        
        utterance.onend = () => {
            const indicator = document.getElementById('speakingIndicator');
            if (indicator) {
                indicator.remove();
            }
        };
        
        utterance.onerror = () => {
            const indicator = document.getElementById('speakingIndicator');
            if (indicator) {
                indicator.remove();
            }
        };
        
        speechSynthesis.speak(utterance);
    }
}

function toggleLanguage() {
    const toggleButton = document.getElementById('languageToggle');
    
    if (currentLanguage === 'hinglish') {
        currentLanguage = 'english';
        toggleButton.innerHTML = '<i class="fas fa-language"></i> Switch to Hinglish';
    } else {
        currentLanguage = 'hinglish';
        toggleButton.innerHTML = '<i class="fas fa-language"></i> Switch to English';
    }
    
    // Add system message about language change
    const langMessage = currentLanguage === 'english' 
        ? "Language switched to English. How can I help you with your payment?"
        : "Language Hindi/English mix mein switch ho gayi. Payment ke liye kya help chahiye?";
    
    addAIMessage(langMessage);
}

// Enhanced voice with banking professional tone
function speakBankingMessage(message, isUrgent = false) {
    const bankingPhrases = {
        'payment pending': 'aapka payment pending hai sir',
        'pay now': 'abhi payment kar dijiye',
        'deadline': 'deadline aa rahi hai',
        'legal action': 'legal action lena padega',
        'discount': 'special discount offer',
        'save money': 'paisa bachega'
    };
    
    let enhancedMessage = message;
    Object.keys(bankingPhrases).forEach(key => {
        enhancedMessage = enhancedMessage.replace(new RegExp(key, 'gi'), bankingPhrases[key]);
    });
    
    speakMessage(enhancedMessage, currentLanguage);
}

// Add event listener for Enter key in chat input
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add CSS for typing animation and speaking indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots .dot {
            animation: typing 1.4s infinite;
        }
        .typing-dots .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-dots .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typing {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .payment-methods-container {
            width: 100% !important;
            max-width: none !important;
        }
        
        @media (max-width: 768px) {
            .qr-code-container img {
                width: 200px !important;
                height: 200px !important;
            }
            .payment-methods-container {
                padding: 15px !important;
            }
        }
        
        .qr-code-container img {
            transition: transform 0.3s ease;
        }
        
        .qr-code-container img:hover {
            transform: scale(1.05);
        }
        
        .payu-gateway-section button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;
        }
        
        .speak-btn:hover {
            color: #28a745 !important;
        }
        
        #speakingIndicator {
            animation: pulse 1.5s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Make sure voices are loaded
    if ('speechSynthesis' in window) {
        speechSynthesis.onvoiceschanged = () => {
            console.log('Voices loaded for text-to-speech');
        };
    }
});

// Global function for copying UPI ID
function copyUPIID() {
    if (window.paymentSystem) {
        window.paymentSystem.copyUPIID();
    }
}

// Handle quick question responses
function handleQuickQuestion(type) {
    const responses = {
        'qr': {
            hinglish: `📱 QR CODE DETAILS:

🔍 QR Code location: vicky_upi.jpg file mein hai
💰 Amount: ₹32,272 (auto-fill ho jayega)
📱 UPI ID: algimagine@ybl

📲 COMPATIBLE APPS:
✅ Google Pay, PhonePe, Paytm, BHIM
✅ Amazon Pay, Cred, FreeCharge
✅ All UPI apps

🚀 Scan karo aur instant payment karo! QR code neeche payment section mein dikha hai. Scroll down karo! 📲`,
            
            english: `📱 QR CODE DETAILS:

🔍 QR Code location: Available in vicky_upi.jpg
💰 Amount: ₹32,272 (auto-fills after scan)
📱 UPI ID: algimagine@ybl

📲 COMPATIBLE APPS:
✅ Google Pay, PhonePe, Paytm, BHIM
✅ Amazon Pay, Cred, FreeCharge
✅ All UPI enabled apps

🚀 Scan and make instant payment! QR code is shown in payment section below. Scroll down! 📲`
        },
        
        'amount': {
            hinglish: `💰 AMOUNT BREAKDOWN:

🎯 Final Amount: ₹32,272
💸 Original calculation: ₹33,000+
🎉 Discount: ₹728 (Special offer!)

📊 DETAILED CALCULATION:
💰 Outstanding principal: ₹14,000
📈 Interest (7 months @ 5%): ₹8,000+
💸 Late fee: ₹1,100
🧾 IGST: ₹311, GST: ₹100

⏰ Ye discount sirf September 4 tak valid hai!`,
            
            english: `💰 AMOUNT BREAKDOWN:

🎯 Final Amount: ₹32,272
💸 Original calculation: ₹33,000+
🎉 Discount: ₹728 (Special offer!)

📊 DETAILED CALCULATION:
💰 Outstanding principal: ₹14,000
📈 Interest (7 months @ 5%): ₹8,000+
💸 Late fee: ₹1,100
🧾 IGST: ₹311, GST: ₹100

⏰ This discount valid only till September 4!`
        },
        
        'upi': {
            hinglish: `📱 UPI PAYMENT DETAILS:

🏦 UPI ID: algimagine@ybl
📞 Phone: 8383848219
👨‍💼 Name: Vicky Kumar
🎯 Amount: ₹32,272

💳 PAYMENT STEPS:
1️⃣ Apna UPI app kholo
2️⃣ 'Send Money' select karo
3️⃣ UPI ID: algimagine@ybl enter karo
4️⃣ Amount: 32272 daalo
5️⃣ Send karo!

🚀 Ya fir QR code scan karo - easier hai!`,
            
            english: `📱 UPI PAYMENT DETAILS:

🏦 UPI ID: algimagine@ybl
📞 Phone: 8383848219
👨‍💼 Name: Vicky Kumar
🎯 Amount: ₹32,272

💳 PAYMENT STEPS:
1️⃣ Open your UPI app
2️⃣ Select 'Send Money'
3️⃣ Enter UPI ID: algimagine@ybl
4️⃣ Enter Amount: 32272
5️⃣ Send payment!

🚀 Or simply scan QR code - it's easier!`
        },
        
        'deadline': {
            hinglish: `⏰ CRITICAL DEADLINES:

📅 Today: August 18, 2025
❌ Missed: August 30, 2025 (Original due date)
🚨 FINAL: September 4, 2025

🏛️ September 4 ke baad consequences:
⚖️ Police FIR filing
👮‍♂️ Criminal case
💰 Court fees & legal costs
📈 Amount ₹35,500+ ho jayega

⚡ Sirf 17 din bache hain! Jaldi action lo!`,
            
            english: `⏰ CRITICAL DEADLINES:

📅 Today: August 18, 2025
❌ Missed: August 30, 2025 (Original due date)
🚨 FINAL: September 4, 2025

🏛️ After September 4 consequences:
⚖️ Police FIR filing
👮‍♂️ Criminal case proceedings
💰 Court fees & legal costs
📈 Amount will increase to ₹35,500+

⚡ Only 17 days left! Take action now!`
        },
        
        'history': {
            hinglish: `📋 COMPLETE PAYMENT HISTORY:

📅 February 2025:
💰 Loan disbursed: ₹40,000

📅 April 2025:
💵 Payment received: ₹26,000 (Last payment)

📅 May-August 2025:
❌ NO PAYMENTS for 4 months straight!

📊 CURRENT STATUS:
💸 Outstanding: ₹14,000 + interest & fees
📈 Total due: ₹32,272 (after discount)
⏰ Overdue period: 7 months

Pattern clear hai - April ke baad koi payment nahi!`,
            
            english: `📋 COMPLETE PAYMENT HISTORY:

📅 February 2025:
💰 Loan disbursed: ₹40,000

📅 April 2025:
💵 Payment received: ₹26,000 (Last payment)

📅 May-August 2025:
❌ NO PAYMENTS for 4 months straight!

📊 CURRENT STATUS:
💸 Outstanding: ₹14,000 + interest & fees
📈 Total due: ₹32,272 (after discount)
⏰ Overdue period: 7 months

Pattern is clear - no payment since April!`
        },
        
        'contact': {
            hinglish: `📞 CONTACT INFORMATION:

👨‍💼 Lender: Vicky Kumar
📱 Phone: 8383848219
📧 UPI ID: algimagine@ybl
🏢 Designation: AI Engineer & Collection Agent

⏰ AVAILABILITY:
🕐 24/7 for payment assistance
📞 Call for urgent support
💬 Chat here for instant help

🚀 PAYMENT SUPPORT:
✅ QR code scanning help
✅ UPI payment guidance  
✅ PayU gateway assistance
✅ Technical issues resolution

Koi bhi problem ho toh call karo!`,
            
            english: `📞 CONTACT INFORMATION:

👨‍💼 Lender: Vicky Kumar
📱 Phone: 8383848219
📧 UPI ID: algimagine@ybl
🏢 Designation: AI Engineer & Collection Agent

⏰ AVAILABILITY:
🕐 24/7 for payment assistance
📞 Call for urgent support
💬 Chat here for instant help

🚀 PAYMENT SUPPORT:
✅ QR code scanning help
✅ UPI payment guidance
✅ PayU gateway assistance  
✅ Technical issues resolution

Contact immediately for any issues!`
        }
    };
    
    const response = responses[type] ? responses[type][currentLanguage] : responses[type]['hinglish'];
    
    // Add the response to chat
    this.addAIMessage(response);
    
    // Special action for QR code
    if (type === 'qr') {
        setTimeout(() => {
            const qrSection = document.querySelector('.qr-code-premium-section');
            if (qrSection) {
                qrSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                qrSection.style.border = '4px solid #ffc107';
                qrSection.style.boxShadow = '0 0 20px rgba(255, 193, 7, 0.6)';
                setTimeout(() => {
                    qrSection.style.border = '3px solid #28a745';
                    qrSection.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.15)';
                }, 3000);
            }
        }, 1000);
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

// Global function for quick questions (for HTML button integration)
function askQuickQuestion(type) {
    console.log('askQuickQuestion called with type:', type);
    if (window.paymentSystem) {
        console.log('PaymentSystem found, calling handleQuickQuestion');
        window.paymentSystem.handleQuickQuestion(type);
    } else {
        console.log('PaymentSystem not found, showing alert');
        alert('System loading... Please wait a moment and try again.');
    }
}

// Enhanced Translate Message Function
function translateMessage(button, targetLang) {
    const messageContent = button.closest('.message').querySelector('.message-content p');
    const originalText = messageContent.getAttribute('data-original') || messageContent.textContent;
    
    // Store original text if not already stored
    if (!messageContent.getAttribute('data-original')) {
        messageContent.setAttribute('data-original', originalText);
    }
    
    // Translation mappings
    const translations = {
        'Namaste Amit bhai! Mai Vicky hun, aapka AI collection agent. Aapka payment ka status check kar raha hun... 🤖': {
            english: 'Hello Amit brother! I am Vicky, your AI collection agent. I am checking your payment status... 🤖',
            hinglish: 'Namaste Amit bhai! Mai Vicky hun, aapka AI collection agent. Aapka payment ka status check kar raha hun... 🤖'
        }
    };
    
    if (targetLang === 'english') {
        const englishText = translations[originalText]?.english || 'Translation not available';
        messageContent.textContent = englishText;
        button.innerHTML = '<i class="fas fa-language"></i> हिंदी';
        button.setAttribute('onclick', "translateMessage(this, 'hinglish')");
    } else {
        messageContent.textContent = originalText;
        button.innerHTML = '<i class="fas fa-language"></i> English';
        button.setAttribute('onclick', "translateMessage(this, 'english')");
    }
    
    // Visual feedback
    messageContent.style.animation = 'fadeIn 0.3s ease';
    setTimeout(() => {
        messageContent.style.animation = '';
    }, 300);
}

// Enhanced Speak Message Function
function speakMessage(button) {
    const messageContent = button.closest('.message').querySelector('.message-content p');
    const textToSpeak = messageContent.textContent;
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        button.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
        button.style.color = '#667eea';
        return;
    }
    
    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice settings for male Indian voice
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice => 
        (voice.lang.includes('en-IN') || voice.lang.includes('hi')) && 
        (voice.name.toLowerCase().includes('male') || 
         voice.name.toLowerCase().includes('ravi') ||
         voice.name.toLowerCase().includes('google'))
    ) || voices.find(voice => voice.lang.includes('en-IN')) || voices[0];
    
    utterance.voice = maleVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.2;
    utterance.volume = 1.0;
    
    // Visual feedback during speech
    button.innerHTML = '<i class="fas fa-stop"></i> Stop';
    button.style.color = '#dc3545';
    
    utterance.onend = () => {
        button.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
        button.style.color = '#667eea';
    };
    
    utterance.onerror = () => {
        button.innerHTML = '<i class="fas fa-volume-up"></i> Speak';
        button.style.color = '#667eea';
        alert('Speech synthesis not supported in this browser');
    };
    
    // Speak the message
    window.speechSynthesis.speak(utterance);
}

// Copy Message Function
function copyMessage(button) {
    const messageContent = button.closest('.message').querySelector('.message-content p');
    const textToCopy = messageContent.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.color = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.color = '#667eea';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Visual feedback
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.color = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.color = '#667eea';
        }, 2000);
    });
}
