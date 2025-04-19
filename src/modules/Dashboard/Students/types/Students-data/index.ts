export interface Translation {
  name: string;
  cultureCode: 0 | 1; // 0 for English, 1 for Arabic
}

export interface Grade {
  id: string;
  translations: Translation[];
}

export interface Gender {
  id: string;
  translations: Translation[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  grade: Grade;
  gender: Gender;
  country: string;
  city: string;
  phone: string;
  remarks: string;
}

export interface BulkStudent extends Omit<Student, "grade" | "gender"> {
  grade: string;
  gender: string;
}

export interface BulkUpdatePayload {
  deleteId: string[];
  addedStudent: BulkStudent[];
  editedStudent: BulkStudent[];
}
