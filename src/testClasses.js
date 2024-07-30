export const populateClassrooms = () => {
    return [
        {
            key:1,
            name:"Foundation English",
            students: generateStudents(14),
        },
        {
            key:2,
            name:"Foundation English",
            students: generateStudents(16),
        },
        {
            key:3,
            name:"Advanced English",
            students: generateStudents(10),
        }
    ]
}

const generateStudents = (number) => {
    const students = [];

    for (let i = 0; i < number; i++) {
        //for generating random students names
        const randomFirstNameIndex = Math.floor(Math.random() * STUDENT_FIRST_NAMES.length);
        const randomLastNameIndex = Math.floor(Math.random() * STUDENT_LAST_NAMES.length);
        const randomSubjectIndex = Math.floor(Math.random() * STUDENT_SUBJECTS.length);
        const student = {
            first: STUDENT_FIRST_NAMES[randomFirstNameIndex],
            last: STUDENT_LAST_NAMES[randomLastNameIndex],
            subject: STUDENT_SUBJECTS[randomSubjectIndex],
            year: Math.ceil(Math.random() * 3),
        }

        students.push(student);
    }

    return students;
}

const STUDENT_FIRST_NAMES = [
    "Taeyoung",
    "Jisoo",
    "Jiwoo",
    "Jiwon",
    "Hyeji",
    "Jongwoo",
    "Seojun",
    "Wooyeon",
    "Byeongmin",
    "Junhyeok",
    "Wooyoung",
    "Daehan",
    "Hyemi",
    "Nayeong",
    "Seongmin",
]

const STUDENT_LAST_NAMES = [
    "Kim",
    "Park",
    "Choi",
    "Lee",
    "Byeon",
    "Oh",
    "Joo",
]

const STUDENT_SUBJECTS = [
    "Architecture",
    "Computer Engineering",
    "Information Security",
    "Hair and Beauty",
    "Hotel Food Management",
    "Hospital Management",
    "Nursing",
    "Early Childhood Learning",
    "Sports Rehabilitation",
    "Game and Video Contents",
    "Civil Engineering",
]