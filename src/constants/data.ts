export const recruiterNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        variant: 'default',
    },
    {
        title: 'Add Jobs',
        href: '/dashboard/recruiter/create-job',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'My Jobs',
        href: '/dashboard/recruiter/jobs',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'Applications',
        href: '/dashboard/recruiter/applications',
        icon: 'account',
        variant: 'ghost',
    },
    {
        title: 'Profile',
        href: '/dashboard/recruiter/profile',
        icon: 'profile',
        variant: 'ghost',
    },
];

export const applicantNavItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        variant: 'default',
    },
    {
        title: 'Applications',
        href: '/dashboard/applicant/applications',
        icon: 'profile',
        variant: 'ghost',
    },
    {
        title: 'Profile',
        href: '/dashboard/applicant/profile',
        icon: 'account',
        variant: 'ghost',
    },
];

export const jobTypes = ['Full-time', 'Internship', 'Part-time', 'Contract'];

export const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Jobs', href: '/jobs' },
    { title: 'Categories', href: '/categories' },
    { title: 'Recruiters', href: '/recruiters' },
    { title: 'Contact', href: '/contact' },
];

export const authLinks = [{ title: 'Sign in', href: '/login' }];

export const footerInfos = [
    // {
    //     title: 'About Us',
    //     list: [
    //         { name: 'Company History', href: '#' },
    //         { name: 'Meet the Team', href: '#' },
    //         { name: 'Employee Handbook', href: '#' },
    //         { name: ' Careers', href: '#' },
    //     ],
    // },
    {
        title: 'Our Services',
        list: [
            { name: 'Web Development', href: '#' },
            // { name: ' Web Design', href: '#' },
            // { name: 'Marketing', href: '#' },
            // { name: 'Google Ads', href: '#' },
        ],
    },
    // {
    //     title: 'Resources',
    //     list: [
    //         { name: 'Online Guides', href: '#' },

    //         { name: 'Conference Notes', href: '#' },

    //         { name: 'Forum', href: '#' },

    //         { name: 'Upcoming Events', href: '#' },
    //     ],
    // },
    {
        title: 'Helpful Links',
        list: [
            { name: "FAQ's", href: '/faqs' },
            // { name: 'Support', href: '#' },
            // { name: 'Live Chat', href: '#' },
        ],
    },
];

export const whyChooseUs = [
    {
        title: 'User-Friendly Interface',
        text: 'Easily navigate through job listings with our intuitive design.',
    },
    {
        title: 'Verified Employers',
        text: 'We ensure all job postings come from credible sources.',
    },
    {
        title: 'Advanced Filters',
        text: 'Find jobs that match your skills and preferences.',
    },
    {
        title: 'Quick Apply',
        text: 'Apply to jobs directly through our platform.',
    },
    {
        title: 'Career Resources',
        text: 'Access tips and guides for job applications.',
    },
    {
        title: 'Job Alerts',
        text: 'Get notified of new job postings instantly.',
    },
];

const category = [
    { name: 'Technology' },
    { name: 'Healthcare' },
    { name: 'Education' },
    { name: 'Finance' },
    { name: 'Marketing and Sales' },
    { name: 'Operations' },
    { name: 'Creative Arts' },
    { name: 'Construction and Trades' },
    { name: 'Hospitality and Tourism' },
    { name: 'Customer Service' },
    { name: 'Administrative' },
    { name: 'Remote/Freelance' },
    { name: 'Nonprofit and Social Services' },
    { name: 'Research and Development' },
    { name: 'Legal' },
];

const categories = [
    {
        main_category: 'Technology',
        subcategories: [
            'Software Development',
            'Data Science',
            'IT Support',
            'Cybersecurity',
            'Web Development',
            'Mobile App Development',
            'UX/UI Design',
        ],
    },
    {
        main_category: 'Healthcare',
        subcategories: [
            'Nursing',
            'Medical Assistant',
            'Healthcare Administration',
            'Pharmacy',
            'Laboratory Technician',
            'Physical Therapy',
        ],
    },
    {
        main_category: 'Education',
        subcategories: [
            'Teaching (K-12)',
            'Higher Education',
            'Tutoring',
            'Educational Administration',
            'Special Education',
        ],
    },
    {
        main_category: 'Finance',
        subcategories: [
            'Accounting',
            'Financial Analysis',
            'Banking',
            'Investment Management',
            'Tax Preparation',
        ],
    },
    {
        main_category: 'Marketing and Sales',
        subcategories: [
            'Digital Marketing',
            'Social Media Management',
            'Sales Management',
            'Market Research',
            'Brand Strategy',
        ],
    },
    {
        main_category: 'Operations',
        subcategories: [
            'Supply Chain Management',
            'Logistics',
            'Project Management',
            'Quality Control',
            'Facilities Management',
        ],
    },
    {
        main_category: 'Creative Arts',
        subcategories: [
            'Graphic Design',
            'Writing/Content Creation',
            'Photography',
            'Video Production',
            'Music/Performing Arts',
        ],
    },
    {
        main_category: 'Construction and Trades',
        subcategories: [
            'Carpentry',
            'Plumbing',
            'Electrical Work',
            'HVAC',
            'General Labor',
        ],
    },
    {
        main_category: 'Hospitality and Tourism',
        subcategories: [
            'Hotel Management',
            'Restaurant Management',
            'Travel Planning',
            'Event Coordination',
            'Tour Guiding',
        ],
    },
    {
        main_category: 'Customer Service',
        subcategories: [
            'Call Center',
            'Client Relations',
            'Technical Support',
            'Retail Sales',
        ],
    },
    {
        main_category: 'Administrative',
        subcategories: [
            'Office Management',
            'Executive Assistant',
            'Human Resources',
            'Data Entry',
        ],
    },
    {
        main_category: 'Remote/Freelance',
        subcategories: [
            'Remote Work Opportunities',
            'Freelance Gigs',
            'Short-term Projects',
            'Virtual Assistance',
        ],
    },
    {
        main_category: 'Nonprofit and Social Services',
        subcategories: [
            'Social Work',
            'Community Outreach',
            'Fundraising',
            'Volunteer Coordination',
        ],
    },
    {
        main_category: 'Research and Development',
        subcategories: [
            'Scientific Research',
            'Market Research',
            'Product Development',
            'Innovation',
        ],
    },
    {
        main_category: 'Legal',
        subcategories: [
            'Attorney',
            'Paralegal',
            'Legal Assistant',
            'Compliance',
        ],
    },
];
