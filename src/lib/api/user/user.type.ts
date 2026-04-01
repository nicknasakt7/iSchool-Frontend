// export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'PARENTS';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

// teacher/parent profile
export type TeacherProfile = {
  id: string;
  firstName: string;
  lastName: string;
  homeroomClassId?: string;
  tel?: string;
  analysesCount?: number;
};

export type ParentProfile = {
  id: string;
  firstName: string;
  lastName: string;
  tel?: string;
  lineId?: string;
  studentCount?: number;
};

// main User type
export type User = {
  id: string;
  email: string;
  role: Role;
  gender: Gender;
  profileImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // nested profile ขึ้นอยู่กับ role
  teacher?: TeacherProfile;
  parent?: ParentProfile;
};
// export type UserWithFriends = User & { friends: User[] };

// export type RelationshipStatus =
//   | 'NONE'
//   | 'FRIEND'
//   | 'SELF'
//   | 'REQUEST_SENT'
//   | 'REQUEST_RECEIVED';

// export type GetUserProfileResponse = {
//   user: UserWithFriends;
//   relationshipStatus: RelationshipStatus;
// };
