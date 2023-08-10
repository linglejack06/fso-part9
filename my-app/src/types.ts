interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDesc extends CoursePartBase {
  description: string;
}
export interface CoursePartBasic extends CoursePartDesc {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}
export interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartBackground | CoursePartGroup | CoursePartSpecial;