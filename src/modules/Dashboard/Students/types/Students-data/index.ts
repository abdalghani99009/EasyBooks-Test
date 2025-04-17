export interface StudentsDataInterface {}

interface Translation {
  name: string;
  cultureCode: 0 | 1; // 0 for English, 1 for Arabic
}

interface Grade {
  id: string;
  translations: Translation[];
}

interface Gender {
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
