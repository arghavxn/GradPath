// data.js
export const courses = [
  // General Core Curriculum Courses
  { id: "EN101", name: "English Composition", credits: 3, prerequisites: [] },
  { id: "EN102", name: "Freshman Composition", credits: 3, prerequisites: ["EN101"] },
  { id: "AR101", name: "Fine Arts", credits: 3, prerequisites: [] },
  { id: "MU107", name: "Health and Physical Education", credits: 3, prerequisites: [] },
  { id: "TH201", name: "Theater Arts", credits: 3, prerequisites: [] },
  { id: "FY101", name: "Orientation", credits: 1, prerequisites: [] },
  { id: "MATH299", name: "College Algebra or Higher Mathematics", credits: 3, prerequisites: [] },
  { id: "PSY101", name: "Psychology", credits: 3, prerequisites: [] },
  { id: "ECO201", name: "Economics", credits: 3, prerequisites: [] },
  { id: "POLI101", name: "Political Science", credits: 3, prerequisites: [] },
  { id: "PH211", name: "Physics I", credits: 4, prerequisites: ["MATH299"] },
  { id: "PH212", name: "Physics II", credits: 4, prerequisites: ["PH211"] },
  { id: "SP201", name: "Speech", credits: 3, prerequisites: [] },
  { id: "PE102", name: "Health and Physical Education", credits: 2, prerequisites: [] },
  { id: "MS101", name: "ROTC or MS101", credits: 2, prerequisites: [] },

  // Computer Science Major Courses
  { id: "CS112", name: "Survey of Computer Science", credits: 3, prerequisites: [] },
  { id: "CS191", name: "Computer Seminar", credits: 1, prerequisites: ["FY101"] },
  { id: "CS203", name: "Computer Programming I", credits: 3, prerequisites: ["CS112"] },
  { id: "CS204", name: "Computer Programming II", credits: 3, prerequisites: ["CS203"] },
  { id: "CS205", name: "Data Structures", credits: 3, prerequisites: ["CS204"] },
  { id: "CS221", name: "Java Programming", credits: 3, prerequisites: ["CS204"] },
  { id: "CS231", name: "Visual Basic Programming", credits: 3, prerequisites: ["CS204"] },
  { id: "CS341", name: "Discrete Structures", credits: 3, prerequisites: ["MATH299"] },
  { id: "CS350", name: "Principles of Programming Languages", credits: 3, prerequisites: ["CS205"] },
  { id: "CS371", name: "Operating Systems", credits: 3, prerequisites: ["CS205", "CS321"] },
  { id: "CS351", name: "Database Management Systems", credits: 3, prerequisites: ["CS204"] },
  { id: "CS398", name: "Social & Ethical Issues in Computer Science", credits: 1, prerequisites: ["CS205"] },
  { id: "CS425", name: "Software Engineering", credits: 3, prerequisites: ["CS351"] },
  { id: "CS422", name: "Introduction to Networking", credits: 3, prerequisites: ["CS371"] },
  { id: "CS423", name: "Introduction to Cyber Security", credits: 3, prerequisites: ["CS371"] },
  { id: "CS455", name: "Senior Project", credits: 3, prerequisites: ["CS351"] },

  // Added courses from the academic map
  { id: "CS321", name: "Computer Architecture", credits: 3, prerequisites: ["CS204"] },
  { id: "CS323", name: "Introduction to Algorithms", credits: 3, prerequisites: ["CS205"] },
  { id: "CS431", name: "Numerical Analysis", credits: 3, prerequisites: ["CS205", "MA301"] },
  { id: "CS441", name: "Language & Compilers", credits: 3, prerequisites: ["CS350"] },
  { id: "CS492", name: "Computer Seminar", credits: 1, prerequisites: [] },

  // Math Courses
  { id: "MA300", name: "Calculus II", credits: 3, prerequisites: ["MATH299"] },
  { id: "MA301", name: "Calculus III", credits: 3, prerequisites: ["MA300"] },
  { id: "MA331", name: "Linear Algebra", credits: 3, prerequisites: ["MA300"] },
  { id: "MA421", name: "Ordinary & Partial Differential Equations", credits: 3, prerequisites: ["MA300"] },
  { id: "MA325", name: "Probability & Statistics", credits: 3, prerequisites: ["MA300"] },
];

