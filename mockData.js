export const insuranceCategories = [
  { key: 'health', name: 'Health Insurance', tagline: 'Hospital & wellness cover', icon: '🏥' },
  { key: 'life', name: 'Life Insurance', tagline: 'Long-term family security', icon: '🛡️' },
  { key: 'car', name: 'Car Insurance', tagline: 'Own-damage & third-party', icon: '🚗' },
  { key: 'bike', name: 'Bike Insurance', tagline: 'Two-wheeler protection', icon: '🏍️' },
  { key: 'travel', name: 'Travel Insurance', tagline: 'Trips & baggage cover', icon: '✈️' },
  { key: 'home', name: 'Home Insurance', tagline: 'Secure your home', icon: '🏠' },
  { key: 'property', name: 'Property Insurance', tagline: 'Property protection', icon: '🏢' },
  { key: 'pet', name: 'Pet Insurance', tagline: 'Care for your pet', icon: '🐾' },
  { key: 'business', name: 'Business Insurance', tagline: 'Cover your business', icon: '💼' },
  { key: 'cyber', name: 'Cyber Insurance', tagline: 'Digital risk cover', icon: '🔒' }
];

export const policies = [
  { id: 'POL10025', name: 'Care Health Protect', type: 'Health Insurance', premium: 8500, coverage: '10 Lakh', claimRatio: '90%', validTill: '10 Dec 2026' },
  { id: 'POL10026', name: 'Star Comprehensive', type: 'Health Insurance', premium: 10200, coverage: '15 Lakh', claimRatio: '87%', validTill: '2 Aug 2026' },
  { id: 'POL10027', name: 'ICICI Lombard Car', type: 'Car Insurance', premium: 6300, coverage: '8 Lakh', claimRatio: '93%', validTill: '15 Feb 2027' },
  { id: 'POL10028', name: 'HDFC Ergo Travel', type: 'Travel Insurance', premium: 2100, coverage: '5 Lakh', claimRatio: '95%', validTill: '15 Aug 2026' }
];

export const customerPolicies = [
  { id: 'POL10025', type: 'Health Insurance', sumInsured: 800000, validTill: '15 Dec 2026', status: 'Active' },
  { id: 'POL10026', type: 'Car Insurance', sumInsured: 400000, validTill: '10 Feb 2026', status: 'In Progress' },
  { id: 'POL10005', type: 'Travel Insurance', sumInsured: 200000, validTill: '10 Aug 2026', status: 'Active' }
];

export const claims = [
  { id: 'CLM1078', customer: 'Priya Sharma', policy: 'POL10025', type: 'Hospitalization', amount: 48750, status: 'Under Review', risk: 'Medium', officer: 'Ravi Kumar' },
  { id: 'CLM1077', customer: 'Rohan Verma', policy: 'POL10004', type: 'Car Damage', amount: 45800, status: 'Pending', risk: 'High Risk', officer: 'Unassigned' },
  { id: 'CLM1076', customer: 'Anjali Singh', policy: 'POL10006', type: 'Life Claim', amount: 120000, status: 'Approved', risk: 'Low Risk', officer: 'Neha Gupta' },
  { id: 'CLM1075', customer: 'Amit Patel', policy: 'POL10007', type: 'Bike Damage', amount: 12800, status: 'Under Review', risk: 'Medium', officer: 'Ravi Kumar' }
];

export const claimTimeline = [
  { step: 'Claim Submitted', date: '10 May 2026', done: true },
  { step: 'Documents Uploaded', date: '10 May 2026', done: true },
  { step: 'Verification', date: '12 May 2026', done: true },
  { step: 'Fraud Detection', date: '14 May 2026', done: true },
  { step: 'Officer Review', date: 'In progress', done: false },
  { step: 'Manager Approval', date: 'Pending', done: false },
  { step: 'Payment', date: 'Pending', done: false },
  { step: 'Completed', date: 'Pending', done: false }
];

export const documents = [
  { name: 'Aadhaar Card', status: 'Verified' },
  { name: 'PAN Card', status: 'Uploaded' },
  { name: 'Hospital Bills', status: 'Under Verification' },
  { name: 'Medical Reports', status: 'Uploaded' },
  { name: 'FIR / Police Report', status: 'Pending Upload' },
  { name: 'Others', status: 'Uploaded' }
];

export const notifications = [
  { title: 'Claim #CLM1078 under review', time: '2 hrs ago', type: 'info' },
  { title: 'Documents required for claim #CLM1078', time: '5 hrs ago', type: 'warning' },
  { title: 'Policy #POL10026 due for renewal', time: '2 days ago', type: 'info' },
  { title: 'Payment of ₹10,200 successful', time: '4 days ago', type: 'success' }
];

export const payments = [
  { id: 'PAY10123', policy: 'POL10025', amount: 13800, status: 'Success', date: '10 May 2026' },
  { id: 'PAY10124', policy: 'POL10026', amount: 10200, status: 'Pending', date: '18 May 2026' }
];

export const dashboardStats = {
  totalPolicies: 12458,
  totalCustomers: 8934,
  activePolicies: 9256,
  claimsSubmitted: 2345,
  pendingClaims: 345,
  approvedClaims: 1568,
  rejectedClaims: 145,
  fraudAlerts: 23,
  revenue: 24580000,
  claimApprovalRate: '86.5%',
  avgProcessingTime: '3.6 Days'
};
