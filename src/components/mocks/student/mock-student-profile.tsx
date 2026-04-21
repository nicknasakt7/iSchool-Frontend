export type StudentProfile = {
  firstName: string;
  lastName: string;
  nickName: string;
  dob: string;
  grade: string;
  classroom: string;
  favorite: string;
  healthNote: string;
  image: string;
};

export const mockProfile: StudentProfile = {
  firstName: "Arin",
  lastName: "yager",
  nickName: "somsri",
  dob: "2012-05-19",
  grade: "ป.4",
  classroom: "section a - Creative Lab",
  favorite: "advanced robotics & generative art",
  healthNote:
    "no know allergies. Sensitive to loud environments during deep work sessions.",
  image: "https://i.pravatar.cc/150?img=12",
};