export const students = [
  { 
    id: "C001", 
    name: "Arqawan Noori", 
    completedCourses: [
      "EN101", "CS112", "CS203", "CS204", "CS205", "CS221", "CS231", "CS341", "CS350",
      "CS351", "CS398", "CS425", "CS422", "CS423", "CS455", "MA301", "MA331", "MA421"
    ],
    currentSemester: "Spring 2025",
    gpa: 3.7,
    graduationDate: "May 2026"
  }
];

export const academicRoadmap = [
  { 
    semester: "Semester 1 (Fall)", 
    courses: ["EN101", "AR101", "MATH299", "PE102", "CS112", "CS191"],
    totalCredits: 15 
  },
  { 
    semester: "Semester 2 (Spring)", 
    courses: ["EN102", "PSY101", "MA300", "CS203", "SP201", "CS191"],
    totalCredits: 16 
  },
  { 
    semester: "Semester 3 (Fall)", 
    courses: ["PH211", "CS204", "CS341", "MA301", "ECO201"],
    totalCredits: 16 
  },
  { 
    semester: "Semester 4 (Spring)", 
    courses: ["PH212", "CS205", "CS221", "MS101", "TH201"], 
    totalCredits: 15
  },
  { 
    semester: "Semester 5 (Fall)", 
    courses: ["CS321", "CS323", "CS351", "CS398", "POLI101"],
    totalCredits: 13 
  },
  { 
    semester: "Semester 6 (Spring)", 
    courses: ["CS350", "CS371", "MA331", "MA421", "CS425"],
    totalCredits: 15 
  },
  { 
    semester: "Semester 7 (Fall)", 
    courses: ["CS422", "CS423", "CS455", "MA325"],
    totalCredits: 12 
  },
  { 
    semester: "Semester 8 (Spring)", 
    courses: ["CS431", "CS441", "CS492"],
    totalCredits: 7 
  }
];

