# Invoice Reminder Web Application

A professional, responsive invoice reminder web application for loan payment tracking with UPI integration.

## Overview

This application is designed for **Amit Arya** to track and manage loan payments to **Vicky Kumar**. It provides a comprehensive invoice interface with dynamic calculations, payment tracking, and UPI payment integration.

## Features

### 🧮 Dynamic Calculations
- **Loan Amount**: ₹38,000 (taken on/before 1st Feb 2025)
- **Monthly Interest**: 5% calculated from Feb 2025 to Aug 2025
- **Processing Fees**: ₹3,000 with 18% GST/IGST
- **Payment Tracking**: June 2025 payment of ₹3,000 recorded
- **Smart Discount**: Auto-calculated to reach final payable of ₹32,272

### 💳 Payment Integration
- **UPI Payment**: Integrated with algimagine@ybl
- **QR Code**: Direct scan-to-pay functionality
- **Payment Button**: One-click UPI app integration
- **Copy UPI ID**: Quick clipboard copy functionality

### 🎨 Professional UI/UX
- **Modern Design**: Gradient headers with professional styling
- **Responsive Layout**: Mobile and desktop optimized
- **Interactive Elements**: Hover effects and animations
- **Visual Hierarchy**: Clear typography and spacing
- **Status Indicators**: Overdue alerts and payment status

### 📱 Responsive Design
- **Mobile First**: Optimized for all screen sizes
- **Touch Friendly**: Large buttons and easy navigation
- **Flexible Grid**: Adaptive layout for different devices

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Professional CSS styling
├── script.js           # Dynamic calculations and interactions
└── README.md           # This documentation
```

## How to Use

1. **Open the Application**:
   - Double-click `index.html` to open in your default browser
   - Or serve through a local web server for best performance

2. **Review Invoice Details**:
   - Check borrower and lender information
   - Review loan summary and terms
   - Examine month-by-month transaction breakdown

3. **Make Payment**:
   - Scroll to the payment section
   - Use QR code to scan with any UPI app
   - Or click "Pay Now" button to open UPI app directly
   - Copy UPI ID manually if needed: `algimagine@ybl`

4. **Print/Save**:
   - Use Ctrl+P to print the invoice
   - Payment section is hidden in print view

## Technical Details

### Calculation Logic

The application automatically calculates:

1. **Monthly Interest**: 5% on outstanding balance each month
2. **Outstanding Balance**: Original loan + accumulated interest - payments made
3. **Processing Fees**: ₹3,000 fixed
4. **GST**: 18% on processing fees only (₹540)
5. **Discount**: Auto-calculated to reach exactly ₹32,272 final amount

### Payment Flow

```
Original Loan: ₹38,000
+ Interest (Feb-Aug): Variable based on outstanding balance
+ Processing Fees: ₹3,000
+ GST (18%): ₹540
- Payments Made: ₹3,000 (June 2025)
- Discount: Auto-calculated
= Final Due: ₹32,272
```

### Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Updating Payment Records
To add new payments, modify the `payments` object in `script.js`:

```javascript
this.payments = {
    '2025-06': 3000,  // June 2025 payment
    '2025-07': 5000   // Add July 2025 payment
};
```

### Changing UPI Details
Update UPI information in both HTML and JavaScript:

```javascript
// In script.js
const upiId = 'your-new-upi@id';

// In index.html
<span>UPI ID: <strong>your-new-upi@id</strong></span>
```

### Modifying Interest Rate
Change the monthly interest rate in `script.js`:

```javascript
this.monthlyInterestRate = 0.05; // 5% monthly
```

## Security & Privacy

- 🔒 No sensitive data is stored or transmitted
- 🔒 UPI integration uses standard UPI protocols
- 🔒 All calculations are performed client-side
- 🔒 No external API calls or data collection

## Support

For any issues or questions:
1. Check browser console for error messages
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Contact the developer if problems persist

## Future Enhancements

Potential improvements for future versions:
- [ ] Payment history tracking
- [ ] Email notification integration
- [ ] Multiple currency support
- [ ] Advanced reporting features
- [ ] Payment reminder notifications

---

**Note**: This is a demonstration application. Ensure all financial details are verified before making actual payments.

**Final Amount Due**: ₹32,272  
**Due Date**: 30th August 2025  
**UPI ID**: algimagine@ybl