// New data for course offerings with real schedule information
export const courseOfferings = {
  // Fall offerings
  "CS111": { 
    semesters: ["Fall", "Spring"], 
    sections: [
      { id: "02", time: "9:25 am - 10:40 am", days: "TR", location: "Classroom Building 205", instructor: "Darrell L James" },
      { id: "03", time: "1:00 pm - 2:15 pm", days: "TR", location: "Classroom Building 205", instructor: "Darrell L James" },
      { id: "E01", time: "TBA", days: "", location: "Online (Web)", instructor: "Christopher Lanclos" }
    ]
  },
  "CS112": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "10:00 am - 10:50 am", days: "MWF", location: "Classroom Building 105", instructor: "TBA" }
    ]
  },
  "CS191": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "10:50 am - 11:40 am", days: "R", location: "Classroom Building 104", instructor: "Latonya Catrice Garner-Jackson" }
    ]
  },
  "CS204": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "9:25 am - 10:40 am", days: "TR", location: "Classroom Building 105", instructor: "Marcus R. Golden" }
    ]
  },
  "CS321": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "1:00 pm - 1:50 pm", days: "MWF", location: "Classroom Building 207", instructor: "TBA" }
    ]
  },
  "CS323": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "8:00 am - 9:15 am", days: "TR", location: "Classroom Building 105", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS341": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "9:00 am - 9:50 am", days: "MWF", location: "Classroom Building 205", instructor: "Xiaoqin Wu" }
    ]
  },
  "CS351": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "1:00 pm - 2:15 pm", days: "TR", location: "Classroom Building 105", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS422": { 
    semesters: ["Fall"], 
    sections: [
      { id: "HE1", time: "8:00 am - 8:50 am", days: "MWF", location: "Classroom Building 105", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS423": { 
    semesters: ["Fall", "Spring"], 
    sections: [
      { id: "01", time: "2:25 pm - 3:40 pm", days: "TR", location: "Classroom Building 105", instructor: "Marcus R. Golden" },
      { id: "E01", time: "TBA", days: "", location: "Online (Web)", instructor: "Khaled Ahmad Sabahein", term: "Spring" }
    ]
  },
  "CS455": { 
    semesters: ["Fall"], 
    sections: [
      { id: "01", time: "2:00 pm - 2:50 pm", days: "MWF", location: "Classroom Building 105", instructor: "Marcus R. Golden" }
    ]
  },
  
  // Spring offerings
  "CS203": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "1:00 pm - 2:15 pm", days: "TR", location: "Classroom Building 105", instructor: "Marcus R. Golden" }
    ]
  },
  "CS205": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "10:00 am - 10:50 am", days: "MWF", location: "Classroom Building 105", instructor: "Marcus R. Golden" }
    ]
  },
  "CS221": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "2:00 pm - 2:50 pm", days: "MWF", location: "Classroom Building 205", instructor: "Marcus R. Golden" }
    ]
  },
  "CS350": { 
    semesters: ["Spring"], 
    sections: [
      { id: "E01", time: "TBA", days: "", location: "Online (Web)", instructor: "Christopher Lanclos" }
    ]
  },
  "CS371": { 
    semesters: ["Spring"], 
    sections: [
      { id: "HE1", time: "10:00 am - 10:50 am", days: "MWF", location: "Classroom Building 104", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS425": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "9:25 am - 10:40 am", days: "TR", location: "Classroom Building 105", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS431": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "11:00 am - 11:50 am", days: "MWF", location: "Classroom Building 205", instructor: "Xiaoqin Wu" }
    ]
  },
  "CS441": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "8:00 am - 9:15 am", days: "TR", location: "Classroom Building 105", instructor: "Khaled Ahmad Sabahein" }
    ]
  },
  "CS492": { 
    semesters: ["Spring"], 
    sections: [
      { id: "01", time: "10:50 am - 11:50 am", days: "R", location: "Classroom Building 205", instructor: "Khaled Ahmad Sabahein" }
    ]
   },
"EN101": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "9:00 am - 9:50 am", days: "MWF", location: "Cherry Hall 101", instructor: "Anna Bates" }
  ]
},
"EN102": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "9:00 am - 9:50 am", days: "MWF", location: "Cherry Hall 101", instructor: "Anna Bates" }
  ]
},
"AR101": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "1:00 pm - 2:15 pm", days: "TR", location: "Fine Arts Center 201", instructor: "Tom Rico" }
  ]
},
"MU107": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "10:00 am - 11:15 am", days: "TR", location: "Music Hall 102", instructor: "Jessica Han" }
  ]
},
"TH201": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "10:50 am - 12:05 pm", days: "TR", location: "Theater Room 1", instructor: "Nathan Cook" }
  ]
},
"FY101": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "11:00 am - 11:50 am", days: "MWF", location: "DSU 2020", instructor: "Linda Shore" }
  ]
},
"MATH299": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "1:00 pm - 1:50 pm", days: "MWF", location: "Snell Hall 205", instructor: "Raj Patel" }
  ]
},
"PSY101": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "1:00 pm - 2:15 pm", days: "TR", location: "Academic Complex 104", instructor: "Megan Frost" }
  ]
},
"ECO201": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "8:00 am - 8:50 am", days: "MWF", location: "GH 102", instructor: "James Lin" }
  ]
},
"POLI101": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "9:00 am - 9:50 am", days: "MWF", location: "Cherry Hall 200", instructor: "Danielle Ford" }
  ]
},
"PH211": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "2:30 pm - 3:45 pm", days: "TR", location: "Ogden 103", instructor: "Brian Keller" }
  ]
},
"PH212": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "2:30 pm - 3:45 pm", days: "TR", location: "Ogden 103", instructor: "Brian Keller" }
  ]
},
"SP201": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "9:25 am - 10:40 am", days: "TR", location: "Communication Building 301", instructor: "Karen Lee" }
  ]
},
"PE102": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "12:00 pm - 12:50 pm", days: "MWF", location: "Preston Center", instructor: "Michael Grant" }
  ]
},
"MS101": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "3:00 pm - 4:15 pm", days: "TR", location: "Military Science Hall", instructor: "Col. Robert Hayes" }
  ]
},
"MA300": {
  semesters: ["Spring"],
  sections: [
    { id: "01", time: "11:00 am - 12:15 pm", days: "TR", location: "Snell Hall 205", instructor: "Raj Patel" }
  ]
},
"MA325": {
  semesters: ["Fall"],
  sections: [
    { id: "01", time: "11:00 am - 12:15 pm", days: "TR", location: "Snell Hall 205", instructor: "Raj Patel" }
  ]
}
};

// Course categories for the progress page
export const courseCategories = {
  "General Education": ["EN101", "EN102", "AR101", "MU107", "TH201", "SP201", "PE102", "MS101", "PSY101", "ECO201", "POLI101"],
  "Mathematics": ["MATH299", "MA300", "MA301", "MA331", "MA421", "MA325"],
  "Natural Sciences": ["PH211", "PH212"],
  "Computer Science Core": ["CS112", "CS191", "CS203", "CS204", "CS205", "CS321", "CS323", "CS341", "CS350", "CS351", "CS371", "CS398", "CS422", "CS423", "CS425", "CS431", "CS441", "CS455", "CS492"],
  "Computer Science Electives": ["CS221", "CS231"]
};

export const courseDescriptions = {
  "CS111": "Introduction to computer hardware, software, Internet and World Wide Web. Provide students an in-depth understanding of why computers are essential tools in information processing, education, research, business and society in general. Use of the e-mail and World Wide Web as an integrated learning tool. Use of basic application software tools: word processing, spreadsheet and database.",
  "CS112": "Introduction to computer Sciences as discipline, including theory of computation, programming languages and their structure, computer architecture, operating systems and networks, and social, ethical, and professional issues; use of application software (word processing, spreadsheet, database, etc.) and Internet; introduction to programming in a modern object-oriented programming language.",
  "CS191": "Required for freshman computer science majors both seminars of the freshman year. Introduction to the field of Computer Science, methods of note talking, group advisement, problem sessions, other presentations may be make by faculty, guest speakers or students.",
  "CS203": "This course is an introduction to basic concepts of computer science, with emphasis on object-oriented programming. Fundamental techniques for software design and implementation will be covered and these concepts demonstrated in a programming languages such as C++. Additional topics include top-down modular design, developing general purpose software tools, procedural and data abstraction and algorithms.",
  "CS204": "This course will further develop and expand upon the topics introduced in CS203. Advanced object-oriented programming techniques will be covered, with extensive use of recursion and dynamic data structures. Abstract data types, including lists, queues, trees and graphics, will be studied. Algorithms for searching and sorting will be explored.",
  "CS205": "Basic concepts of data structures and their representation of algorithms for manipulation of lists, trees, graphs, queues, stacks and sorting techniques.",
  "CS221": "An introduction to a second programming language for computer science majors. Students learn to read and write programs in a modern object-oriented languages. The language chosen is one with popularity and use. The current language is Java.",
  "CS231": "Introduction to computer programming and information processing principles using the Visual Basic Language. Application development, user interface design, program development methodology, structured and objective-oriented programming and Visual Basic software development system.",
  "CS321": "Introduction to the internal logical structure of computers and the techniques of machine level programming; architectures and functioning of micro/conventional computer systems. Taught with considerable emphasis on writing, requiring reports, projects and a major research paper.",
  "CS341": "Elementary logic sets, relations, functions, ordering, equivalence relations, partitions, finite sets, module arithmetic; natural number, mathematical induction, arithmetic string, string programs, structured connectedness, traversals, graph algorithms.",
  "CS350": "A survey of programming language concepts and design principles of programming paradigms (procedural, functional, and logic). Topics include a history of programming languages, data type supported, control structures, and run-time management dynamic structures.",
  "CS351": "This course examines the logical organization of databases; the hierarchical, network and primarily relational data models and their languages. Functional dependencies, normal forms, issues of database planning, design and implementation; examination of some commercially available database management systems.",
  "CS371": "The course introduces the software that manages all the resources of a computer system. Basic principles of Memory Management, Processor/Process Management, Device Management. File Management and System Management are covered. Also, this course looks at several specific operating systems and evaluate their advantages and shortcomings.",
  "CS398": "A study of the ways in which advances in computers and engineering technology have affected society. Impact of computers on society; discussion of the nature of digital computers and role of information processing in human affairs. Written and oral presentations by students concerning computer ethics and the social responsibilities of computer scientists are required.",
  "CS422": "This course covers issues of computer communications and networks. This course is organized around the TCP/IP reference model and Open Systems Interface model. The main topics include principles of data communications, local-area and wide-are networks, network design essentials, network media, network communication and protocols, network architectures, network operation systems and Internet-based applications.",
  "CS423": "Introduction to computer security and cryptography. Topic covered includes cryptography; program security, database security, operating system security, and network security.",
  "CS425": "An introduction to software engineering with emphasis on practical techniques for object-oriented analysis and design. Classical and modern principles and practice of software engineering, including classical and object-oriented approaches to architecture, design, life cycle, and project management; software metrics; change management; teams and teaming to tools; reusability, portability, and interoperability; requirement and specification.",
  "CS431": "Computational methods of finding numerical solutions to nonlinear equations, computations of interpolating polynomial numerical integration, and ordinary differential equations.",
  "CS441": "Generalized language features, Backus-Naur form, functional characteristics of various languages, semantic requirements of problem-solving tasks.",
  "CS455": "A comprehensive computer project with considerable detail to be completed under supervision of a faculty member. Topics to be decided in consultations with faculty member.",
  "EN101": "Fundamentals of college-level writing focusing on essay structure, thesis development, and academic research techniques.",
  "EN102": "Advanced composition course building on EN101 with emphasis on research writing, argumentation, and documentation styles.",
  "AR101": "Introduction to visual arts exploring various mediums, art history periods, and fundamental design principles.",
  "MU107": "Comprehensive health education covering nutrition, fitness, mental health, and wellness strategies for college students.",
  "TH201": "Survey of theater arts including acting techniques, stagecraft, and dramatic literature analysis.",
  "FY101": "First-year experience course designed to help students transition to college life and academic expectations.",
  "MATH299": "Algebraic concepts including functions, equations, inequalities, and their applications in real-world problems.",
  "PSY101": "Introduction to psychological principles including cognition, development, personality, and social behavior.",
  "ECO201": "Microeconomic theory covering supply and demand, market structures, and economic decision-making.",
  "POLI101": "Introduction to political systems, government structures, and political theory fundamentals.",
  "PH211": "Calculus-based physics covering mechanics, thermodynamics, and wave motion.",
  "PH212": "Continuation of PH211 focusing on electricity, magnetism, and electromagnetic waves.",
  "SP201": "Public speaking fundamentals including speech preparation, delivery techniques, and audience analysis.",
  "PE102": "Physical education course focusing on fitness principles, exercise techniques, and wellness strategies.",
  "MS101": "Introduction to military science covering leadership principles, military history, and basic tactics.",
  "CS492": "Required for each senior computer science major each semester of the senior year. Presentation of topics in research new development, new systems, etc. Presentations may be made by faculty, guest speakers or students."
};